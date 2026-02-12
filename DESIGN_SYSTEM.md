# To-Do Application Design System

## Color Palette

### Light Mode

#### Primary Colors
```css
--primary-blue: #3B82F6      /* Main brand color - buttons, links */
--primary-blue-dark: #2563EB /* Hover states */
--primary-blue-light: #DBEAFE /* Backgrounds, highlights */

--accent-green: #10B981      /* Success, completed tasks */
--accent-orange: #F59E0B     /* Warnings, priority markers */
--accent-red: #EF4444        /* Errors, delete actions */
--accent-purple: #8B5CF6     /* Categories, tags */
```

#### Neutral Colors
```css
--white: #FFFFFF
--gray-50: #F9FAFB          /* Page background */
--gray-100: #F3F4F6         /* Card backgrounds */
--gray-200: #E5E7EB         /* Borders, dividers */
--gray-300: #D1D5DB         /* Disabled states */
--gray-400: #9CA3AF         /* Placeholder text */
--gray-500: #6B7280         /* Secondary text */
--gray-600: #4B5563         /* Body text */
--gray-700: #374151         /* Headings */
--gray-900: #111827         /* Primary text */
```

### Dark Mode

#### Primary Colors
```css
--primary-blue-dark: #60A5FA      /* Main brand color */
--primary-blue-darker: #3B82F6    /* Hover states */
--primary-blue-darkest: #1E3A8A   /* Backgrounds */

--accent-green-dark: #34D399
--accent-orange-dark: #FBBF24
--accent-red-dark: #F87171
--accent-purple-dark: #A78BFA
```

#### Neutral Colors (Dark)
```css
--dark-bg: #0F172A          /* Page background */
--dark-surface: #1E293B     /* Card backgrounds */
--dark-surface-hover: #334155 /* Hover states */
--dark-border: #334155      /* Borders, dividers */
--dark-text-primary: #F1F5F9 /* Primary text */
--dark-text-secondary: #94A3B8 /* Secondary text */
--dark-text-muted: #64748B  /* Muted text */
```

## Typography

### Font Families
```css
/* Primary Font - Clean, modern, excellent readability */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Alternative: Poppins for a friendlier feel */
--font-alt: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for code/IDs */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes & Weights
```css
/* Headings */
--text-4xl: 2.25rem;  /* 36px - Page titles */
--text-3xl: 1.875rem; /* 30px - Section headers */
--text-2xl: 1.5rem;   /* 24px - Card titles */
--text-xl: 1.25rem;   /* 20px - Subheadings */
--text-lg: 1.125rem;  /* 18px - Large body */

/* Body */
--text-base: 1rem;    /* 16px - Default */
--text-sm: 0.875rem;  /* 14px - Small text */
--text-xs: 0.75rem;   /* 12px - Captions, labels */

/* Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Scale
```
H1: 36px / Bold / Gray-900 (Light) or White (Dark)
H2: 30px / Semibold / Gray-800
H3: 24px / Semibold / Gray-700
H4: 20px / Medium / Gray-700
Body: 16px / Normal / Gray-600
Small: 14px / Normal / Gray-500
Caption: 12px / Normal / Gray-400
```

## Component Styles

### Buttons

#### Primary Button
```css
/* Light Mode */
background: #3B82F6
color: #FFFFFF
padding: 12px 24px
border-radius: 8px
font-weight: 600
font-size: 16px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
transition: all 0.2s ease

hover:
  background: #2563EB
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3)
  transform: translateY(-1px)

active:
  transform: translateY(0)
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)

disabled:
  background: #D1D5DB
  cursor: not-allowed
  opacity: 0.6
```

#### Secondary Button
```css
background: transparent
color: #3B82F6
border: 2px solid #3B82F6
padding: 10px 22px
border-radius: 8px
font-weight: 600

hover:
  background: #DBEAFE
  border-color: #2563EB
```

#### Danger Button
```css
background: #EF4444
color: #FFFFFF
padding: 12px 24px
border-radius: 8px

hover:
  background: #DC2626
```

#### Icon Button
```css
width: 40px
height: 40px
border-radius: 8px
background: transparent
color: #6B7280

hover:
  background: #F3F4F6
  color: #374151
```

### Cards

#### Task Card
```css
/* Light Mode */
background: #FFFFFF
border: 1px solid #E5E7EB
border-radius: 12px
padding: 20px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)
transition: all 0.2s ease

hover:
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
  transform: translateY(-2px)
  border-color: #3B82F6

/* Dark Mode */
background: #1E293B
border: 1px solid #334155
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

hover:
  border-color: #60A5FA
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5)
```

#### Completed Task Card
```css
background: #F9FAFB (Light) / #0F172A (Dark)
opacity: 0.7
border-color: #10B981

/* Strikethrough text */
text-decoration: line-through
color: #9CA3AF
```

### Input Fields

#### Text Input
```css
/* Light Mode */
background: #FFFFFF
border: 2px solid #E5E7EB
border-radius: 8px
padding: 12px 16px
font-size: 16px
color: #374151
transition: all 0.2s ease

focus:
  border-color: #3B82F6
  outline: none
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

error:
  border-color: #EF4444
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

/* Dark Mode */
background: #1E293B
border-color: #334155
color: #F1F5F9

focus:
  border-color: #60A5FA
```

#### Textarea
```css
/* Same as text input but with */
min-height: 120px
resize: vertical
line-height: 1.6
```

#### Checkbox
```css
width: 20px
height: 20px
border: 2px solid #D1D5DB
border-radius: 4px
cursor: pointer
transition: all 0.2s ease

checked:
  background: #3B82F6
  border-color: #3B82F6
  /* Checkmark icon */

hover:
  border-color: #3B82F6
```

### Alerts & Notifications

#### Success Alert
```css
background: #D1FAE5
border-left: 4px solid #10B981
color: #065F46
padding: 16px
border-radius: 8px
font-size: 14px

/* Icon: Check circle in #10B981 */
```

#### Error Alert
```css
background: #FEE2E2
border-left: 4px solid #EF4444
color: #991B1B
padding: 16px
border-radius: 8px
```

#### Warning Alert
```css
background: #FEF3C7
border-left: 4px solid #F59E0B
color: #92400E
padding: 16px
border-radius: 8px
```

#### Info Alert
```css
background: #DBEAFE
border-left: 4px solid #3B82F6
color: #1E40AF
padding: 16px
border-radius: 8px
```

### Badges & Labels

#### Priority Badges
```css
/* High Priority */
background: #FEE2E2
color: #991B1B
padding: 4px 12px
border-radius: 12px
font-size: 12px
font-weight: 600

/* Medium Priority */
background: #FEF3C7
color: #92400E

/* Low Priority */
background: #DBEAFE
color: #1E40AF
```

#### Category Tags
```css
background: #F3E8FF
color: #6B21A8
padding: 6px 12px
border-radius: 16px
font-size: 13px
font-weight: 500
display: inline-flex
align-items: center
gap: 6px

/* Different colors for categories */
.work: background: #DBEAFE, color: #1E40AF
.personal: background: #D1FAE5, color: #065F46
.urgent: background: #FEE2E2, color: #991B1B
.ideas: background: #F3E8FF, color: #6B21A8
```

#### Status Badge
```css
/* Completed */
background: #10B981
color: #FFFFFF
padding: 4px 10px
border-radius: 12px
font-size: 11px
font-weight: 600
text-transform: uppercase
letter-spacing: 0.5px

/* In Progress */
background: #F59E0B
color: #FFFFFF

/* Todo */
background: #6B7280
color: #FFFFFF
```

## UI/UX Features

### Task Categories
```
📁 Work - Blue (#3B82F6)
🏠 Personal - Green (#10B981)
🎯 Goals - Purple (#8B5CF6)
💡 Ideas - Yellow (#F59E0B)
🚨 Urgent - Red (#EF4444)
```

### Priority Levels
```
🔴 High - Red badge, top of list
🟡 Medium - Orange badge, middle priority
🟢 Low - Blue badge, lower priority
⚪ None - Gray, default
```

### Due Date Indicators
```css
/* Overdue */
color: #EF4444
font-weight: 600
background: #FEE2E2
padding: 4px 8px
border-radius: 6px

/* Due Today */
color: #F59E0B
background: #FEF3C7

/* Due Soon (within 3 days) */
color: #3B82F6
background: #DBEAFE

/* Future */
color: #6B7280
background: transparent
```

### Progress Indicators

#### Progress Bar
```css
/* Container */
width: 100%
height: 8px
background: #E5E7EB
border-radius: 4px
overflow: hidden

/* Fill */
background: linear-gradient(90deg, #3B82F6, #8B5CF6)
height: 100%
border-radius: 4px
transition: width 0.3s ease
```

#### Circular Progress
```css
/* SVG circle with stroke-dasharray animation */
stroke: #3B82F6
stroke-width: 4
fill: none
stroke-linecap: round
```

#### Task Counter
```css
background: #3B82F6
color: #FFFFFF
padding: 4px 12px
border-radius: 12px
font-size: 14px
font-weight: 600

/* Format: "5/10 completed" */
```

### Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

animation: fadeIn 0.3s ease-out;
```

#### Slide In
```css
@keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

animation: slideIn 0.4s ease-out;
```

#### Bounce
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

animation: bounce 0.5s ease-in-out;
```

#### Task Complete
```css
@keyframes taskComplete {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 0.7; }
}

animation: taskComplete 0.4s ease-out;
```

### Spacing System
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
```

### Border Radius
```css
--radius-sm: 4px   /* Small elements */
--radius-md: 8px   /* Buttons, inputs */
--radius-lg: 12px  /* Cards */
--radius-xl: 16px  /* Modals */
--radius-full: 9999px /* Pills, badges */
```

### Shadows
```css
/* Light Mode */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)

/* Dark Mode */
--shadow-dark-sm: 0 1px 2px rgba(0, 0, 0, 0.3)
--shadow-dark-md: 0 4px 6px rgba(0, 0, 0, 0.4)
--shadow-dark-lg: 0 10px 15px rgba(0, 0, 0, 0.5)
```

## Accessibility

### Color Contrast Ratios
```
- Primary text on white: 7:1 (AAA)
- Secondary text on white: 4.5:1 (AA)
- Button text on primary blue: 4.5:1 (AA)
- All interactive elements: minimum 3:1
```

### Focus States
```css
/* All interactive elements */
focus-visible:
  outline: 2px solid #3B82F6
  outline-offset: 2px
  border-radius: 4px
```

### Screen Reader Support
```
- All icons have aria-labels
- Form inputs have associated labels
- Status changes announced
- Loading states communicated
```

## Implementation Notes

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Tailwind Configuration
Add to `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
      },
      // Add other custom colors
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  }
}
```

### Dark Mode Toggle
```javascript
// Use system preference or manual toggle
if (localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
```
