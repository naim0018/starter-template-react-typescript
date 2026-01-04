# Contributing to React + TypeScript Starter Pack

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/starter-template-react-typescript.git
   cd starter-template-react-typescript
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our code standards

3. Run quality checks:
   ```bash
   npm run lint          # Check linting
   npm run type-check    # Check TypeScript types
   npm run format:check  # Check code formatting
   ```

4. Fix any issues:
   ```bash
   npm run lint:fix      # Auto-fix linting issues
   npm run format        # Auto-format code
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user authentication flow
fix: resolve navigation menu bug
docs: update installation instructions
```

## 🎨 Code Standards

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Avoid `any` type - use `unknown` if type is truly unknown
- Export types/interfaces that are used across files

### React

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Prefer named exports over default exports for utilities

### Styling

- Use Tailwind CSS utility classes
- Follow existing patterns for custom styles
- Keep responsive design in mind

### File Organization

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── Layout/         # Layout components
├── common/         # Shared utilities and components
├── hooks/          # Custom React hooks
├── store/          # Redux store, slices, and API
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── routes/         # Route configurations
```

## 🧪 Testing

When tests are added to the project:

```bash
npm test              # Run tests
npm test -- --watch   # Run tests in watch mode
```

## 📦 Pull Request Process

1. Ensure your code follows the project standards
2. Update documentation if needed
3. Add tests for new features (when testing is implemented)
4. Ensure all checks pass
5. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes

### PR Title Format

Follow the same format as commit messages:
```
feat: add user profile page
fix: correct Redux state update
```

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

## 💡 Suggesting Features

We welcome feature suggestions! Please:

- Check if the feature was already suggested
- Provide clear use case and rationale
- Consider if it fits the project scope
- Be open to discussion and alternatives

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help create a welcoming environment

## ❓ Questions

If you have questions:

- Check existing documentation
- Search closed issues
- Open a new issue with the question label

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
