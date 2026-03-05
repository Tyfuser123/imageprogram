import { useEffect, useRef, useCallback } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { toolboxConfig } from '../../blocks/toolbox';
import { registerCustomBlocks } from '../../blocks';

registerCustomBlocks();

interface BlocklyEditorProps {
  onWorkspaceReady?: (workspace: Blockly.WorkspaceSvg) => void;
  workspaceRef?: React.MutableRefObject<Blockly.WorkspaceSvg | null>;
}

export function BlocklyEditor({ onWorkspaceReady, workspaceRef: externalWorkspaceRef }: BlocklyEditorProps) {
  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  const getWorkspace = useCallback(() => workspaceRef.current, []);

  useEffect(() => {
    if (!blocklyDivRef.current) return;

    let cancelled = false;

    const init = async () => {
      try {
        const zhHans = await import('blockly/msg/zh-hans');
        if (!cancelled) Blockly.setLocale(zhHans);
      } catch {
        // 使用英文
      }
      if (cancelled || !blocklyDivRef.current) return;

      const workspace = Blockly.inject(blocklyDivRef.current!, {
      toolbox: toolboxConfig,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      zoom: {
        controls: false,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      trashcan: false,
    });

      workspaceRef.current = workspace;
      externalWorkspaceRef && (externalWorkspaceRef.current = workspace);
      onWorkspaceReady?.(workspace);
    };

    init();

    return () => {
      cancelled = true;
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
        externalWorkspaceRef && (externalWorkspaceRef.current = null);
      }
    };
  }, [onWorkspaceReady, externalWorkspaceRef]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div
        ref={blocklyDivRef}
        className="w-full h-full"
        id="blocklyDiv"
      />
    </div>
  );
}

export { javascriptGenerator };
export type { Blockly };
