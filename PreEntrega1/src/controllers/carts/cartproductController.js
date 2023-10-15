import CartManager from '../../classes/CartManager.js'

const cartManager = new CartManager()


export const addProductToCart = async (req, res) => {
    
    try {

        const { cid, pid } = req.params
        const { productId, quantity } = req.body

        const cart = await cartManager.getCartById (cid)

        if (!cart) {
            return res.status(404).json ({ error: 'Carrito no encontrado' })
        }

        const productToAdd = {
            id: productId,
            quantity: quantity
        }

        await cartManager.addCartProduct (cid, productToAdd)

        res.status(201).json ({ message: 'Producto agregado al carrito correctamente' })
    } catch (error) {

        console.error ('Error al agregar el producto al carrito:', error)
        res.status(500).json ({ error: 'Error interno del servidor' })
    }
}
