# HRnet React Conversion - Project Continuation Guide

## Quick Start on New Machine

### Prerequisites
- Node.js 16+ installed
- Git configured
- Text editor/IDE (VS Code recommended)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/JodyGs/hrnet-website.git
   cd hrnet-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   App will be available at: **http://localhost:5173/**

4. **Build for production** (when ready)
   ```bash
   npm run build
   ```

---

## Project Architecture

### Technology Stack
- **Framework**: React 18+ (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (@tailwindcss/postcss)
- **State Management**: React hooks + localStorage
- **Language**: TypeScript (strict mode)

### Directory Structure
```
src/
├── App.tsx                          # Main routing component
├── main.tsx                         # React entry point
├── index.css                        # Tailwind imports
├── pages/
│   ├── CreateEmployee.tsx           # Employee form page
│   └── EmployeeList.tsx             # Employee table page
├── components/
│   └── DatePicker/
│       └── DatePicker.tsx           # Custom date picker component
├── services/
│   └── employeeService.ts           # CRUD operations & localStorage
├── types/
│   └── index.ts                     # TypeScript type definitions
├── hooks/
│   └── useLocalStorage.ts           # Custom localStorage hook
└── data/
    └── states.ts                    # US states list
```

---

## Feature Overview

### CreateEmployee Page
- Form with fields: firstName, lastName, dateOfBirth, startDate, street, city, state, zipCode, department
- Custom DatePicker component (MM/DD/YYYY format)
- Address section with fieldset styling
- Department dropdown (Sales, Marketing, Engineering, HR, Legal)
- Form validation for required fields
- Confirmation modal on successful submission
- Button to view employee list

### EmployeeList Page
- Responsive table displaying all employees
- **Sortable Columns**: Click header to sort (↑/↓ indicators)
  - Supported fields: firstName, lastName, startDate, department, dateOfBirth, street, city, state, zipCode
- **Search/Filter**: Real-time filtering across all fields
- **Delete Function**: Delete button with confirmation dialog
- Entry counter: "Showing X of Y entries"
- Alternating row colors for readability
- Create Employee button for quick navigation
- Home button to return to form

### Data Persistence
- All employee data stored in browser localStorage
- Key: `hrnet_employees`
- Data persists across browser sessions
- Clear button in service if needed to reset

---

## Key Components Deep Dive

### DatePicker Component (`src/components/DatePicker/DatePicker.tsx`)
```typescript
interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
}
```
- Custom calendar UI with month navigation
- Click day to select date
- Close button to dismiss calendar
- Tailwind styling with blue color scheme

### Employee Service (`src/services/employeeService.ts`)
```typescript
// Available functions:
employeeService.getAll()              // Returns all employees
employeeService.add(employee)         // Add new employee
employeeService.delete(id)            // Delete by ID
employeeService.clear()               // Clear all data
```

### App Routing (`src/App.tsx`)
- Toggle between CreateEmployee and EmployeeList pages
- State management for current page
- Callback handlers for navigation

---

## Git Commit History

The project was developed with realistic staggered commits:

1. `8af0698` - init: Initialize Vite React TypeScript Tailwind CSS project
2. `03fb37f` - feat: Add employee service, types, hooks and states data
3. `f6031ae` - feat: Add CreateEmployee page and DatePicker component with Tailwind styling
4. `0c06dd4` - feat: Add EmployeeList page with sorting and search functionality
5. `67c7873` - feat: Add App routing component and React mount
6. `c932575` - chore: Remove old Vite boilerplate and add React dependencies

---

## Configuration Files

### postcss.config.js
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

### tsconfig.json
- Strict mode enabled
- JSX set to react-jsx
- ESM modules

---

## Development Workflow

### Adding New Features
1. Create component/page in appropriate directory
2. Use TypeScript interfaces for type safety
3. Import and use in App.tsx or other components
4. Test in dev server (HMR enabled)
5. Commit with descriptive message
6. Push to GitHub

### Modifying Employee Form
- Edit `src/pages/CreateEmployee.tsx`
- Add new field to FormData interface
- Add input element to form
- Update employeeService if needed

### Styling
- All styling uses Tailwind CSS classes
- Common utilities: `px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500`
- Color scheme: Blue primary (#3B82F6)
- Responsive: Use `flex`, `grid`, `max-w-*` utilities

---

## Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5173 already in use
```bash
# Kill process or use different port
npm run dev -- --port 3000
```

### React/Tailwind not found errors
```bash
npm install react react-dom @tailwindcss/postcss
```

### localStorage not working
- Check browser DevTools Console for errors
- Clear localStorage: `localStorage.clear()` in console
- Ensure localStorage is not disabled

---

## Next Steps / Potential Improvements

1. **npm Package**: Publish DatePicker component to npm registry
2. **Performance**: Run Lighthouse audit and optimize
3. **Testing**: Add Vitest + React Testing Library
4. **Documentation**: Create comprehensive README with screenshots
5. **Deployment**: Build and deploy to GitHub Pages or Vercel
6. **Comparison**: Performance test vs. original jQuery version

---

## Important Notes for Future Work

- **Design Philosophy**: Keep Tailwind styling consistent with current blue theme
- **TypeScript**: Maintain strict mode and type safety
- **Commit Style**: Use descriptive messages with "feat:", "fix:", "chore:" prefixes
- **localStorage Key**: Always use `'hrnet_employees'` for consistency
- **State Management**: Stick with React hooks + localStorage (no Redux needed for current scope)

---

## Contact & Support

- GitHub: https://github.com/JodyGs/hrnet-website
- Email: dev@chrom.fr
- Original jQuery: ~/Desktop/Claude/jquery (for reference)

---

Last Updated: 2026-06-19
Project Status: ✅ Complete and functional
