import type { SavedProject } from '../../storage/projectStorage';

interface ProjectPickerProps {
  projects: SavedProject[];
  onSelect: (project: SavedProject) => void;
  onClose: () => void;
}

export function ProjectPicker({ projects, onSelect, onClose }: ProjectPickerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-lg shadow-xl p-4 w-96 max-h-80 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-medium mb-3">选择项目</h3>
        <ul className="space-y-1">
          {projects.map((p) => (
            <li key={p.projectId}>
              <button
                onClick={() => onSelect(p)}
                className="w-full text-left px-3 py-2 rounded hover:bg-slate-600 text-slate-200"
              >
                {p.name}
                <span className="text-slate-500 text-xs ml-2">
                  {new Date(p.updatedAt).toLocaleString('zh-CN')}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-3 px-4 py-2 rounded bg-slate-600 hover:bg-slate-500 text-white text-sm"
        >
          取消
        </button>
      </div>
    </div>
  );
}
