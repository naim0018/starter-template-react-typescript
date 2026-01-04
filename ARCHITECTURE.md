# Architecture Documentation

## 🏗️ Project Structure

```
starter-template-react-typescript/
├── bin/                    # CLI tool for project initialization
│   └── cli.js             # Bootstrap script
├── public/                # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── common/           # Shared components and utilities
│   │   ├── DynamicForm/  # Form generation system
│   │   └── DynamicTable/ # Table component system
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Shadcn/ui components
│   │   └── ErrorBoundary.tsx
│   ├── hooks/           # Custom React hooks
│   ├── Layout/          # Layout components
│   │   ├── DashboardLayout/  # Admin dashboard shell
│   │   └── PublicLayout/     # Public pages shell
│   ├── lib/             # Third-party library configs
│   ├── pages/           # Page components
│   │   ├── Auth/       # Authentication pages
│   │   ├── Dashboard/  # Dashboard pages
│   │   └── Public/     # Public pages
│   ├── routes/          # Route configuration
│   ├── store/           # Redux store
│   │   ├── Api/        # RTK Query API definitions
│   │   └── Slices/     # Redux slices
│   ├── types/           # TypeScript type definitions
│   ├── ui/              # UI utilities and theme
│   ├── utils/           # Utility functions
│   │   └── Generator/  # Route/menu generators
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔄 Data Flow

### State Management (Redux Toolkit)

```
Components
    ↓
  useRedux hook / useSelector
    ↓
  Redux Store (store/index.ts)
    ├── Auth Slice (authSlice.ts)
    ├── Base API (BaseApi.ts)
    └── Feature APIs (injected endpoints)
```

#### Key Slices:
- **authSlice**: User authentication state
  - Stores: user data, tokens
  - Actions: login, logout, setUser
  - Persisted via redux-persist

#### RTK Query:
- **BaseApi**: Core API configuration
  - Automatic token injection
  - Token refresh handling
  - Error handling with reauth logic

### Routing (React Router 7)

```
routes/index.tsx (Route Configs)
    ↓
utils/Generator/RoutesGenerator.ts
    ↓
App.tsx (BrowserRouter)
    ↓
Layout Components (PublicLayout/DashboardLayout)
    ↓
Page Components
```

#### Route Organization:
- **publicRoutes**: Pages accessible without authentication
- **adminRoutes**: Dashboard pages requiring authentication
- Auto-generated from config objects

### Form System (Dynamic Forms)

```
Field Config Array
    ↓
generateZodSchema()
    ↓
CommonForm Component
    ├── React Hook Form
    ├── Zod Validation
    └── Conditional Logic
    ↓
Submit Handler
```

#### Features:
- Type-safe field definitions
- Dynamic validation schema generation
- Conditional field visibility
- File uploads with previews
- Multi-step forms
- Various field types (text, select, date, tags, etc.)

### Table System (Dynamic Tables)

```
Column Config + Data
    ↓
DynamicTable Component
    ├── Sorting
    ├── Filtering
    ├── Pagination
    ├── Row Selection
    └── Custom Renderers
    ↓
Table Actions
```

## 🎨 Styling Architecture

### Tailwind CSS v4

- Utility-first approach
- Custom theme configuration in CSS
- Responsive design utilities
- Dark mode support (next-themes)

### Component Patterns:
```tsx
// Preferred pattern
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">
  ...
</div>

// With conditional classes
<button className={cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500 text-white"
)}>
  Click me
</button>
```

## 🔐 Authentication Flow

```
1. User submits credentials
    ↓
2. API call via RTK Query
    ↓
3. Receive tokens (access + refresh)
    ↓
4. Store in Redux (persisted)
    ↓
5. Subsequent API calls include token
    ↓
6. If 401 error → attempt refresh
    ↓
7. Success: retry request | Failure: logout
```

### Token Management:
- Access token: Short-lived, included in Authorization header
- Refresh token: Long-lived, used to get new access token
- Automatic refresh on 401 errors
- Stored securely in Redux with persistence

## 🧩 Key Patterns

### Custom Hooks

```typescript
// useRedux: Typed Redux hooks
const { useAppSelector, useAppDispatch } = useRedux();

// useDebounce: Debounce values
const debouncedValue = useDebounce(value, 500);
```

### Component Composition

```tsx
// Layout composition
<DashboardLayout>
  <Outlet /> {/* Nested routes render here */}
</DashboardLayout>
```

### Error Handling

```tsx
// Component level
<ErrorBoundary fallback={<CustomError />}>
  <YourComponent />
</ErrorBoundary>

// API level (BaseApi automatic handling)
- 401 errors: Attempt token refresh
- Network errors: Logged, can trigger UI feedback
```

## 📦 Build & Bundle

### Vite Configuration

- **Dev Server**: Fast HMR with instant updates
- **Build**: Optimized production bundle
  - Code splitting
  - Tree shaking
  - Asset optimization
- **Path Aliases**: `@/*` maps to `src/*`

### Environment Variables

Required variables (`.env`):
```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENV=development
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 🎯 Best Practices

### Component Organization
```tsx
// 1. Imports
import { useState } from "react";
import { MyUtil } from "@/utils";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Component
const MyComponent = ({ title }: MyComponentProps) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>{title}</div>;
};

// 7. Export
export default MyComponent;
```

### State Management Guidelines

- **Local State**: Component-specific, temporary data
- **Redux State**: Shared, persisted, or complex data
- **Server State**: Use RTK Query for API data

### Performance Optimization

- Lazy load routes: `React.lazy()` for code splitting
- Memoize expensive computations: `useMemo`
- Prevent unnecessary re-renders: `React.memo`, `useCallback`
- Debounce user inputs: Use `useDebounce` hook

## 🧪 Testing Strategy (To Be Implemented)

### Unit Tests
- Components: Render, interactions, edge cases
- Hooks: State changes, side effects
- Utils: Pure functions, transformations

### Integration Tests
- Forms: Validation, submission
- API: Mocking, error handling
- Navigation: Route changes, guards

### E2E Tests
- User flows: Login, CRUD operations
- Critical paths: Checkout, form submissions

## 🚀 Deployment

### Build Command
```bash
npm run build
```

### Output
- `dist/` directory with optimized assets
- Ready for static hosting (Vercel, Netlify, etc.)

### Environment Setup
- Set production environment variables
- Configure CORS for API
- Enable HTTPS
- Set up CDN for assets

## 📚 Key Dependencies

| Package | Purpose |
|---------|---------|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite 6 | Build tool |
| React Router 7 | Routing |
| Redux Toolkit | State management |
| RTK Query | Data fetching |
| React Hook Form | Form handling |
| Zod | Validation |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## 🔄 Update Strategy

When updating dependencies:
1. Check breaking changes in changelogs
2. Update one major version at a time
3. Run tests after updates
4. Update related code patterns
5. Document any migration steps

---

For more details, see individual module documentation in source files.
