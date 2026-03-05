import { useRef, useCallback, useState } from 'react';
import * as Blockly from 'blockly/core';
import { BlocklyEditor, javascriptGenerator } from './components/BlocklyEditor';
import { BlocklyToolbar } from './components/BlocklyToolbar';
import { Header } from './components/Header';
import { OutputPanel } from './components/OutputPanel';
import { useProjectStore } from './store/projectStore';
import { useExecutionStore } from './store/executionStore';
import { saveToFile, loadFromFile, createFileInput } from './storage/fileStorage';
import { createInterpreter } from './interpreter/js-interpreter-adapter';

const INFINITE_LOOP_LIMIT = 100000;

function App() {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const [workspaceReady, setWorkspaceReady] = useState(false);
  const { currentProjectName, setCurrentProject } =
    useProjectStore();
  const {
    setStatus,
    appendOutput,
    clearOutput,
    setError,
    reset: resetExecution,
  } = useExecutionStore();

  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);
  const handleWorkspaceReady = useCallback((ws: Blockly.WorkspaceSvg) => {
    workspaceRef.current = ws;
    setWorkspace(ws);
    setWorkspaceReady(true);
  }, []);

  const runCode = useCallback(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    clearOutput();
    setStatus('running');

    try {
      javascriptGenerator.STATEMENT_PREFIX = 'checkInfiniteLoop();\nhighlightBlock(%1);\n';
      javascriptGenerator.addReservedWords('checkInfiniteLoop');
      javascriptGenerator.addReservedWords('highlightBlock');

      const code = javascriptGenerator.workspaceToCode(workspace);

      const interpreter = createInterpreter(code, {
        onOutput: (text) => appendOutput(text),
        onHighlight: (id) => {
          workspace.highlightBlock(id);
        },
        infiniteLoopLimit: INFINITE_LOOP_LIMIT,
      });

      let hasMore = true;
      try {
        while (hasMore) {
          hasMore = interpreter.step();
        }
        workspace.highlightBlock(null);
        appendOutput('\n<< 程序执行完成 >>');
        setStatus('completed');
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        workspace.highlightBlock(null);
        setStatus('error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
      workspaceRef.current?.highlightBlock(null);
    }
  }, [clearOutput, setStatus, appendOutput, setError]);

  const handleNewProject = useCallback(() => {
    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.clear();
    }
    setCurrentProject(null, '未命名项目');
    resetExecution();
  }, [setCurrentProject, resetExecution]);

  const handleSaveProject = useCallback(async () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const name = currentProjectName || '未命名项目';

    try {
      const state = Blockly.serialization.workspaces.save(workspace);
      await saveToFile(name, JSON.stringify(state));
      setCurrentProject(null, name);
      alert('保存成功');
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        alert('保存失败：' + (err instanceof Error ? err.message : String(err)));
      }
    }
  }, [currentProjectName, setCurrentProject]);

  const handleOpenProject = useCallback(async () => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const onFileLoaded = (data: { name: string; workspaceState: string }) => {
      if (!workspaceRef.current) return;
      Blockly.serialization.workspaces.load(JSON.parse(data.workspaceState), workspaceRef.current);
      setCurrentProject(null, data.name);
      resetExecution();
      alert('打开成功');
    };

    try {
      if ('showOpenFilePicker' in window) {
        const data = await loadFromFile();
        if (data) onFileLoaded(data);
      } else {
        const input = createFileInput(onFileLoaded);
        document.body.appendChild(input);
        input.click();
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        alert('打开失败：' + (err instanceof Error ? err.message : String(err)));
      }
    }
  }, [setCurrentProject, resetExecution]);

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <Header
        workspaceReady={workspaceReady}
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
        onOpenProject={handleOpenProject}
        onRun={runCode}
      />
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 min-w-0 relative">
          <BlocklyEditor onWorkspaceReady={handleWorkspaceReady} workspaceRef={workspaceRef} />
          <BlocklyToolbar workspace={workspace} />
        </div>
        <div className="w-80 border-l border-slate-700 flex flex-col">
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
