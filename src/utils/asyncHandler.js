const asyncHandler = (fn) => {
    return async(req,res,next)=>{
        try {
            await fn(req,res,next);
        } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
            throw error;
        }
    }
}

export default asyncHandler;