import { useExecutionStore } from '../../store/executionStore';

export function OutputPanel() {
  const { output, errorMessage, status } = useExecutionStore();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 font-mono text-sm">
      <div className="px-3 py-2 border-b border-gray-700 bg-gray-800 font-sans">
        输出
        {status === 'running' && (
          <span className="ml-2 text-green-400 text-xs">运行中...</span>
        )}
        {status === 'completed' && (
          <span className="ml-2 text-blue-400 text-xs">完成</span>
        )}
        {status === 'error' && (
          <span className="ml-2 text-red-400 text-xs">错误</span>
        )}
      </div>
      <div className="flex-1 overflow-auto p-3 min-h-[120px]">
        {output.length === 0 && !errorMessage && (
          <div className="text-gray-500">运行程序后，输出将显示在这里</div>
        )}
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
        {errorMessage && (
          <div className="text-red-400 mt-2">错误: {errorMessage}</div>
        )}
      </div>
    </div>
  );
}
