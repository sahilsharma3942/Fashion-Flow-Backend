import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    }]
},{timestamps : true
})
const Wishlist = new mongoose.model("Wishlist",wishlistSchema);

export default Wishlist;