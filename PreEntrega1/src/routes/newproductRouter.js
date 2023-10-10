import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'


const router = Router()

const productManager = new ProductManager


router.post ('/', async (req, res) => {

    const { title, description, code, price, stock, category } = req.body
    const status = true
  
    if (!title || !description || !code || !price || !stock || !category) {

      return res.status(400).json ({ error: 'Todos los campos son obligatorios.' })
    }
  
    const newProduct = {
      title,
      description,
      code,
      price: parseFloat(price), 
      status,
      stock: parseInt(stock),
      category,
    }
  
    try {
      
      await productManager.addProduct (newProduct)

      res.json ({ success: 'Producto agregado con éxito.' })
    } catch (err) {

      console.error ('Error al agregar el producto:', err.message)

      return res.status(500).json ({ error: 'Error interno del servidor.' })
    }
})

export default router
