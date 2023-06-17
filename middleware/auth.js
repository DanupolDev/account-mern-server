import jwt from 'jsonwebtoken'
import ENV from '../config.js'

export default async function Auth(req,res,next){
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1]

        // retrive the user details of the logged in user
        const decordedToken = await jwt.verify(token, ENV.JWT_SECRET)

        req.user = decordedToken
        next()

    } catch (error) {
        res.status(401).send({error:"Authentication Failed!"})
    }
}

export function localVariables(req,res,next){
    req.app.locals = {
        OTP:null,
        resetSession:false
    }
    next()
}