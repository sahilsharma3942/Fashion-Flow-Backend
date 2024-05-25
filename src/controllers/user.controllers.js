import zod from "zod";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import jwt from "jsonwebtoken";
import Order from "../models/order.models.js";
import Wishlist from "../models/wishlist.models.js";
import Product from "../models/product.models.js";

//create zod schema
const signupSchema = zod.object({
    username:zod.string().nonempty(),
    email:zod.string().email().nonempty(),
    password:zod.string().nonempty(),
    firstName:zod.string().nonempty(),
    lastName:zod.string().nonempty()
})

const userSignup = asyncHandler(async (req,res)=>{
    
    const body = req.body;

    //Input validation using zod schemas
    const result = signupSchema.safeParse(body);
    //if validation fails return error
    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Input",
            errors: result.error.errors  // Detailed Zod errors
        });
    }
    //check if user already exists
    const existingUser = await User.findOne({
        $or:[{username:body.username},{email:body.email}]
    })
    if(existingUser){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    //hash the password before storing in Database
    const hashedPassword = await hashPassword(body.password);
    
    const user = await User.create({
        username:body.username,
        email:body.email,
        password:hashedPassword,
        firstName:body.firstName,
        lastName:body.lastName
    })

    const userId = user._id;
    const token = jwt.sign({
        userId:userId
    },process.env.JWT_SECRET);

    res.status(200).json({
        message:"User created successfully",
        token:token
    })

})




const signinSchema = zod.object({
    username:zod.string().nonempty(),
    password:zod.string().nonempty()
})

const userSignin = asyncHandler(async (req,res)=>{
    const body = req.body;
    const result = signinSchema.safeParse(body);

    if(!result.success){
        res.status(400).json({
            message:"Invalid input",
            error:error.erros
        })
    }
    const user = await User.findOne({
        username:body.username
    })
    
    if(!user){
        return res.status(400).json({
            message:"User doesn't exist"
        })
    }
    //if user exists compare passwords
    const match = await comparePassword(body.password,user.password);
    
    if(!match){
        return res.status(400).json({
            message:"Incorrect password"
        })
    }

    const userId = user._id;
    const token = jwt.sign({
        userId:userId
    },process.env.JWT_SECRET);

    res.status(200).json({
        message:"Login Successfull",
        token:token
    });



})



const getLoggedInUser = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    console.log(userId);

    const user = await User.findOne({
        _id:userId
    })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    res.json({
        user:user
    })
})



const updateSchema = zod.object({
    username:zod.string().optional(),
    email:zod.string().email().optional(),
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
const updateLoggedInUser = asyncHandler(async(req,res,next)=>{
    const userId = req.userId;
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Incorrect inputs"
        })
    }

    const updatedUser = await User.findOneAndUpdate({
        _id:userId
    },{
        $set: req.body
    },{
        new:true
    })


    if(!updatedUser){
        return res.status(404).json({message:"User not found"})
    }

    res.json({
        message:"User profile updated successfully",
        user:updatedUser
    });

})


const getOrders = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const orders = await Order.find({userId:userId}).populate('products.product');
    if(orders.length==0){
        return res.json({
            message:"No orders"
        })
    }

    res.json({
        orders:orders
    });
})


const getWishlist = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const wishlist = await Wishlist.findOne({user:userId}).populate('products.product');
    
    if(!wishlist){
        return res.json({
            message:"empty wishlist"
        })
    }

    res.json({wishlist:wishlist});
})


const addToWishList = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const productId = req.params.productId;
    //console.log(productId)

    //check if product exists
    const product = await Product.findOne({
        _id:productId});
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    //check if wishlist exixts
    const wishlist = await Wishlist.findOne({user:userId});
    //if doesnot exist then create new
    if(!wishlist){
        wishlist = await Wishlist.create({
            user:userId,
            products:[]
        })
    }

    //if wishlist is created then check if product already exists in wishlist
    const productExists = wishlist.products.some((p)=>{return p.product.toString()==productId})
    if(productExists){
        return res.status(400).json({message:"Product already exists in the wishlist"})
    }

    wishlist.products.push({product:productId});
    await wishlist.save();

    res.status(200).json(wishlist);
})



const deleteFromWishlist = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const productId = req.params.productId;
    //console.log(productId)

    //check if product exists
    const product = await Product.findOne({
        _id:productId});
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
    }

    //find the associated wishlist
    const wishlist = await Wishlist.findOne({user:userId});
    
    if(!wishlist){
        return res.status(400).json({
            message:"Wislist not found"
        })
    }
    //remove the given product 
    wishlist.products = wishlist.products.filter((p)=>p.product.toString()!==productId);
    await wishlist.save()

    res.status(200).json(wishlist);
})


export {userSignup, userSignin, getLoggedInUser,updateLoggedInUser, getOrders, getWishlist,addToWishList, deleteFromWishlist}