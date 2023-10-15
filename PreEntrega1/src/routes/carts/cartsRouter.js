import { Router } from 'express'
import { getCart } from '../../controllers/carts/cartsController.js'


const router = Router()


router.get ('/carts/:cid', getCart)

export default router
