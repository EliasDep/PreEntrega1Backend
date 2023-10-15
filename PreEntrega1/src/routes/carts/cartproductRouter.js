import { Router } from 'express'
import { addProductToCart } from '../../controllers/carts/cartproductController.js'


const router = Router()


router.post ('/cart/:cid/product', addProductToCart)

export default router
