import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath  } from 'url'

const __filename = fileURLToPath (import.meta.url)
const __dirname = path.dirname (__filename)


export default class ProductManager {

    constructor() {
        this.path = path.join(__dirname, "../data/products.json")
    }



    async getProducts() {

        try {
            const archivo = await fs.readFile (this.path, "utf-8")

            return archivo
        } catch (error) {
            console.error ('Error', error.message)
        }
    }



    async addProduct (addProduct) {
        
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
                products.push (addProduct)

                await fs.writeFile (this.path, JSON.stringify(products, null, 2), "utf-8")

                console.log ("Producto agregado correctamente")
            }
        }
    }



    async getProductById (id) {
        
        if (id) { 

            const archivo = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse (archivo)
            const product = products.find (prod => prod.id === id)

            return product ? product : ""
        } else {
            console.log ("Error, se requiere ID")
        }
    }



    async deleteProduct (id) {

        if (id) {

            const archivo = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse (archivo)
            const index = products.findIndex ((product) => product.id === id)

            if (index !== -1) {

                products.splice(index, 1)

                await fs.writeFile (this.path, JSON.stringify (products, null, 2), "utf-8")

                console.log ("Producto borrado con el ID:", id)
            } else {

                console.log ("ID no encontrado o invalido:",id)
            }
        } else {
            console.log ("Error, se requiere el ID")
        }
    }


    
    async updateProduct (id, updates) {

        if (!id || !updates) {

            console.log ("Error")
        } else {

            const archivo = await fs.readFile (this.path, "utf-8")
            const products = JSON.parse (archivo)
            const product = products.find (prod => prod.id === id)

            if (product) {

                const productsUpdated = products.map ((ele) => {

                    if (ele.id==id) {

                        updates.id = id
                        return updates
                    } else {
                        return ele
                    }
                })

                await fs.writeFile (this.path, JSON.stringify (productsUpdated, null, 2), "utf-8")

            } else {
                console.log("ID no found:",id)
            }
        }
    }
}