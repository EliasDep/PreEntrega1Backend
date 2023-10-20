import { Router } from 'express'
import { updateProduct } from '../../controllers/products/updateproductController.js'


const router = Router()


router.put ('/products/:pid', updateProduct)

export default router
