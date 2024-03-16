import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true }
})

export const UserModel = mongoose.model("user", userSchema)
