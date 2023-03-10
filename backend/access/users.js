import { MongoClient } from "mongodb";

export default class UsersAO {
  #dbUsers;

  constructor(db) {
    this.#dbUsers = db;
  }

  static async init() {
    const client = new MongoClient(process.env.DB_URI);

    try {
      const conn = await client.connect();
      const db = conn.db(process.env.DB_NAME).collection("users");
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
