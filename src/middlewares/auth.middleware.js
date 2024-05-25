import jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(403).json({
            message:"SignIn to continue"
        })
    }

    try{
        const decoded =  jwt.verify(authHeader,process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(e){
        return res.status(403).json({message:"Invalid token"})
    }
}


export default auth;