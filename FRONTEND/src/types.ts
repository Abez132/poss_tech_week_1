export interface Task {
  id: string;
  task: string;
  completed: boolean;
}

export type Filter = "all" | "active" | "completed";
