
const fs = require ('fs').promises


class ProductManager {

    constructor (filePath) {
        this.products = []
        this.productIdCounter = 1
        this.path = filePath
    }

    async createFile () {
        
        try {
            await fs.access (this.path)
        } catch (error) {
            await fs.writeFile (this.path, '[]')
        }
    }

    async addProduct (title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            throw new Error ('Todos los campos son obligatorios')
        }

        if (this.products.some ((product) => product.code === code)) {
            throw new Error ('Ya existe un producto con el mismo codigo')
        }

        const product = {
            id: this.productIdCounter ++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push (product)

        await this.saveProductToFile()
        return product
    }

    async saveProductToFile () {

        try {
            await fs.writeFile (this.path, JSON.stringify (this.products, null, 2))
        } catch (error) {
            throw new Error ('Error al guardar los productos en el archivo')
        }
    }

    async getProductById (id) {

        try {

            const products = await this.getProducts()
            const product = this.products.find ((product) => product.id === id)

            if (!product) {
                throw new Error ('Producto no encontrado')
            }

            return product

        } catch (error) {
            throw new Error ('Error al buscar el producto por ID')
        }
    }

    async getProducts () {
        
        try {
            const fileContent = await fs.readFile (this.path, 'utf-8')
            this.products = JSON.parse (fileContent)

            return this.products

        } catch (error) {
            throw new Error ('Error al leer los productos desde el archivo')
        }
    }

    async updateProduct (id, fieldToUpdate, updatedValue) {

        try {
            
            const products = await this.getProducts()
            const product = products.find ((product) => product.id === id)
            
            if (!product) {
                throw new Error ('Producto no encontrado')
            }    
            
            product[fieldToUpdate] = updatedValue

            await this.saveProductToFile()
            return product

        } catch (error) {
            throw new Error ('Error al actualizar el producto')
        }
    }

    async deleteProduct (id) {

        try {

            const products = await this.getProducts()
            const index = products.findIndex ((product) => product.id === id)

            if (index === -1) {
                throw new Error ('Producto no encontrado')
            }

            products.splice (index, 1)

            await this.saveProductToFile()
            return true

        } catch (error) {
            throw new Error ('Error al eliminar el producto')
        }
    }
}



// Ejemplo de uso

(async () => {

    const filePath = 'fileSystem.json'
    const productManager = new ProductManager (filePath)



    // Crear archivo si no existe
    await productManager.createFile()



    // Obtener productos
    const products = await productManager.getProducts()
    console.log (products)



    // Obtener productos con el ID
    try {

        const product = await productManager.getProductById (2)
        console.log (product)
    } catch (error) {
        console.error (error.message)
    }



    // Agregar productos
    await productManager.addProduct('Producto prueba 1', 'Este es un producto prueba', 100, 'Sin imagen', 'abc123', 10)
    await productManager.addProduct('Producto prueba 2', 'Este es un producto prueba', 200, 'Sin imagen', 'def456', 20)
    await productManager.addProduct('Producto prueba 3', 'Este es un producto prueba', 300, 'Sin imagen', 'ghi789', 30)



    // Actualizar productos
    try {
        const updateProduct = await productManager.updateProduct (2, 'price', 250)

        console.log ('Producto actualizado: ', updateProduct)
    } catch (error) {
        console.error (error.message)
    }



    // Eliminar producto
    try {

        const deleted = await productManager.deleteProduct (3)

        if (deleted) {
            console.log ('Producto elimiando con exito')
        } else {
            console.log ('No se encontro el producto para eliminar')
        }
    } catch (error) {
        console.error (error.message)
    }

    // Obtener productos actualizados
    const updatedProducts = await productManager.getProducts()
    console.log ('Productos actualizados: ', updatedProducts)
})()
