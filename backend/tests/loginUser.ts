import dotenv from 'dotenv'
dotenv.config()

const password = process.env.ADMIN_AUTH

fetch("http://localhost:3001/api/user/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    auth: password,
    email: "teste@testes.com",
    senha: "test"
  })
}).then(resp => resp.text()).then(msg => console.log(msg))
