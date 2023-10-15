import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { fileURLToPath  } from 'url'

import productsRouter from './routes/products/productsRouter.js'
import newproductRouter from './routes/products/newproductRouter.js'
import updateproductsRouter from './routes/products/updateproductRouter.js'
import deleteproductRouter from './routes/products/deleteproductRouter.js'
import cartsRouter from './routes/carts/cartsRouter.js'
import newcartRouter from './routes/carts/newcartRouter.js'
import cartproductRouter from './routes/carts/cartproductRouter.js'

const app = express()

const __filename = fileURLToPath (import.meta.url)
const __dirname = path.dirname (__filename)

app.use (express.json ())
app.use (express.urlencoded ({ extended: true }))
app.use (bodyParser.urlencoded({ extended: true }))
app.use (express.static (path.join (__dirname, '../public')))

app.use ('/', deleteproductRouter)
app.use ('/api', productsRouter, updateproductsRouter, newcartRouter, cartsRouter, cartproductRouter, newproductRouter)


app.use ((error, req, res, next) => {

    const message = `Ah ocurrido un error desconocido: ${error.message}`

    console.log (message)
    res.status(500).json ({ status: 'error', message})
})

export default app
