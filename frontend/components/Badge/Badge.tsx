'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'priority-high' | 'priority-medium' | 'priority-low' | 'status-completed' | 'status-progress' | 'status-todo';
  className?: string;
}

export function Badge({ children, variant = 'status-todo', className = '' }: BadgeProps) {
  const variantClasses = {
    'priority-high': 'badge-priority-high',
    'priority-medium': 'badge-priority-medium',
    'priority-low': 'badge-priority-low',
    'status-completed': 'badge-status badge-status-completed',
    'status-progress': 'badge-status badge-status-progress',
    'status-todo': 'badge-status badge-status-todo',
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface CategoryBadgeProps {
  children: React.ReactNode;
  category: 'work' | 'personal' | 'urgent' | 'ideas';
  icon?: React.ReactNode;
  className?: string;
}

export function CategoryBadge({ children, category, icon, className = '' }: CategoryBadgeProps) {
  const categoryClasses = {
    work: 'badge-category-work',
    personal: 'badge-category-personal',
    urgent: 'badge-category-urgent',
    ideas: 'badge-category-ideas',
  };

  const defaultIcons = {
    work: '📁',
    personal: '🏠',
    urgent: '🚨',
    ideas: '💡',
  };

  return (
    <span className={`badge-category ${categoryClasses[category]} ${className}`}>
      {icon || defaultIcons[category]}
      {children}
    </span>
  );
}

interface DueDateBadgeProps {
  date: Date | string;
  className?: string;
}

export function DueDateBadge({ date, className = '' }: DueDateBadgeProps) {
  const dueDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  // Reset time to compare dates only
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  threeDaysFromNow.setHours(0, 0, 0, 0);

  let variantClass = 'due-date-future';
  let label = 'Due';

  if (dueDate < today) {
    variantClass = 'due-date-overdue';
    label = 'Overdue';
  } else if (dueDate.getTime() === today.getTime()) {
    variantClass = 'due-date-today';
    label = 'Due Today';
  } else if (dueDate <= threeDaysFromNow) {
    variantClass = 'due-date-soon';
    label = 'Due Soon';
  }

  return (
    <span className={`due-date ${variantClass} ${className}`}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {label}: {dueDate.toLocaleDateString()}
    </span>
  );
}
