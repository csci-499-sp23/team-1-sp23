import { usersAo } from "../access/users.js"

export default class UsersController {
  async apiGetAllUsers(req, res) {
    const allUsers = await usersAo.getAllUsers();
    return res.json(allUsers);
  }
}
