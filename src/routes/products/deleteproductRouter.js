import { Router } from 'express'
import { deleteProduct } from '../../controllers/products/deleteproductController.js'


const router = Router()


router.get ('/:pid', deleteProduct)

export default router
