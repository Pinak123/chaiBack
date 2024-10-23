import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const UserRouter = Router();

UserRouter.route('/register').post(registerUser);

export default UserRouter;
