import asyncHandler from "../utils/asyncHandler.js";
import Cart from "../models/cart.models.js";
import Product from "../models/product.models.js";

const getcart = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const cart = await Cart.findOne({
        user:userId
    }).populate("products.product");

    if(!cart){
        return res.json({
            message:"Empty Cart"
        })
    }

    res.json({
        cart:cart
    })
})



const addToCart = asyncHandler(async(req,res)=>{
    //check if pproduct exists
    const productId = req.params.productId;
    const userId = req.userId;
    //console.log(productId);
    const product = await Product.findOne({
        _id:productId
    })
    //console.log(product);
    if(!product){
        return res.status(404).json({
            message:"product not found"
        })
    }

    //check if cart exists
    let cart = await Cart.findOne({
        user:userId
    })
    
    if(cart){
        const productIndex = cart.products.findIndex((p)=>p.product.toString()===productId)
        if(productIndex !== -1){
            cart.products[productIndex].quantity += 1;
        }else{
            cart.products.push({product:productId,quantity:1});
        }
    }else{
        cart = await Cart.create({
            user:userId,
            products:[{product:productId,quantity:1}]
        })
    }
   
    await cart.save()
    res.status(200).json({
        cart:cart
    })
})

const updateCart = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    if(!quantity || quantity<1){
        return res.status(400).json({
            message:"Invalid quantity"
        })
    }


    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Check if the cart exists for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const cartProduct = cart.products.find(p => p.product.toString() === productId);
    if (!cartProduct) {
        return res.status(404).json({ message: "Product not in cart" });
    }

    // Update the quantity
    cartProduct.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json(cart);
})


const removeFromCart = asyncHandler(async(req,res)=>{
    const userId = req.userId;
    const productId = req.params.productId;
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Check if the cart exists for the user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
})

export {getcart,addToCart,updateCart,removeFromCart};