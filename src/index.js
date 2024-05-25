//import dotenv from "dotenv";
import connectDb from "./db/index.js";
import app from "./app.js";


//temp

// dotenv.config({
//     path:"./.env"
// })


connectDb()
.then(()=>{
    
    const port = process.env.PORT || 5000;
    
    app.listen(port, () => `Server running on port ${port} 🔥`);
})
.catch((err)=>{
    console.log("MongoDB connection Failed : ",err);
})