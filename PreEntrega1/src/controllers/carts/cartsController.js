import CartManager from '../../classes/CartManager.js'

const cartManager = new CartManager()


export const getCart = async (req, res) => {
    
    const { cid } = req.params
    const product = await cartManager.getCartById (cid)

    if (product) {
        return res.json (product)
    } else {
        
        return res.status(404).json ({ error: 'Product not found' })
    }
}
