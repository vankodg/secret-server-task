import SecretsDAO from "../dao/secretsDAO.js";

export default class SecretsController {
  static async apiGetSecrets(req, res, next) {
    const { secretsList } = await SecretsDAO.getSecrets();

    let response = {
      secrets: secretsList,
    };
    res.json(response);
  }
  static async apiGetSecretById(req, res, next) {
    try {
      let id = req.params.id || {};
      console.log(id);
      let secret = await SecretsDAO.getSecretByID(id);
      if (!secret) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(secret);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostSecret(req, res, next) {
    try {
      const secret = req.body.secret;
      if (!secret) {
        res.status(405).json({ error: "secret not found" });
        return;
      }

      const expireAfter = req.body.expireAfter
        ? parseInt(req.body.expireAfter, 10)
        : -1;
      if (expireAfter < 0) {
        res.status(405).json({ error: "expireAfter not found or invalid" });
        return;
      }

      const createdAt = new Date();
      let expiresAt = new Date(createdAt);
      expiresAt.setSeconds(expiresAt.getSeconds() + expireAfter);

      const secretResponse = await SecretsDAO.addSecret(
        secret,
        createdAt,
        expiresAt
      );
      res.json(secretResponse);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
