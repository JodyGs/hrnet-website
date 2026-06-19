# Claude Development Guide for HRnet

## User Preferences
- **Language**: French (for communication)
- **Tech Stack**: React + TypeScript + Tailwind CSS + Vite
- **Work Style**: Step-by-step (étapes), prefers realistic git workflow with staggered commits
- **Email**: dev@chrom.fr

## Design Requirements
- ✅ **hrnet-website**: Full Tailwind CSS styling (modern, polished design)
- ⚠️ **hrnet-app**: Original simple CSS (100% fidelity to base design, NOT Tailwind)
- When design requirements are ambiguous, ask before implementing

## Repository
- GitHub: https://github.com/JodyGs/hrnet-website
- Local: C:\Users\jody\Desktop\Claude\hrnet-website
- Dev Server: `npm run dev` → http://localhost:5173/

## Project Structure
```
src/App.tsx (routing) → CreateEmployee.tsx (form) ↔ EmployeeList.tsx (table)
├── DatePicker component (custom, Tailwind styled)
├── employeeService (localStorage CRUD)
├── TypeScript types (strict mode)
└── Tailwind CSS (v4 with @tailwindcss/postcss)
```

## Quick Commands
- Start: `npm run dev`
- Build: `npm run build`
- Install deps: `npm install`
- Deploy: Push to GitHub (auto or manual)

## Development Notes
- Commit messages: "feat:", "fix:", "chore:" prefixes
- localStorage key: `'hrnet_employees'`
- No Redux/complex state — use hooks + localStorage
- TypeScript strict: Don't disable for convenience
- Tailwind colors: Blue primary (#3B82F6), grays for contrast

## Related Projects
- **hrnet-app** (https://github.com/JodyGs/hrnet-app): Reference version with original CSS
- **jQuery Original** (~/Desktop/Claude/jquery): Original implementation

## Important Feedback
🔴 **Design Fidelity**: User corrected me once for over-styling with Tailwind when they wanted original design. Always respect stated design requirements explicitly.
