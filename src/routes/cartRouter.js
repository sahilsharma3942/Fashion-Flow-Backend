import { Router } from "express";
import { addToCart, getcart, removeFromCart, updateCart } from "../controllers/cart.controller.js";
import auth from "../middlewares/auth.middleware.js";

const cartRouter = Router();


cartRouter.get("/",auth,getcart); //get users cart
cartRouter.post("/add/:productId",auth,addToCart);  //add to cart
cartRouter.put("/update/:productId",auth,updateCart); //update item quanitty in cart
cartRouter.delete("/remove/:productId",auth,removeFromCart) //remove from cart

export default cartRouter;