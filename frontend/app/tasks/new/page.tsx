'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import TaskForm from '@/components/TaskForm/TaskForm';
import { TaskFormData } from '@/lib/types';
import { isAuthenticatedClient, getCurrentUserId } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';

export default function NewTaskPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (taskData: TaskFormData) => {
    // Check if user is authenticated
    if (!isAuthenticatedClient()) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return;
    }

    const userId = getCurrentUserId();
    if (!userId) {
      setError('You must be logged in to create a task');
      return;
    }

    try {
      await apiClient.tasks.create(userId, {
        title: taskData.title,
        description: taskData.description
      });

      // Redirect back to tasks page after successful creation
      router.push('/tasks');
      router.refresh(); // Refresh to update the UI
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Check authentication on component mount
  if (!isAuthenticatedClient()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null; // Render nothing while redirecting
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen animated-gradient py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center mb-8 animate-fadeIn">
            <Link
              href="/tasks"
              className="text-white hover:text-yellow-300 mr-4 transition-all duration-300 transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Create New Task</h1>
              <p className="text-white/80 mt-1">Add a new task to your list</p>
            </div>
          </div>

          {error && (
            <div className="notification-error rounded-xl mb-6 animate-slideInRight">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              submitLabel="Create Task"
            />
          </div>
        </div>
      </div>
    </>
  );
}
