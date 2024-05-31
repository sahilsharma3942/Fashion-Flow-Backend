import Product from "../models/product.models.js";
import asyncHandler from "../utils/asyncHandler.js";


const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.status(200).json(products);
})

const getProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.productId;
    const product = await Product.findOne({
        _id:productId
    });
    if(!product){
        return res.status(400).json({
            message:"Incorrect ProductId"
        })
    }

    res.status(200).json({
        product:product
    })
})

export {getAllProducts,getProduct};
