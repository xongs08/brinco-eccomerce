import dotenv from 'dotenv'
dotenv.config()

const password = process.env.ADMIN_AUTH

fetch("http://localhost:3000/api/user/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    auth: password,
    nome: "Teste",
    sobrenome: "Da Silva Júnior",
    email: "teste@testes.com",
    senha: "test"
  })
}).then(resp => resp.text()).then(msg => {
  try {
    console.log(JSON.parse(msg))
  } catch {
    console.log(msg)
  }
})
