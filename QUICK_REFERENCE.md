# Design System Quick Reference

## 🎨 Color Palette

### Primary
- `primary-500` - Main brand (#3B82F6)
- `primary-600` - Hover (#2563EB)
- `primary-400` - Dark mode (#60A5FA)

### Accents
- `accent-green` - Success (#10B981)
- `accent-orange` - Warning (#F59E0B)
- `accent-red` - Error (#EF4444)
- `accent-purple` - Tags (#8B5CF6)

### Dark Mode
- `dark-bg` - Background (#0F172A)
- `dark-surface` - Cards (#1E293B)
- `dark-border` - Borders (#334155)

## 🔤 Typography

```tsx
text-4xl (36px) - Page titles
text-3xl (30px) - Section headers
text-2xl (24px) - Card titles
text-xl (20px)  - Subheadings
text-base (16px) - Body text
text-sm (14px)  - Small text
text-xs (12px)  - Captions
```

## 🎯 Components

### Badges
```tsx
<Badge variant="priority-high">High</Badge>
<CategoryBadge category="work">Work</CategoryBadge>
<DueDateBadge date={new Date()} />
```

### Progress
```tsx
<ProgressBar value={7} max={10} showLabel />
<TaskCounter completed={5} total={10} />
<CircularProgress value={75} />
<LoadingSpinner size="md" />
```

### Notifications
```tsx
<Notification type="success" message="Done!" />
<Alert type="info" title="Note">Content</Alert>
```

### Buttons
```tsx
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-danger">Danger</button>
<button className="btn-icon">Icon</button>
```

### Forms
```tsx
<input className="form-input" />
<textarea className="form-textarea" />
<label className="form-label">Label</label>
<input type="checkbox" className="task-checkbox" />
```

### Cards
```tsx
<div className="card">Standard card</div>
<div className="task-card">Task card</div>
```

## 🌓 Dark Mode

```tsx
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
<ThemeToggle />
```

## 📦 Import All Components

```tsx
import {
  Badge,
  CategoryBadge,
  DueDateBadge,
  ProgressBar,
  TaskCounter,
  CircularProgress,
  LoadingSpinner,
  Notification,
  Alert,
  ThemeToggle
} from '@/components';
```

## 🎭 Animations

- `animate-fadeIn` - Fade in
- `animate-slideIn` - Slide from left
- `float-animation` - Floating effect
- `shimmer` - Loading shimmer

## 🔧 Utilities

- `container` - Centered max-width container
- `hover-lift` - Lift on hover
- `text-gradient` - Gradient text
- `divider` - Horizontal divider
- `empty-state` - Empty state layout
- `skeleton` - Loading skeleton

## 📱 Responsive

All components are mobile-first and responsive by default.

## ♿ Accessibility

- All interactive elements have focus states
- ARIA labels on icon buttons
- Color contrast meets WCAG AA
- Keyboard navigation supported

## 🚀 Demo

Visit `/demo` to see all components in action.

## 📚 Full Documentation

- Design System: `DESIGN_SYSTEM.md`
- Component Guide: `COMPONENT_GUIDE.md`
