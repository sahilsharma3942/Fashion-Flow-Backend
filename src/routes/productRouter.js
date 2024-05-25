
import { Router } from "express";

const productRouter = Router();


productRouter.get("/") //get all products
productRouter.get("/:productId") //get product by productId

export default productRouter;