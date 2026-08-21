const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    try{
    const authheader=req.headers.authorization
    if(!authheader){
        return res.status(400).json({
            message:"Authorization token required"
        })
    }
    const token=authheader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message:"invalid token"
        })
    }
    const decoded=jwt.verify(
        token,process.env.JWT_SECRET
    )
    req.userId=decoded.userId
    next()
}catch(err){
    res.status(401).json({
        message:"invalid or expired token"
    })
}
}
module.exports=auth