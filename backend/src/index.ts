import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ConnectDB } from './middlewares/ConnectDB'
import { authorizeLogin, createUser } from './user/UserController'

ConnectDB()

const app = express()

app.use(bodyParser.json())
app.use(cors())

//USER
app.post("/api/user/create", createUser)
app.post("/api/user/login", authorizeLogin)

//PRODUCT

app.listen(3001, () => console.log("Server is now running!"))
