import asyncHandler from "express-async-handler"
import { isAdmin } from "../middlewares/CheckIsAdmin"
import { UserModel } from "./UserSchema"

const createUser = asyncHandler(async (req, res) => {
  const { auth, nome, sobrenome, email, senha } = req.body

  isAdmin(auth).then(async authorized => {
    switch(authorized) {
      case true:
        const userAlreadyExists = await UserModel.findOne({ email: email })
        if (userAlreadyExists) {
          res.send("Email already exists").status(500)
        } else {
          UserModel.create({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha
          }).then(user => {
            res.status(200).json(user)
          }).catch(err => {
            res.status(500).send(`Erro: ${err}`)
          })
        }
        break
      
      case false:
        res.send("Você não tem permissão para fazer isso!").status(500)
        break

      default:
        break
    }
  })
})

const authorizeLogin = asyncHandler(async (req, res) => {
  const { auth, email, password } = req.body

  isAdmin(auth).then(async authorized => {
    switch (authorized) {
      case true:
        const userExists = await UserModel.findOne({ email: email, senha: password })
        if (userExists) {
          res.send("Authorized").status(200)
        } else {
          res.send("Info doesn't match").status(500)
        }
        break

      case false:
        res.send("Você não tem permissão para fazer isso!").status(500)
        break

      default:
        break
    }
  })
})

export { createUser, authorizeLogin }
