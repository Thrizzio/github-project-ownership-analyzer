import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cloneRepo } from "./services/cloneRepo.js";
import {buildTree} from "./services/buildTree.js";
import {getReadme,getPackageJson} from "./services/impFiles.js";
import {treeToString} from "./services/treeToString.js";
import {buildMetadata} from "./services/buildMetadata.js";
import { getImportantFiles } from "./services/getImportantFiles.js";

const app = express();

dotenv.config();

console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
console.log("API KEY PREFIX:", process.env.GEMINI_API_KEY?.slice(0, 5));

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
      readme:readme.slice(0,4000),
      dependencies,
      devDependencies,
      fileTree: treeString
    };

    console.log("5 metadata built");

    console.log("Calling Gemini");

    

    //   res.json({
    //   success: true,

    //   metadata: {
    //     dependencies,
    //     devDependencies,

    //     readmePreview:
    //       readme.slice(0, 1000),

    //     treePreview:
    //       treeString.slice(0, 2000)
    //   }
    // });

  const importantFiles = await getImportantFiles(metadata);

  console.log("Gemini response received");

  console.log(importantFiles);


    res.json({
    success: true,
    importantFiles
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