# Setup Guide

This guide will help you set up and run the React + TypeScript Starter Pack for development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js (or use yarn/pnpm)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Verify Installation

```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v8.x or higher
git --version   # Any recent version
```

## 🚀 Quick Start

### Option 1: Using npx (Recommended)

Initialize a new project instantly:

```bash
npx rsp my-app
cd my-app
npm run dev
```

### Option 2: Clone Repository

```bash
# Clone the repository
git clone https://github.com/naim0018/starter-template-react-typescript.git my-app

# Navigate to the project
cd my-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## ⚙️ Environment Configuration

### Create Environment File

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and configure your variables:
   ```bash
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api
   
   # Environment
   VITE_ENV=development
   ```

### Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes | - |
| `VITE_ENV` | Environment (development/production) | No | development |

## 🛠️ Development Workflow

### Available Scripts

```bash
# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Check TypeScript types
npm run type-check

# Format code with Prettier
npm run format

# Check if code is formatted correctly
npm run format:check
```

### Development Server

The development server includes:
- ⚡ Hot Module Replacement (HMR)
- 📦 Fast refresh for React components
- 🔍 Source maps for debugging
- 🚀 Instant feedback on code changes

### Code Quality Checks

Before committing code, run:

```bash
npm run lint        # Check for linting errors
npm run type-check  # Check for TypeScript errors
npm run format      # Format code
```

## 📁 Project Structure Overview

```
my-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── Layout/        # Layout wrappers
│   ├── store/         # Redux store & slices
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   ├── routes/        # Route configurations
│   └── main.tsx       # Application entry
├── public/            # Static assets
├── .env              # Environment variables (create from .env.example)
├── .env.example      # Environment template
├── vite.config.ts    # Vite configuration
└── package.json      # Dependencies & scripts
```

## 🎨 VS Code Setup (Recommended)

### Recommended Extensions

Install these extensions for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Real-time linting feedback

2. **Prettier** (`esbenp.prettier-vscode`)
   - Automatic code formatting

3. **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
   - Autocomplete for Tailwind classes

4. **TypeScript Import Sorter** (`mike-co.import-sorter`)
   - Organize imports automatically

5. **Error Lens** (`usernamehw.errorlens`)
   - Inline error highlighting

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 🔌 Backend API Setup

This frontend template expects a backend API. Here's how to set it up:

### API Requirements

Your backend should provide:

1. **Authentication Endpoints**:
   - `POST /auth/login` - User login
   - `POST /auth/signup` - User registration
   - `POST /user/refreshToken` - Token refresh

2. **Response Format**:
   ```json
   {
     "accessToken": "jwt-token-here",
     "refreshToken": "refresh-token-here",
     "user": {
       "id": "user-id",
       "email": "user@example.com",
       "name": "User Name"
     }
   }
   ```

### CORS Configuration

Your backend must allow requests from the frontend:

```javascript
// Express.js example
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## 🔐 Authentication Flow

The template includes:

1. **Login/Signup Pages**: Pre-built authentication UI
2. **Redux State**: User data persistence
3. **Token Management**: Automatic refresh on expiry
4. **Protected Routes**: Ready for implementation

### Implementing Protected Routes

```typescript
// In your route config
{
  path: '/dashboard',
  element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
}
```

## 🎯 Next Steps

After setup, you can:

1. **Customize the theme** in `src/index.css`
2. **Add your routes** in `src/routes/`
3. **Create pages** in `src/pages/`
4. **Define API endpoints** in `src/store/Api/`
5. **Build components** in `src/components/`

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Common Issues

**Port already in use**:
```bash
# Change port in vite.config.ts or kill the process
lsof -ti:5173 | xargs kill
```

**Module not found errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors after update**:
```bash
# Rebuild TypeScript cache
npm run type-check
```

**Environment variables not loading**:
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Variables must exist at build time

### Getting Help

- Check [Issues](https://github.com/naim0018/starter-template-react-typescript/issues)
- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Create a new issue with details

## 🚀 Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run preview
```

Build output will be in `dist/` directory.

### Deployment Options

- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop `dist/` folder
- **AWS S3**: Upload `dist/` contents
- **Docker**: Create Dockerfile for nginx

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides.

---

**Need help?** Open an issue or check the documentation!
