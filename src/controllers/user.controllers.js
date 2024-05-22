import zod from "zod";
import User from "../models/user.models.js";


const signupSchema = zod.object({
    username:zod.string().nonempty(),
    email:zod.string().email().nonempty(),
    password:zod.string().nonempty(),
    firstName:zod.string().nonempty(),
    lastName:zod.string().nonempty()
})

const userSignup = async (req,res)=>{
    
    const body = req.body;
    const result = signupSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            message: "Incorrect Inputs",
            errors: result.error.errors  // Detailed Zod errors
        });
    }
    
    const existingUser = User
}


export {userSignup}