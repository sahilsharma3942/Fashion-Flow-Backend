import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product.controllers.js";

const productRouter = Router();


productRouter.get("/",getAllProducts) //get all products
productRouter.get("/:productId",getProduct) //get product by productId

export default productRouter;