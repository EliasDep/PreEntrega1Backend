import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'


const router = Router()

const productManager = new ProductManager()


router.get ('/products', async (req, res) => {

    const { limit } = req.query
    const products = JSON.parse (await productManager.getProducts())

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit))

        return res.json (limitedProducts)
    } else {

        return res.json (products)
    }
})


router.get ('/products/:pid', async (req, res) => {

    const { pid } = req.params
    const product = await productManager.getProductById (parseInt(pid))

    if (product) {
        return res.json (product)
    } else {
        
        return res.status(404).json ({ error: 'Product not found' })
    }
})

export default router
