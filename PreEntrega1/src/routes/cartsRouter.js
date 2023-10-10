import { Router } from 'express'
import CartManager from '../classes/CartManager.js'


const router = Router()

const cartManager = new CartManager()


router.get ('/carts/:cid', async (req, res) => {

    const { cid } = req.params
    const product = await cartManager.getCartById (parseInt(cid))

    if (product) {
        return res.json (product)
    } else {
        
        return res.status(404).json ({ error: 'Product not found' })
    }
})

export default router
