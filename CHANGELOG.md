# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `.env.example` file with documented environment variables
- Prettier configuration for consistent code formatting
- `format` and `format:check` npm scripts
- `lint:fix` npm script for auto-fixing linting issues
- `type-check` npm script for TypeScript validation
- ErrorBoundary component for graceful error handling
- Comprehensive CONTRIBUTING.md guide
- Detailed ARCHITECTURE.md documentation
- SECURITY.md with security policy and best practices
- SETUP.md with detailed setup instructions
- CHANGELOG.md for tracking project changes
- CI/CD workflow for automated quality checks
- GitHub Actions workflow for linting, type-checking, and building

### Changed
- Enhanced ESLint configuration with stricter rules
  - Added `no-console` warning (allows console.warn and console.error)
  - Changed `@typescript-eslint/no-explicit-any` from off to warn
  - Added `@typescript-eslint/no-unused-vars` with ignore patterns
- Fixed authentication error handling in BaseApi (changed from 400 to 401 status)
- Removed console.log statements from production code
  - Removed from Login.tsx
  - Removed from Signup.tsx
  - Removed from Header.tsx
  - Removed from BaseApi.ts
- Updated README.md with links to new documentation
- Improved error handling throughout the codebase

### Fixed
- BaseApi now correctly handles 401 Unauthorized errors instead of 400
- Removed debug console.log from token refresh logic

## [0.0.1] - Initial Release

### Added
- React 19 with TypeScript support
- Vite 6 for fast development and optimized builds
- Tailwind CSS v4 for styling
- Redux Toolkit for state management
- React Router 7 for navigation
- RTK Query for data fetching
- React Hook Form + Zod for form handling
- Dynamic Form system with automatic validation
- Dynamic Table component with sorting, filtering, and pagination
- Authentication flow with token management
- Dashboard and public layouts
- Radix UI components integration
- Framer Motion for animations
- CLI tool for project initialization
- Basic ESLint configuration
- TypeScript configuration
- Git ignore file

[Unreleased]: https://github.com/naim0018/starter-template-react-typescript/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/naim0018/starter-template-react-typescript/releases/tag/v0.0.1
