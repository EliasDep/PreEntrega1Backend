
import express from 'express'

const app = express()
const port = 8080
const ProductManager = require ('./ProductManager')


app.use (express.json())


const filePath = 'fileSystem.json'
const productManager = new ProductManager (filePath)



app.get ('/products', async (req, res) => {

    try {
        const products = await productManager.getProducts()
        const limit = parseInt (req.query.limit)

        if (!isNaN (limit) && limit > 0) {
            res.json ({ products: products.slice (0, limit)})
        } else {
            res.json ({ products })
        }
    } catch (error) {
        res.status(500).json ({ error: 'Error al obtener los productos' })
    }
})



app.get ('/products/:pid', async (req, res) => {

    const { pid } = req.params

    try {
        const product = await productManager.getProductById (parseInt(pid))

        res.json ({ product })
    } catch (error) {
        res.status(404).json ({ error: 'Producto no encontrado '})
    }
})



app.listen (port, () => {
    console.log ('Servidor Express escuchando en el puerto ${port}')
})
