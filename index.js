import express from "express";
import cors from "cors";
import { cloneRepo } from "./services/cloneRepo.js";

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

    res.json({
      success: true,
      repoPath
    });
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