import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword)=>{
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(plainPassword,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("Error hashing the password : ",error);
    }
}