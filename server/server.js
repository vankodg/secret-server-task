import express from "express";
import cors from "cors";
import secrets from "./api/secrets.route.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/secret", secrets);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
