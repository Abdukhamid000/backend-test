import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './src/routes/userRoutes.js'
import todoRoutes from './src/routes/todoRoutes.js'
import dbConnection from './src/configs/db.js';

dotenv.config()
const server = express()
const port = process.env.port || 5000

dbConnection

//middlewares
server.use(cors())
server.use(express.json())

//routes
server.use('/api/users', userRoutes)
server.use('/api/todo', todoRoutes)

server.listen(port, () => {
    console.log(`listening port ${port}`);
})