import express from "express";
import UsersController from "../controllers/users.js";

const router = express.Router();

const usrCtrl = new UsersController();

router.route("/").get(usrCtrl.apiGetAllUsers);

export default router;
