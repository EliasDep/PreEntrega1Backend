import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils.js'

const router = Router()


router.get ('/realtimeproducts', (req, res) => { 

    const products = JSON.parse (fs.readFileSync (path.join (__dirname, './data/products.json'))) 

    res.render ('realTimeProducts', { products })
})

export default router
