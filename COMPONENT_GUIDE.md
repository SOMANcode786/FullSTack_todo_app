# Design System Implementation Guide

## Overview

This guide shows how to use the new design system components in your To-Do application.

## Quick Start

### 1. Import Components

```tsx
// Badges
import { Badge, CategoryBadge, DueDateBadge } from '@/components/Badge/Badge';

// Progress Indicators
import { ProgressBar, TaskCounter, CircularProgress, LoadingSpinner } from '@/components/Progress/Progress';

// Notifications
import { Notification, Alert, ToastContainer } from '@/components/Notification/Notification';

// Theme Toggle
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
```

### 2. Using Badges

```tsx
// Priority Badges
<Badge variant="priority-high">High Priority</Badge>
<Badge variant="priority-medium">Medium Priority</Badge>
<Badge variant="priority-low">Low Priority</Badge>

// Status Badges
<Badge variant="status-completed">Completed</Badge>
<Badge variant="status-progress">In Progress</Badge>
<Badge variant="status-todo">To Do</Badge>

// Category Badges
<CategoryBadge category="work">Work</CategoryBadge>
<CategoryBadge category="personal">Personal</CategoryBadge>
<CategoryBadge category="urgent">Urgent</CategoryBadge>
<CategoryBadge category="ideas">Ideas</CategoryBadge>

// Due Date Badge
<DueDateBadge date={new Date('2026-02-15')} />
```

### 3. Using Progress Indicators

```tsx
// Progress Bar
<ProgressBar value={7} max={10} showLabel />

// Task Counter
<TaskCounter completed={5} total={10} />

// Circular Progress
<CircularProgress value={75} max={100} size={120} />

// Loading Spinner
<LoadingSpinner size="md" />
```

### 4. Using Notifications

```tsx
// Simple Notification
<Notification
  type="success"
  message="Task created successfully!"
  autoClose
  duration={5000}
/>

// Alert with Title
<Alert type="info" title="Important Notice">
  Your tasks have been synced with the server.
</Alert>

// Toast Container
<ToastContainer position="top-right">
  <Notification type="success" message="Saved!" />
  <Notification type="error" message="Failed to delete" />
</ToastContainer>
```

### 5. Using CSS Classes

```tsx
// Buttons
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-danger">Danger Button</button>
<button className="btn-icon">Icon Button</button>

// Form Inputs
<input type="text" className="form-input" placeholder="Enter text" />
<textarea className="form-textarea" placeholder="Enter description" />
<label className="form-label">Task Title</label>

// Cards
<div className="card">Card Content</div>
<div className="task-card">Task Card Content</div>

// Notifications (CSS only)
<div className="notification-success">Success message</div>
<div className="notification-error">Error message</div>
<div className="notification-warning">Warning message</div>
<div className="notification-info">Info message</div>
```

## Dark Mode

### Enable Dark Mode

The theme toggle is already integrated into the Navbar. Users can click the sun/moon icon to switch themes.

### Manual Theme Control

```tsx
// Set dark mode
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');

// Set light mode
document.documentElement.classList.remove('dark');
localStorage.setItem('theme', 'light');
```

### Dark Mode Styling

All components automatically support dark mode. Use Tailwind's `dark:` prefix for custom styling:

```tsx
<div className="bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary">
  Content
</div>
```

## Color Palette

### Primary Colors
- `primary-500` (#3B82F6) - Main brand color
- `primary-600` (#2563EB) - Hover states
- `primary-400` (#60A5FA) - Dark mode primary

### Accent Colors
- `accent-green` (#10B981) - Success, completed
- `accent-orange` (#F59E0B) - Warnings, priority
- `accent-red` (#EF4444) - Errors, delete
- `accent-purple` (#8B5CF6) - Categories, tags

### Neutral Colors (Light Mode)
- `gray-50` to `gray-900` - Text and backgrounds

### Dark Mode Colors
- `dark-bg` (#0F172A) - Page background
- `dark-surface` (#1E293B) - Card backgrounds
- `dark-border` (#334155) - Borders
- `dark-text-primary` (#F1F5F9) - Primary text
- `dark-text-secondary` (#94A3B8) - Secondary text

## Typography

### Font Family
- Primary: Inter (already imported via Google Fonts)
- Monospace: JetBrains Mono

### Font Sizes
```tsx
<h1 className="text-4xl font-bold">Page Title</h1>
<h2 className="text-3xl font-semibold">Section Header</h2>
<h3 className="text-2xl font-semibold">Card Title</h3>
<p className="text-base">Body text</p>
<span className="text-sm">Small text</span>
<span className="text-xs">Caption</span>
```

### Text Gradient
```tsx
<h1 className="text-gradient">Gradient Text</h1>
```

## Animations

### Built-in Animations
- `animate-fadeIn` - Fade in effect
- `animate-slideIn` - Slide in from left
- `float-animation` - Floating effect
- `shimmer` - Shimmer loading effect

### Usage
```tsx
<div className="animate-fadeIn">Fades in on mount</div>
<div className="float-animation">Floats up and down</div>
```

## Utility Classes

### Container
```tsx
<div className="container">Centered content with max-width</div>
```

### Hover Effects
```tsx
<div className="hover-lift">Lifts on hover</div>
```

### Empty State
```tsx
<div className="empty-state">
  <div className="empty-state-icon">
    <svg>...</svg>
  </div>
  <h3 className="empty-state-title">No items found</h3>
  <p className="empty-state-description">Get started by creating your first item.</p>
</div>
```

### Divider
```tsx
<div className="divider" />
```

### Skeleton Loaders
```tsx
<div className="skeleton-title" />
<div className="skeleton-text" />
<div className="skeleton-avatar" />
```

## Accessibility

### Focus States
All interactive elements have visible focus states using `focus-visible`:
```css
*:focus-visible {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}
```

### ARIA Labels
Always include ARIA labels for icon buttons:
```tsx
<button aria-label="Delete task" className="btn-icon">
  <TrashIcon />
</button>
```

### Color Contrast
All color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

## Best Practices

1. **Use semantic HTML** - Use proper heading hierarchy, buttons for actions, links for navigation
2. **Prefer design system components** - Use the provided components instead of custom styling
3. **Test dark mode** - Always test your UI in both light and dark modes
4. **Keep it simple** - Don't over-engineer; use the minimal amount of styling needed
5. **Mobile-first** - Design for mobile screens first, then enhance for larger screens
6. **Consistent spacing** - Use the spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)

## Examples

### Task Card with All Features

```tsx
<div className="task-card">
  <div className="flex items-start justify-between mb-3">
    <div className="flex items-center gap-2">
      <input type="checkbox" className="task-checkbox" />
      <h3 className="text-lg font-semibold">Complete project proposal</h3>
    </div>
    <Badge variant="priority-high">High</Badge>
  </div>

  <p className="text-gray-600 dark:text-dark-text-secondary mb-3">
    Finish the Q1 project proposal and submit to management
  </p>

  <div className="flex flex-wrap gap-2 mb-3">
    <CategoryBadge category="work">Work</CategoryBadge>
    <DueDateBadge date={new Date('2026-02-15')} />
  </div>

  <div className="flex items-center justify-between">
    <div className="flex gap-2">
      <button className="btn-secondary text-sm">Edit</button>
      <button className="btn-danger-alt text-sm">Delete</button>
    </div>
    <Badge variant="status-progress">In Progress</Badge>
  </div>
</div>
```

### Dashboard with Progress

```tsx
<div className="card">
  <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

  <div className="mb-6">
    <TaskCounter completed={7} total={10} className="mb-2" />
    <ProgressBar value={7} max={10} showLabel />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div className="text-center">
      <CircularProgress value={70} size={100} />
      <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">
        Overall Completion
      </p>
    </div>
    <div className="text-center">
      <CircularProgress value={85} size={100} />
      <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">
        This Week
      </p>
    </div>
  </div>
</div>
```

## Troubleshooting

### Dark mode not working
- Ensure `darkMode: 'class'` is set in `tailwind.config.ts`
- Check that the `dark` class is being added to `<html>` element
- Verify localStorage is accessible

### Styles not applying
- Run `npm run dev` to rebuild Tailwind
- Check that component files are in the `content` array in `tailwind.config.ts`
- Clear browser cache

### Colors look different
- Ensure CSS variables are defined in `globals.css`
- Check that you're using the correct color names from the palette
- Verify the theme (light/dark) is set correctly

## Resources

- Full Design System Documentation: `DESIGN_SYSTEM.md`
- Tailwind Configuration: `tailwind.config.ts`
- Global Styles: `app/globals.css`
- Component Examples: This guide
