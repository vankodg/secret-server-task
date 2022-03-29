import express from "express";
import SecretsCtrl from "./secrets.controller.js";

const router = express.Router();

router
  .route("/")
  .get(SecretsCtrl.apiGetSecrets)
  .post(SecretsCtrl.apiPostSecret);

router.route("/:id").get(SecretsCtrl.apiGetSecretById);

export default router;
