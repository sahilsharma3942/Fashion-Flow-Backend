import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    }]
},{timestamps : true})


const Cart = new mongoose.model("Cart",cartSchema);


export default Cart;