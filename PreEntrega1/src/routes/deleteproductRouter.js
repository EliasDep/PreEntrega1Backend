import { Router } from 'express'
import ProductManager from '../classes/ProductManager.js'


const router = Router()

const productManager = new ProductManager()


router.get ('/:pid', async (req, res) => {

    const { pid } = req.params

    try {

        const productToDelete = await productManager.getProductById (parseInt(pid))

        if (!productToDelete) {
            return res.status(404).json ({ error: 'Product not found' })
        }

        await productManager.deleteProduct (parseInt(pid))

        res.json ({ message: 'Producto eliminado correctamente', deletedProduct: productToDelete})
    } catch (error) {

        console.error ('Error al eliminar el producto:', error)
        res.status(500).json ({ message: 'Error interno del servidor'})
    }
})

export default router
