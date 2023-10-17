import ProductManager from '../../classes/ProductManager.js'

const productManager = new ProductManager()


export const updateProduct = async (req, res) => {
    
    const { pid } = req.params
    const { title, description, price, code, stock } = req.body
    
    try {
        
        const productToUpdate = await productManager.getProductById (pid)

        if (!productToUpdate) {
        return res.status(404).json ({ error: 'Product not found' })
        }

        const updatedProduct = {

        title: title || productToUpdate.title,
        description: description || productToUpdate.description,
        price: price || productToUpdate.price,
        code: code || productToUpdate.code,
        stock: stock || productToUpdate.stock,
        id: productToUpdate.id
        }

        await productManager.updateProduct (pid, updatedProduct)

        return res.status(200).json ({ message: 'Producto actualizado correctamente' })
        
    } catch (error) {

        console.error ('Error al actualizar el producto:', error)
        res.status(500).send('Error al actualizar el producto')
    }
}
