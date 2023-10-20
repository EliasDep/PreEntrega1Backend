import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath  } from 'url'
import { v4 as uuidv4 } from 'uuid'

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
        
            addProduct.id = uuidv4()
            products.push (addProduct)

            await fs.writeFile (this.path, JSON.stringify(products, null, 2), "utf-8")

            console.log ("Producto agregado correctamente")    
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



    async addCartProduct (cid, productToAdd) {

        const cartById = await this.getCartById (cid)
        
        if(!cartById) {

            console.log('Carrito ID no encontrado')
            return
        }


        const productById = await this.getProductById (productToAdd)

        if (!productById) {

            console.log ('Producto ID no encontrado')
            return
        }


        const cartsAll = await this.getCart()
        const cartFilter = cartsAll.filter ((cart) => cart.id != cid)

        if (cartById.products.some (prod => prod.id === productToAdd)) {

            const productInCart = cartById.products.find ((prod) => prod.id === productToAdd)

            productInCart.quantity += 1
            console.log (productInCart.quantity)

            const cartsConcat = [cartById, ...cartFilter]

            await this.addCart (cartsConcat)
            
            console.log ('Item Agregado al carrito +1')
            return       
        }
        

        const cartsConcat = [{id:cid, products:[{id: productById.id , quantity:1}]} ,...cartFilter]

        await this.addCart (cartsConcat)
        
        console.log ('Item Agregado al carrito')
        return 
    }



    async getProductById (productId) {

        const cartData = await this.getCart()
    
        try {

            const cart = JSON.parse (cartData)
    
            for (const cartItem of cart) {

                for (const product of cartItem.products) {

                    if (product.id === productId) {
                        return product
                    }
                }
            }
    
            return null
        } catch (error) {

            console.error ('Error al buscar el producto en el carrito', error)
            return null
        }
    }
}