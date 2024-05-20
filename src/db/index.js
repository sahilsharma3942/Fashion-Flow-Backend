import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async()=>{
    try {
 
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Connection Failed : ",error);
        process.exit(1);
    }
}

export default connectDb;