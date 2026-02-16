// Type definitions for the Todo Frontend application

// User interface based on the data model
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task interface based on the data model
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Task form data interface
export interface TaskFormData {
  title: string;
  description?: string;
  completed: boolean;
}

// Session interface for authentication
export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  expires: string; // ISO date string
  token: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Props for components
export interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}