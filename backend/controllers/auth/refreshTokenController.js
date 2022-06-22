const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const handleRefreshToken =async (req,res)=>{
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    const foundUser =await User.findOne({refreshToken}).exec()
    if(!foundUser) return res.status(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403)
            
            const accessToken =  jwt.sign(
                {"userInfo":{
                    userId:foundUser._id,
                    user:foundUser.first_name + ' ' + foundUser.last_name,
                    email:foundUser.email,
                   
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"10h"}
            )
            res.status(200).json({accessToken})
        }
    )

}
module.exports = {handleRefreshToken}