import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async()=>{
    try {
 
        await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB HOST`);
        
    } catch (error) {
        console.log("MONGODB Connection Failed : ",error);
        process.exit(1);
    }
}

export default connectDb;