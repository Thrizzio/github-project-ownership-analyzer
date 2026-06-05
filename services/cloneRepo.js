import simpleGit from "simple-git";
import path from "path";

const git = simpleGit();

export async function cloneRepo(repoUrl) {
  const repoName = Date.now().toString();

  const repoPath = path.join(
    process.cwd(),
    "repos",
    repoName
  );

  await git.clone(repoUrl, repoPath);

  return repoPath;
}