// API client with JWT handling for mock authentication
// In a real implementation, this would connect to the backend API
import { getJwtToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Generic API request function with JWT token handling
 */
const apiRequest = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  const { method = 'GET', body, headers = {} } = options;

  // Get JWT token from auth session
  const token = getJwtToken();

  // Real API implementation
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Handle different response statuses
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorData}`);
  }

  // Handle 204 No Content (for DELETE operations)
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  // Handle different content types
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text() as unknown as T;
  }
};

/**
 * Mock API implementation for development
 */
const mockApiCall = async <T>(endpoint: string, options: { method: string, body?: any, headers?: Record<string, string>, token?: string }): Promise<T> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Parse the endpoint to determine the operation
  const parts = endpoint.split('/');
  const userId = parts[2]; // Assuming format is /api/{userId}/tasks...
  const taskId = parts[4]; // Assuming format is /api/{userId}/tasks/{taskId}

  // Initialize mock tasks in localStorage if not present
  if (!localStorage.getItem('mock-tasks')) {
    localStorage.setItem('mock-tasks', JSON.stringify([]));
  }

  let tasks: any[] = JSON.parse(localStorage.getItem('mock-tasks') || '[]');

  switch (true) {
    case endpoint.includes('/tasks') && options.method === 'GET' && !taskId:
      // Get all tasks for user
      const userTasks = tasks.filter(task => task.userId === userId);
      return userTasks as unknown as T;

    case endpoint.includes('/tasks') && taskId && options.method === 'GET':
      // Get specific task
      const task = tasks.find(t => t.id === taskId && t.userId === userId);
      if (!task) {
        throw new Error('Task not found');
      }
      return task as unknown as T;

    case endpoint.includes('/tasks') && options.method === 'POST':
      // Create new task
      const newTask = {
        id: 'task-' + Math.random().toString(36).substr(2, 9),
        userId,
        title: options.body.title,
        description: options.body.description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.push(newTask);
      localStorage.setItem('mock-tasks', JSON.stringify(tasks));
      return newTask as unknown as T;

    case endpoint.includes('/tasks') && taskId && options.method === 'PUT':
      // Update task
      const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...options.body,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('mock-tasks', JSON.stringify(tasks));
      return tasks[taskIndex] as unknown as T;

    case endpoint.includes('/tasks') && taskId && endpoint.endsWith('/complete') && options.method === 'PATCH':
      // Toggle complete status
      const toggleIndex = tasks.findIndex(t => t.id === taskId && t.userId === userId);
      if (toggleIndex === -1) {
        throw new Error('Task not found');
      }
      tasks[toggleIndex] = {
        ...tasks[toggleIndex],
        completed: options.body.completed,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('mock-tasks', JSON.stringify(tasks));
      return tasks[toggleIndex] as unknown as T;

    case endpoint.includes('/tasks') && taskId && options.method === 'DELETE':
      // Delete task
      tasks = tasks.filter(t => !(t.id === taskId && t.userId === userId));
      localStorage.setItem('mock-tasks', JSON.stringify(tasks));
      return undefined as unknown as T;

    default:
      throw new Error(`Unsupported endpoint: ${endpoint}`);
  }
};

/**
 * API client object with specific methods for different operations
 */
export const apiClient = {
  // Task-related API calls
  tasks: {
    getAll: (userId: string) => apiRequest<Task[]>(`/api/${userId}/tasks`),
    getById: (userId: string, taskId: string) => apiRequest<Task>(`/api/${userId}/tasks/${taskId}`),
    create: (userId: string, taskData: CreateTaskRequest) => apiRequest<Task>(`/api/${userId}/tasks`, {
      method: 'POST',
      body: taskData
    }),
    update: (userId: string, taskId: string, taskData: UpdateTaskRequest) => apiRequest<Task>(`/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      body: taskData
    }),
    delete: (userId: string, taskId: string) => apiRequest<void>(`/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE'
    }),
    toggleComplete: (userId: string, taskId: string, completed: boolean) => apiRequest<Task>(`/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      body: { completed }
    })
  },

  // Auth-related API calls (if needed)
  auth: {
    // These might be handled by Better Auth directly
  }
};

// Type definitions based on the data model
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}