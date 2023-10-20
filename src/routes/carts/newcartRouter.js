import { Router } from 'express'
import { createCart } from '../../controllers/carts/newcartController.js'


const router = Router()


router.post ('/carts', createCart)

export default router
