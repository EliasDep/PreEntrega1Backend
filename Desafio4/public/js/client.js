(function() {

    const socket = io()
  
    const productList = document.getElementById ('product-list')
  
  
    socket.on ('connect', () => {
  
      console.log ('Conectado al servidor de Socket.IO')
  
  
      socket.on ('productos', (products) => {
        
        productList.innerHTML = ''
  
        products.forEach ((product) => {
  
          const listItem = document.createElement ('li')
  
          listItem.textContent = `${product.title}: $ ${product.price}, ${product.description}, Code: ${product.code}, Stock: ${product.stock}`
          productList.appendChild (listItem)
        })
      })
    })
})()