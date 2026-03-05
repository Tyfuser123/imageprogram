/**
 * 基于文件系统的项目存储
 * 使用 File System Access API 或降级为下载/文件选择
 */

export interface ProjectData {
  name: string;
  workspaceState: string;
  savedAt: number;
}

const FILE_EXTENSION = '.blockly.json';
const MIME_TYPE = 'application/json';

/**
 * 保存项目到用户选择的文件
 */
export async function saveToFile(
  name: string,
  workspaceState: string
): Promise<boolean> {
  const data: ProjectData = {
    name,
    workspaceState,
    savedAt: Date.now(),
  };
  const content = JSON.stringify(data, null, 2);
  const suggestedName = (name || '未命名项目').replace(/[/\\?%*:|"<>]/g, '_') + FILE_EXTENSION;

  try {
    if ('showSaveFilePicker' in window) {
      const handle = await (window as Window & { showSaveFilePicker: (o?: object) => Promise<FileSystemFileHandle> })
        .showSaveFilePicker({
          suggestedName,
          types: [{ description: '图形编程项目', accept: { [MIME_TYPE]: [FILE_EXTENSION] } }],
        });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      return true;
    }
  } catch (err) {
    if ((err as Error).name === 'AbortError') return false;
    throw err;
  }

  // 降级：触发下载
  const blob = new Blob([content], { type: MIME_TYPE });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

/**
 * 从用户选择的文件加载项目
 */
export async function loadFromFile(): Promise<ProjectData | null> {
  try {
    if ('showOpenFilePicker' in window) {
      const [handle] = await (window as Window & { showOpenFilePicker: (o?: object) => Promise<FileSystemFileHandle[]> })
        .showOpenFilePicker({
          types: [{ description: '图形编程项目', accept: { [MIME_TYPE]: [FILE_EXTENSION, '.json'] } }],
          multiple: false,
        });
      const file = await handle.getFile();
      const text = await file.text();
      const data = JSON.parse(text) as ProjectData;
      if (!data.workspaceState) throw new Error('无效的项目文件');
      return data;
    }
  } catch (err) {
    if ((err as Error).name === 'AbortError') return null;
    throw err;
  }

  return null;
}

/**
 * 通过 input[type=file] 选择文件（降级方案）
 */
export function createFileInput(callback: (data: ProjectData) => void): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,.blockly.json';
  input.style.display = 'none';
  input.onchange = async () => {
    const file = input.files?.[0];
    input.files = null;
    input.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as ProjectData;
      if (!data.workspaceState) throw new Error('无效的项目文件');
      callback(data);
    } catch (err) {
      alert('读取文件失败：' + (err instanceof Error ? err.message : String(err)));
    }
  };
  return input;
}
