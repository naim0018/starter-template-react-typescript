#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, rmSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, basename } from "path";

const projectName = process.argv[2];
const isCurrentDir = !projectName || projectName === ".";

const projectPath = isCurrentDir
  ? process.cwd()
  : resolve(process.cwd(), projectName);

// Safety checks
if (!isCurrentDir && existsSync(projectPath)) {
  console.error(`Error: Folder "${projectName}" already exists.`);
  process.exit(1);
}

if (isCurrentDir && readdirSync(projectPath).length > 0) {
  console.error("Error: Current directory is not empty.");
  process.exit(1);
}

const GIT_REPO =
  "https://github.com/naim0018/starter-template-react-typescript.git";

const runCommand = (command, cwd = process.cwd()) => {
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (err) {
    console.error(`Command failed: ${command}`);
    console.error(err.message);
    process.exit(1);
  }
};

// Clone
console.log("...");
runCommand(
  isCurrentDir
    ? `git clone --quiet ${GIT_REPO} .`
    : `git clone --quiet ${GIT_REPO} ${projectName}`
);

console.log("Initializing React Starter Pack...");

// Remove git history safely
rmSync(resolve(projectPath, ".git"), { recursive: true, force: true });

// Remove bin folder (since it's not needed in the consumer's project)
rmSync(resolve(projectPath, "bin"), { recursive: true, force: true });

// Update package.json
console.log("Configuring project...");
const packageJsonPath = resolve(projectPath, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

delete packageJson.bin;
packageJson.name = projectName || basename(projectPath);
packageJson.version = "0.1.0";

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Install deps
console.log("Installing dependencies...");
runCommand("npm install", projectPath);

// Success
console.log("\nProject initialized successfully.");
console.log("\nNext steps:");
console.log("  npm run dev");
