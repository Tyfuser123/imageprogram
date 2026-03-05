import { create } from 'zustand';

export type ExecutionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error';

interface ExecutionState {
  status: ExecutionStatus;
  output: string[];
  errorMessage: string | null;
  setStatus: (status: ExecutionStatus) => void;
  appendOutput: (text: string) => void;
  clearOutput: () => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set, get) => ({
  status: 'idle',
  output: [],
  errorMessage: null,
  setStatus: (status) => set({ status }),
  appendOutput: (text) =>
    set((state) => ({ output: [...state.output, text] })),
  clearOutput: () => set({ output: [], errorMessage: null }),
  setError: (message) => set({ errorMessage: message, status: 'error' }),
  reset: () =>
    set({
      status: 'idle',
      output: [],
      errorMessage: null,
    }),
}));
