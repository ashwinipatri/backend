const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.header("Authorization")


    if(!authHeader) return res.status(401).json({message: "Invalid authorization"})

        const token = authHeader.split(" ")[1]
        if(!token) return res.status(401).json({message: "no Token Provided"})
            try{
                const verified = jwt.verify(token,process.env.JWT_SECRET)
                req.user = verified
                next()   
            }
            catch(err){
                 res.status(401).json({message: "Token is not valid"})
            }
}


module.exports = authMiddleware;