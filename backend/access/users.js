import { MongoClient } from "mongodb";
import { dbName, dbURI } from "../utils/environment.js";

export default class UsersAO {
  #dbUsers;

  constructor(db) {
    this.#dbUsers = db;
  }

  static async init() {
    const client = new MongoClient(dbURI);
    try {
      const conn = await client.connect();
      const db = conn.db(dbName).collection("users");
      return new UsersAO(db);
    } catch (err) {
      console.error(err);
    }
  }

  async getAllUsers() {
    try {
      const itr = await this.#dbUsers.find();
      return { users: await itr.toArray() };
    } catch (err) {
      console.error(err);
      return { users: [] };
    }
  }
}

const usersAo = await UsersAO.init().catch((err) => console.error(err));

export { usersAo };
