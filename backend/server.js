import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./api/users.js";

dotenv.config();
const server = express();
const port = process.env.PORT;

server.use(cors());
server.use("/api/schoolsdb/user", userRoutes);
server.use("*", (req, res) => res.status(404).json("Bad Request"));

server.listen(port, () => console.log(`Listening on port: ${port}`));

export default server;
