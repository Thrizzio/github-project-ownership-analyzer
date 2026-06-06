import fs from "fs";
import path from "path";

const IGNORE = [
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  "coverage",

  // new
  "test",
  "tests",
  "__tests__",

  ".github",

  ".vscode",

  "docs"
];

export function buildTree(dir) {
  const items = fs.readdirSync(dir);

  let tree = [];

  for (const item of items) {
    if (IGNORE.includes(item)) continue;

    const fullPath = path.join(dir, item);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      tree.push({
        type: "directory",
        name: item,
        children: buildTree(fullPath)
      });
    } else {
      tree.push({
        type: "file",
        name: item
      });
    }
  }

  return tree;
}