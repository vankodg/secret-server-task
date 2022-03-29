import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let secrets;

export default class SecretsDAO {
  static async injectDB(conn) {
    if (secrets) {
      return;
    }
    try {
      secrets = await conn.db(process.env.ATLAS_NS).collection("secrets");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in secretsDAO: ${e}`
      );
    }
  }

  static async getSecrets() {
    let cursor;

    try {
      cursor = await secrets.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { secretsList: [] };
    }

    try {
      const secretsList = await cursor.toArray();

      return { secretsList: secretsList };
    } catch (e) {
      console.error(`Unable to convert cursor to array, ${e}`);
      return { secretsList: [] };
    }
  }

  static async getSecretByID(id) {
    try {
      return await secrets.findOne({ _id: new ObjectId(id) });
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async addSecret(secret, createdAt, expiresAt) {
    try {
      const secretDoc = {
        _id: new ObjectId(),
        secret: secret,
        createdAt: createdAt,
        expiresAt: expiresAt,
      };

      const dbResponse = await secrets.insertOne(secretDoc);
      return secretDoc;
    } catch (e) {
      console.log(`Unable to post secret: ${e}`);
      return { error: e };
    }
  }
}
