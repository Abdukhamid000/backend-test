import {} from './userController.js'
import {validationResult} from 'express-validator'
import {registerUser} from '../models/userModal.js'


async function register(req, res) {
  const errors = validationResult(req)
 

  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  
  const {username} = req.body

 const result = await registerUser(username)

 res.status(200).json({result})

}

export {
    register
}