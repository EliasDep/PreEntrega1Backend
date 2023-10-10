import { Router } from 'express'
import CartManager from '../classes/CartManager.js'


const router = Router()

const cartManager = new CartManager


router.post ('/carts', async (req, res) => {

    const { items, code } = req.body
  
    if (!items || !code) {

      return res.status(400).json ({ error: 'Todos los campos son obligatorios.' })
    }
  
    const newCart = {
      items,
      code
    }
  
    try {
      
      await cartManager.addCart (newCart)

      res.json ({ success: 'Producto agregado con éxito.' })
    } catch (err) {

      console.error ('Error al agregar el producto:', err.message)

      return res.status(500).json ({ error: 'Error interno del servidor.' })
    }
})

export default router
