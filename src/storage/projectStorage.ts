import Dexie, { type Table } from 'dexie';

export interface SavedProject {
  id?: number;
  projectId: string;
  name: string;
  workspaceState: string;
  updatedAt: number;
}

export type { SavedProject as ProjectInfo };

class ProjectDatabase extends Dexie {
  projects!: Table<SavedProject>;

  constructor() {
    super('ImageProgramDB');
    this.version(1).stores({
      projects: '++id, projectId, name, updatedAt',
    });
  }
}

export const db = new ProjectDatabase();

export async function saveProject(
  projectId: string,
  name: string,
  workspaceState: string
): Promise<void> {
  const existing = await db.projects.where('projectId').equals(projectId).first();
  const now = Date.now();

  if (existing) {
    await db.projects.update(existing.id!, {
      name,
      workspaceState,
      updatedAt: now,
    });
  } else {
    await db.projects.add({
      projectId,
      name,
      workspaceState,
      updatedAt: now,
    });
  }
}

export async function loadProject(projectId: string): Promise<SavedProject | undefined> {
  return db.projects.where('projectId').equals(projectId).first();
}

export async function listProjects(): Promise<SavedProject[]> {
  return db.projects.orderBy('updatedAt').reverse().toArray();
}

export async function deleteProject(projectId: string): Promise<void> {
  await db.projects.where('projectId').equals(projectId).delete();
}
