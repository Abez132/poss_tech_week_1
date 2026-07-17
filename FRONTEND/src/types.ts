export type Priority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  task: string;
  completed: boolean;
  priority: Priority;
}

export type Filter = "all" | "active" | "completed";
