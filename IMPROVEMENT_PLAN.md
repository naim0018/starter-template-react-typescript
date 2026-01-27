# Improvement Plan for create-rst

## 1. Architecture: Separate CLI and Template
**Current State:** The repository serves as both the CLI tool and the template itself. Dependencies for the template (React, etc.) are installed when the user explicitly installs the CLI tool, which is inefficient.

**Recommendation:**
- Create a clear separation.
  - **Option A (Monorepo):** Use a monorepo with `packages/cli` and `packages/template`.
  - **Option B (Fetch Remote):** Keep this repo as the template. Create a separate, lightweight repo for the CLI that uses `degit` to fetch this repo.

## 2. Dependency Management: Switch to `degit`
**Current State:** The CLI requires the user to have `git` installed and downloads the full git history.

**Recommendation:**
- Replace `git clone` with [degit](https://github.com/Rich-Harris/degit) (or `tiged`).
- **Benefit:** Faster downloads, no git history to remove, and works without `git` installed on the user's machine.

## 3. User Experience: Interactive Prompts
**Current State:** The CLI relies on command-line arguments.

**Recommendation:**
- Use [prompts](https://www.npmjs.com/package/prompts) or [inquirer](https://www.npmjs.com/package/inquirer) to verify the project name if not provided.
- Allow users to choose options (if you plan to add variants, e.g., "Add Redux?", "Add Eslint?").

## 4. Visual Feedback: Enhanced Logging
**Current State:** Basic `console.log`.

**Recommendation:**
- Use [chalk](https://www.npmjs.com/package/chalk) or [picocolors](https://www.npmjs.com/package/picocolors) to add colors (green for success, red for errors).
- Add a spinner (e.g., [ora](https://www.npmjs.com/package/ora)) during the install process to show activity.

## 5. Security & Robustness
**Current State:** Fixed basic command injection.

**Recommendation:**
- Add stronger validation for the project name (e.g., validate against npm naming rules using [validate-npm-package-name](https://www.npmjs.com/package/validate-npm-package-name)).
- Ensure the destination directory is empty (already implemented, but can be improved with a prompt to overwrite).

## 6. CI/CD Pipeline
**Recommendation:**
- Add a GitHub Action to automatically run internal tests/checks on Pull Requests.
- Add a release workflow that publishes the package to npm when a new Release is created on GitHub.

## 7. Dependency Cleanup
**Current State:** `tailwindcss` is in `dependencies`.

**Recommendation:**
- Move build-time tools like `tailwindcss` to `devDependencies` to keep the production dependency list minimal, adhering to best practices.

## 8. Post-Install Instructions
**Recommendation:**
- Detect the user's package manager (npm, yarn, pnpm, bun) and show the correct commands in the "Next steps" output.
