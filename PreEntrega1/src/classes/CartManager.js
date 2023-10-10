import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath  } from 'url'

const __filename = fileURLToPath (import.meta.url)
const __dirname = path.dirname (__filename)


export default class CartManager {

    constructor() {
        this.path = path.join(__dirname, "../data/cart.json")
    }



    async getCart() {

        try {
            const archivo = await fs.readFile (this.path, "utf-8")

            return archivo
        } catch (error) {
            console.error ('Error', error.message)
        }
    }



    async addCart (addProduct) {
        
        if (!addProduct) {

          console.log ("Error")
        } else {

            const archivo = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse (archivo)
            const product = products.find (prod => prod.code === addProduct.code)

            if (product) {

                return console.log ("Codigo ya existente")
            } else {

                addProduct.id = products.length + 1
                addProduct.items = []
                products.push (addProduct)

                await fs.writeFile (this.path, JSON.stringify(products, null, 2), "utf-8")

                console.log ("Producto agregado correctamente")
            }
        }
    }



    async getCartById (id) {
        
        if (id) { 

            const archivo = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse (archivo)
            const product = products.find (prod => prod.id === id)

            return product ? product : ""
        } else {
            console.log ("Error, se requiere ID")
        }
    }
}