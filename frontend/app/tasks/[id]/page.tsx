'use client';

import { useEffect, useState } from 'react';
import { apiClient, Task } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm/TaskForm';
import { TaskFormData } from '@/lib/types';
import { isAuthenticatedClient, getCurrentUserId } from '@/lib/auth-utils';
import Link from 'next/link';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const taskId = params.id as string;

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticatedClient()) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    const userId = getCurrentUserId();
    if (userId && taskId) {
      fetchTask(userId, taskId);
    }
  }, [taskId]);

  const fetchTask = async (userId: string, taskId: string) => {
    try {
      const taskData = await apiClient.tasks.getById(userId, taskId);
      setTask(taskData);
    } catch (err) {
      setError('Failed to load task');
      console.error(err);
    }
  };

  const handleUpdate = async (taskData: TaskFormData) => {
    const userId = getCurrentUserId();
    if (!userId || !task) return;

    try {
      const updatedTask = await apiClient.tasks.update(
        userId,
        task.id,
        {
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed
        }
      );
      setTask(updatedTask);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleToggleComplete = async () => {
    const userId = getCurrentUserId();
    if (!userId || !task) return;

    try {
      const updatedTask = await apiClient.tasks.toggleComplete(
        userId,
        task.id,
        !task.completed
      );
      setTask(updatedTask);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const userId = getCurrentUserId();
    if (!userId || !task) return;

    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.tasks.delete(userId, task.id);
        router.push('/tasks'); // Redirect to tasks list after deletion
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  // Check authentication before rendering
  if (!isAuthenticatedClient()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null; // Render nothing while redirecting
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading task...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Link href="/tasks" className="text-indigo-600 hover:text-indigo-800 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
      </div>

      {error && (
        <div className="notification-error rounded-lg mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {!isEditing ? (
        <div className="card">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="task-checkbox mt-1"
            />
            <div className="flex-1 min-w-0">
              <h2 className={`text-2xl font-bold ${task.completed ? 'task-completed' : ''}`}>
                {task.title}
              </h2>
              {task.description && (
                <p className={`mt-3 text-gray-700 whitespace-pre-line ${task.completed ? 'task-completed' : ''}`}>
                  {task.description}
                </p>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Task
                </button>
                <button
                  onClick={handleDelete}
                  className="btn-danger flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Task
                </button>
                <button
                  onClick={() => router.back()}
                  className="btn-secondary flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
          <TaskForm
            task={{
              title: task.title,
              description: task.description || '',
              completed: task.completed
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            submitLabel="Update Task"
          />
        </div>
      )}
    </div>
  );
}