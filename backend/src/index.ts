import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ConnectDB } from './middlewares/ConnectDB'
import { authorizeLogin, createUser } from './user/UserController'
import { createProduct, removeProduct, updateSales, updateStock } from './product/ProductController'

ConnectDB()

const app = express()

app.use(bodyParser.json())
app.use(cors())

//USER
app.post("/api/user/create", createUser)
app.post("/api/user/login", authorizeLogin)

//PRODUCT
app.post("/api/product/create", createProduct)
app.post("/api/product/remove", removeProduct)
app.post("/api/product/update/sales", updateSales)
app.post("/api/product/update/stock", updateStock)

app.listen(3001, () => console.log("Server is now running!"))
