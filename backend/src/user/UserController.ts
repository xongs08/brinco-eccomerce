import asyncHandler from "express-async-handler"
import { isAdmin } from "../middlewares/CheckIsAdmin"
import { UserModel } from "./UserSchema"

const createUser = asyncHandler(async (req, res) => {
  const { auth, nome, sobrenome, email, senha } = req.body

  isAdmin(auth).then(async authorized => {
    if (authorized) {
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
    } else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

const authorizeLogin = asyncHandler(async (req, res) => {
  const { auth, email, password } = req.body

  isAdmin(auth).then(async authorized => {
    if (authorized) UserModel.findOne({ email: email, password: password }).then(exists => {
      if (exists) {
        res.send("Authorized").status(200)
      } else {
        res.send("Info doesn't match").status(500)
      }
    }).catch(err => {
      console.log(`Error trying to authorize/login user!`)
      res.status(500).send(`Error: ${err}`)
    })
    else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

export { createUser, authorizeLogin }
