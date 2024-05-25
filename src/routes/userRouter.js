import { Router } from "express";
import { userSignup , userSignin, getLoggedInUser,updateLoggedInUser , getOrders,getWishlist,addToWishList,deleteFromWishlist} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const userRouter = Router();


userRouter.post("/signup",userSignup);
userRouter.post("/signin",userSignin);

userRouter.get("/me",auth,getLoggedInUser);//get loggedin user
userRouter.put("/me",auth,updateLoggedInUser); //update profile of loggedin user
userRouter.get("/me/wishlist",auth,getWishlist); //get wishlist
userRouter.post("/me/wishlist/:productId",auth,addToWishList) //add product to wishlist
userRouter.delete("/me/wishlist/:productId",auth,deleteFromWishlist) //delete product from wishlist

//testing pending
userRouter.get("/me/orders",auth,getOrders) //getorders
export default userRouter;