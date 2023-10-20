import ProductManager from '../../classes/ProductManager.js'

const productManager = new ProductManager()


export const getProducts = async (req, res) => {
    
    const { limit } = req.query
    const products = JSON.parse (await productManager.getProducts())

    if (limit) {
        const limitedProducts = products.slice (0, parseInt(limit))

        return res.json (limitedProducts)
    } else {

        return res.json (products)
    }
}

export const getProductById = async (req, res) => {
    
    const { pid } = req.params
    const product = await productManager.getProductById (pid)

    if (product) {
        return res.json (product)
    } else {
        
        return res.status(404).json ({ error: 'Product not found' })
    }
}
