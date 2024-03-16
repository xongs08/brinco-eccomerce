import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ConnectDB } from './middlewares/ConnectDB'
import { createUser } from './user/UserController'

ConnectDB()

const app = express()

app.use(bodyParser.json())
app.use(cors())

//USER
app.post("/api/user/create", createUser)

app.listen(3000, () => console.log("Server is now running!"))
