import fs from "fs";
import path from "path";

export function getReadme(repoPath) {
  const files = fs.readdirSync(repoPath);

  const readmeFile = files.find(
    file => file.toLowerCase().startsWith("readme")
  );

  if (!readmeFile) {
    return "";
  }

  return fs.readFileSync(
    path.join(repoPath, readmeFile),
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