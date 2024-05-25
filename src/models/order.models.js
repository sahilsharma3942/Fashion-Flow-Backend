import mongoose from "mongoose";

const orederSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:{
        type:[{
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true,
                min:0
            }
        }]
    },
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    totalAmount:{
        type:Number,
        required:true,
        min:0
    }
},{timestamps : true})

const Order = new mongoose.model("Order",orederSchema);
export default Order;