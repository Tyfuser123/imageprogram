import type { WorkspaceSvg } from 'blockly/core';

interface BlocklyToolbarProps {
  workspace: WorkspaceSvg | null;
}

export function BlocklyToolbar({ workspace }: BlocklyToolbarProps) {
  if (!workspace) return null;

  const zoomIn = () => workspace.zoomCenter(1);
  const zoomOut = () => workspace.zoomCenter(-1);
  const zoomReset = () => {
    workspace.zoomToFit();
  };
  const clearWorkspace = () => {
    if (confirm('确定要清空工作区吗？')) workspace.clear();
  };

  return (
    <div className="absolute bottom-3 right-3 flex flex-col gap-1 z-10">
      <button
        onClick={zoomIn}
        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg flex items-center justify-center shadow-lg border border-slate-600"
        title="放大"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg flex items-center justify-center shadow-lg border border-slate-600"
        title="缩小"
      >
        −
      </button>
      <button
        onClick={zoomReset}
        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center shadow-lg border border-slate-600"
        title="居中"
      >
        <span className="text-sm">⊡</span>
      </button>
      <button
        onClick={clearWorkspace}
        className="w-10 h-10 rounded-lg bg-red-700 hover:bg-red-600 text-white flex items-center justify-center shadow-lg border border-red-600"
        title="清空工作区"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  );
}
