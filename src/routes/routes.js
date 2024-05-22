import { Router } from "express";
import cartRouter from "./cartRouter.js";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/user",userRouter);
router.use("/products",productRouter);
router.use("/cart",cartRouter);
router.use("/order",orderRouter);

export default router;