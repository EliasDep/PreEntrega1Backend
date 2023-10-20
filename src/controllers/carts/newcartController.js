import CartManager from '../../classes/CartManager.js'

const cartManager = new CartManager


export const createCart = async (req, res) => {
    
    const { products } = req.body
  
    if (!products) {

      return res.status(400).json ({ error: 'Todos los campos son obligatorios.' })
    }
  
    const newCart = {
      products
    }
  
    try {
      
      await cartManager.addCart (newCart)

      res.json ({ success: 'Producto agregado con éxito.' })
    } catch (err) {

      console.error ('Error al agregar el producto:', err.message)

      return res.status(500).json ({ error: 'Error interno del servidor.' })
    }
}
