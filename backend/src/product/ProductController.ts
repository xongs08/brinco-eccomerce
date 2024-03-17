import { ProductModel } from "./ProductSchema"
import asyncHandler from 'express-async-handler'
import { isAdmin } from "../middlewares/CheckIsAdmin"

const createProduct = asyncHandler(async (req, res) => {
  const { auth, name, codigo, price, imgSrc, estoque, tags } = req.body

  isAdmin(auth).then(async authorized => {
    if (authorized) {
      const prodAlrExists = await ProductModel.findOne({ codigo: codigo })
      if (prodAlrExists) {
          ProductModel.create({
            name: name,
            codigo: codigo,
            price: price,
            imgSrc: imgSrc,
            estoque: estoque,
            tags: tags
          }).then(doc => res.json(doc).status(200)).catch(err => res.status(500).send(`Erro: ${err}`))
      } else res.send("Product already exists.").status(500)
    } else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

const removeProduct = asyncHandler(async (req, res) => {
  const { auth, code } = req.body

  isAdmin(auth).then(authorized => {
    if (authorized) ProductModel.findOneAndDelete({ codigo: code }).then(doc => res.json(doc).status(200)).catch(err => res.status(500).send(`Erro: ${err}`))
    else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

const updateSales = asyncHandler(async (req, res) => {
  const { auth, code, newSales } = req.body

  isAdmin(auth).then(authorized => {
    if (authorized) ProductModel.findOneAndUpdate({ codigo: code }, { vendas: newSales }).then(doc => res.json(doc).status(200)).catch(err => res.status(500).send(`Erro: ${err}`))
    else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

const updateStock = asyncHandler(async (req, res) => {
  const { auth, code, newStock } = req.body

  isAdmin(auth).then(authorized => {
    if (authorized) ProductModel.findOneAndUpdate({ codigo: code }, { estoque: newStock }).then(doc => res.json(doc).status(200)).catch(err => res.status(500).send(`Erro: ${err}`))
    else res.send("Você não tem permissão para fazer isso!").status(500)
  })
})

export { createProduct, removeProduct, updateSales, updateStock }
