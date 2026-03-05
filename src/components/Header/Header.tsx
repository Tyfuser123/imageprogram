import { useProjectStore } from '../../store/projectStore';
import { useExecutionStore } from '../../store/executionStore';
interface HeaderProps {
  workspaceReady: boolean;
  onNewProject: () => void;
  onSaveProject: () => void;
  onOpenProject: () => void;
  onRun: () => void;
}

export function Header({
  workspaceReady,
  onNewProject,
  onSaveProject,
  onOpenProject,
  onRun,
}: HeaderProps) {
  const { currentProjectName } = useProjectStore();
  const { status } = useExecutionStore();

  const buttonsDisabled = !workspaceReady;

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-slate-800 text-white border-b border-slate-700">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">图形编程</h1>
        <span className="text-slate-400 text-sm">{currentProjectName}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onNewProject}
          disabled={buttonsDisabled}
          title={buttonsDisabled ? '工作区加载中...' : undefined}
          className="px-3 py-1.5 rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          新建
        </button>
        <button
          onClick={onSaveProject}
          disabled={buttonsDisabled}
          title={buttonsDisabled ? '工作区加载中...' : undefined}
          className="px-3 py-1.5 rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          保存
        </button>
        <button
          onClick={onOpenProject}
          disabled={buttonsDisabled}
          title={buttonsDisabled ? '工作区加载中...' : undefined}
          className="px-3 py-1.5 rounded bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          打开
        </button>
        <button
          onClick={onRun}
          disabled={buttonsDisabled || status === 'running'}
          title={buttonsDisabled ? '工作区加载中...' : undefined}
          className="px-4 py-1.5 rounded bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          运行
        </button>
      </div>
    </header>
  );
}
