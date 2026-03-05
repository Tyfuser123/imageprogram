import { create } from 'zustand';

export interface ProjectInfo {
  id: string;
  name: string;
  updatedAt: number;
}

interface ProjectState {
  currentProjectId: string | null;
  currentProjectName: string;
  setCurrentProject: (id: string | null, name: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectId: null,
  currentProjectName: '未命名项目',
  setCurrentProject: (id, name) =>
    set({ currentProjectId: id, currentProjectName: name }),
}));
