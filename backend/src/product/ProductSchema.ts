import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  codigo: { type: String, required: true },
  price: { type: Number, required: true },
  imgSrc: { type: String, required: true },
  vendas: { type: Number, default: 0 },
  estoque: { type: Number, required: true },
  tags: [{ type: String, required: true }]
})

export const ProductModel = mongoose.model("product", productSchema)
