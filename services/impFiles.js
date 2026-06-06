import fs from "fs";
import path from "path";

export function getReadme(repoPath) {
  const readmePath = path.join(
    repoPath,
    "README.md"
  );

  if (!fs.existsSync(readmePath)) {
    return "";
  }

  return fs.readFileSync(
    readmePath,
    "utf8"
  );
}

export function getPackageJson(repoPath) {
  const packagePath = path.join(
    repoPath,
    "package.json"
  );

  if (!fs.existsSync(packagePath)) {
    return null;
  }

  return JSON.parse(
    fs.readFileSync(packagePath, "utf8")
  );
}