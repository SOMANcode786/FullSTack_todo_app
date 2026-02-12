'use client';

import { TaskFormData } from '@/lib/types';
import { useState } from 'react';

interface TaskFormProps {
  task?: TaskFormData;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function TaskForm({ task, onSubmit, onCancel, submitLabel = 'Create Task' }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { title?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        await onSubmit({ title: title.trim(), description: description.trim(), completed });
        // Don't clear the form here - let the parent component handle navigation
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate-fadeIn">
        <label htmlFor="title" className="form-label">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`form-input ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          placeholder="Enter task title..."
          autoFocus
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="form-error flex items-center animate-slideInRight">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>

      <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <label htmlFor="description" className="form-label">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="form-textarea"
          placeholder="Add more details about your task..."
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="task-checkbox"
          disabled={isSubmitting}
        />
        <label htmlFor="completed" className="ml-3 block text-sm font-medium text-gray-700 dark:text-dark-text-primary">
          Mark as completed
        </label>
      </div>

      <div className="flex space-x-4 pt-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <button
          type="submit"
          className="btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="loading-spinner mr-2" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
              Creating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {submitLabel}
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}