import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import { port } from "./utils/environment.js";

const server = express();

server.use(cors());
server.use("/api/schoolsdb/user", userRoutes);
server.use("*", (req, res) => res.status(404).json("Not Found"));

server.listen(port, () => console.log(`Listening on port: ${port}`));

