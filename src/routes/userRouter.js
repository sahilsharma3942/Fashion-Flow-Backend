import { Router } from "express";
import { userSignup } from "../controllers/user.controllers.js";


const userRouter = Router();


userRouter.route("/signup").post(userSignup);

export default userRouter;