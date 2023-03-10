import { usersAO } from "../index.js";

export default class UsersController {
  async apiGetAllUsers(req, res) {
    const allUsers = await usersAO.getAllUsers();
    return res.json(allUsers);
  }
}
