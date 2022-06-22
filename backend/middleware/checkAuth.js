const jwt = require('jsonwebtoken')

const checkAuth=async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader) return res.status(401).json({"error":"Please login to fulfull this request"})
    // console.log(authHeader);
     const token =  authHeader.split(' ')[1]
     jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err){
                return res.sendStatus(403)
            }else{
                next()
            }
            
           
        }
    )
}catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {checkAuth}