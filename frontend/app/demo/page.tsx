'use client';

import { useState } from 'react';
import { Badge, CategoryBadge, DueDateBadge } from '@/components/Badge/Badge';
import { ProgressBar, TaskCounter, CircularProgress, LoadingSpinner } from '@/components/Progress/Progress';
import { Notification, Alert } from '@/components/Notification/Notification';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function DesignSystemDemo() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <div className="min-h-screen animated-gradient py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Design System Demo</h1>
            <p className="text-white/90">Explore all available components and styles</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Notifications Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Notifications & Alerts</h2>
            <div className="space-y-4">
              <Notification type="success" message="Task completed successfully!" autoClose={false} />
              <Notification type="error" message="Failed to delete task. Please try again." autoClose={false} />
              <Notification type="warning" message="Your session will expire in 5 minutes." autoClose={false} />
              <Notification type="info" message="New features are now available!" autoClose={false} />

              <div className="divider" />

              <Alert type="success" title="Success!">
                Your changes have been saved successfully.
              </Alert>
              <Alert type="info" title="Did you know?">
                You can use keyboard shortcuts to navigate faster.
              </Alert>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Badges & Labels</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Priority Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="priority-high">High Priority</Badge>
                <Badge variant="priority-medium">Medium Priority</Badge>
                <Badge variant="priority-low">Low Priority</Badge>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Status Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="status-completed">Completed</Badge>
                <Badge variant="status-progress">In Progress</Badge>
                <Badge variant="status-todo">To Do</Badge>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Category Badges</h3>
              <div className="flex flex-wrap gap-2">
                <CategoryBadge category="work">Work</CategoryBadge>
                <CategoryBadge category="personal">Personal</CategoryBadge>
                <CategoryBadge category="urgent">Urgent</CategoryBadge>
                <CategoryBadge category="ideas">Ideas</CategoryBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Due Date Badges</h3>
              <div className="flex flex-wrap gap-2">
                <DueDateBadge date={new Date(Date.now() - 86400000)} />
                <DueDateBadge date={new Date()} />
                <DueDateBadge date={new Date(Date.now() + 86400000)} />
                <DueDateBadge date={new Date(Date.now() + 604800000)} />
              </div>
            </div>
          </div>
        </section>

        {/* Progress Indicators Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Progress Indicators</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Progress Bars</h3>
              <div className="space-y-4">
                <ProgressBar value={25} max={100} showLabel />
                <ProgressBar value={50} max={100} showLabel />
                <ProgressBar value={75} max={100} showLabel />
                <ProgressBar value={100} max={100} showLabel />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Task Counters</h3>
              <div className="flex flex-wrap gap-4">
                <TaskCounter completed={3} total={10} />
                <TaskCounter completed={7} total={10} />
                <TaskCounter completed={10} total={10} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Circular Progress</h3>
              <div className="flex flex-wrap gap-8">
                <CircularProgress value={25} max={100} size={120} />
                <CircularProgress value={50} max={100} size={120} />
                <CircularProgress value={75} max={100} size={120} />
                <CircularProgress value={100} max={100} size={120} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Loading Spinners</h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs mt-2 text-gray-600 dark:text-dark-text-secondary">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs mt-2 text-gray-600 dark:text-dark-text-secondary">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs mt-2 text-gray-600 dark:text-dark-text-secondary">Large</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-danger">Danger Button</button>
              <button className="btn-danger-alt">Danger Alt</button>
              <button className="btn-icon">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button className="btn-primary" disabled>Disabled</button>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Text Input</label>
                <input type="text" className="form-input" placeholder="Enter text here..." />
              </div>
              <div>
                <label className="form-label">Textarea</label>
                <textarea className="form-textarea" placeholder="Enter description..."></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="task-checkbox" id="demo-checkbox" />
                <label htmlFor="demo-checkbox" className="text-sm font-medium">
                  Custom styled checkbox
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card hover-lift">
              <h3 className="text-xl font-bold mb-2">Standard Card</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                This is a standard card with hover lift effect.
              </p>
            </div>
            <div className="task-card">
              <div className="flex items-start gap-3 mb-3">
                <input type="checkbox" className="task-checkbox mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Task Card Example</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary mb-3">
                    This is a task card with all the styling applied.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <CategoryBadge category="work">Work</CategoryBadge>
                    <Badge variant="priority-high">High</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Typography</h2>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">Heading 1 - 36px Bold</h1>
              <h2 className="text-3xl font-semibold">Heading 2 - 30px Semibold</h2>
              <h3 className="text-2xl font-semibold">Heading 3 - 24px Semibold</h3>
              <h4 className="text-xl font-medium">Heading 4 - 20px Medium</h4>
              <p className="text-base">Body text - 16px Normal</p>
              <p className="text-sm">Small text - 14px Normal</p>
              <p className="text-xs">Caption - 12px Normal</p>
              <p className="text-gradient text-2xl font-bold">Gradient Text Effect</p>
            </div>
          </div>
        </section>

        {/* Empty State Section */}
        <section className="mb-8">
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="empty-state-title">No items found</h3>
              <p className="empty-state-description">
                Get started by creating your first item. It only takes a few seconds!
              </p>
              <button className="btn-primary mt-4">Create Item</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
