import express from "express";
import cors from "cors";
import { cloneRepo } from "./services/cloneRepo.js";
import {buildTree} from "./services/buildTree.js";
import {getReadme,getPackageJson} from "./services/impFiles.js";
import {treeToString} from "./services/treeToString.js";
import {buildMetadata} from "./services/buildMetadata.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
  return res.status(400).json({
    success: false,
    message: "repoUrl is required"
  });
}

if (!repoUrl.includes("github.com")) {
  return res.status(400).json({
    success: false,
    message: "Invalid GitHub URL"
  });
}

console.log("Cloning:", repoUrl);

    const repoPath = await cloneRepo(repoUrl);

    console.log("Finished cloning");

    console.log(repoPath);

    console.log(repoUrl);

    console.log("1 cloned");

    const tree = buildTree(repoPath);

    console.log("2 tree built");

    const readme = getReadme(repoPath);

    console.log("3 readme loaded");

    const packageJson = getPackageJson(repoPath);

    console.log("4 package loaded");

        const dependencies = Object.keys(
      packageJson?.dependencies || {}
    );

    const devDependencies = Object.keys(
      packageJson?.devDependencies || {}
    );

    const treeString = treeToString(tree);

    const metadata = {
      readme,
      packageJson,
      tree
    };

    console.log("5 metadata built");

      res.json({
      success: true,

      metadata: {
        dependencies,
        devDependencies,

        readmePreview:
          readme.slice(0, 1000),

        treePreview:
          treeString.slice(0, 2000)
      }
    });
    console.log("6 response sent");

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false
    });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});