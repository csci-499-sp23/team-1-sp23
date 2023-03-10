import UsersAO from "./access/users.js";
import server from "./server.js";

const usersAO = await UsersAO.init().catch((err) => console.error(err));

export { usersAO };
