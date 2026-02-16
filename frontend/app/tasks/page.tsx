'use client';

import { useState, useEffect } from 'react';
import { apiClient, Task } from '@/lib/api';
import TaskCard from '@/components/TaskCard/TaskCard';
import Link from 'next/link';
import { isAuthenticatedClient, getCurrentUserId } from '@/lib/auth-utils';
import Navbar from '@/components/Navbar/Navbar';
import { ProgressBar, TaskCounter } from '@/components/Progress/Progress';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check authentication directly using the utility function
    if (!isAuthenticatedClient()) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    // If authenticated, load tasks
    const userId = getCurrentUserId();
    if (userId) {
      fetchTasks(userId);
    }
  }, []);

  const fetchTasks = async (userId: string) => {
    try {
      setLoading(true);
      const tasksData = await apiClient.tasks.getAll(userId);
      setTasks(tasksData);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    const userId = getCurrentUserId();
    if (!userId) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    try {
      const updatedTask = await apiClient.tasks.toggleComplete(userId, taskId, completed);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDelete = async (taskId: string) => {
    const userId = getCurrentUserId();
    if (!userId) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    try {
      await apiClient.tasks.delete(userId, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const handleUpdate = async (taskId: string, updatedTask: Partial<Task>) => {
    const userId = getCurrentUserId();
    if (!userId) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    try {
      const response = await apiClient.tasks.update(userId, taskId, updatedTask as any);
      setTasks(tasks.map(task => task.id === taskId ? response : task));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen animated-gradient flex items-center justify-center">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4" style={{ width: '48px', height: '48px', borderWidth: '5px' }}></div>
            <div className="text-xl font-semibold text-white">Loading your tasks...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen animated-gradient py-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="animate-fadeIn">
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Your Tasks</h1>
                <p className="text-white/90 text-lg">
                  Manage and organize your daily tasks
                </p>
              </div>
              <Link
                href="/tasks/new"
                className="btn-primary flex items-center justify-center w-full md:w-auto animate-fadeIn shadow-xl"
                style={{ animationDelay: '0.2s' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Task
              </Link>
            </div>

            {/* Statistics Card */}
            {totalTasks > 0 && (
              <div className="card mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">Progress Overview</h2>
                  <TaskCounter completed={completedTasks} total={totalTasks} />
                </div>
                <ProgressBar value={completedTasks} max={totalTasks} showLabel />
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-dark-surface-hover rounded-lg">
                    <div className="text-2xl font-bold text-primary-500 dark:text-primary-400">{totalTasks}</div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">Total</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-accent-green">{completedTasks}</div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-accent-orange">{totalTasks - completedTasks}</div>
                    <div className="text-sm text-gray-600 dark:text-dark-text-secondary">Remaining</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="notification-error rounded-lg mb-6 animate-slideInRight">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Tasks Grid */}
            {tasks.length === 0 ? (
              <div className="empty-state animate-fadeIn">
                <div className="empty-state-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="empty-state-title">No tasks yet</h3>
                <p className="empty-state-description">
                  Get started by creating your first task. You'll be able to organize and manage everything efficiently.
                </p>
                <Link
                  href="/tasks/new"
                  className="btn-primary inline-flex items-center mt-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create your first task
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TaskCard
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
