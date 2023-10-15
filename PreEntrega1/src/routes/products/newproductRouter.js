import { Router } from 'express'
import { createProduct } from '../../controllers/products/newproductController.js'


const router = Router()


router.post ('/products', createProduct)

export default router
