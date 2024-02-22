import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function authenticateToken(req, res, next) {

 const token = req.header('Authorization')?.split(' ')[1]
 console.log(req.header('Authorization'))
 if(!token) {
    return res.status(401).json({error: 'Unauthorized'})
 }
 
 jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if(err) {
        return res.status(403).json({error: 'Invalid token'})
    }

    req.user = user
    next()
 })
  
}