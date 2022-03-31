import express from "express";
import cors from "cors";
import secrets from "./api/secrets.route.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/secret", secrets);
//app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

export default app;
