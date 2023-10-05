import express from 'express'
import ProductManager from './ProductManager.js'

const productManager = new ProductManager()

const app = express()
const port = 8080



app.get('/', (req, res) => {

    res.send ('Hola! Usa "/products" para ver todos los productos o "/products/id" para ver un producto especifico')
})



app.get('/products', async (req, res) => {

    const { limit } = req.query
    const products = JSON.parse (await productManager.getProducts())

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit))

        return res.json (limitedProducts)
    } else {

        return res.json (products)
    }
})



app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params
    const product = await productManager.getProductById (parseInt(pid))

    if (product) {
        return res.json (product)
    } else {
        
        return res.status(404).json ({ error: 'Product not found' })
    }
})



app.listen (port, () => {

    console.log(`Servidor escuchando en http://localhost:${port}`)
})