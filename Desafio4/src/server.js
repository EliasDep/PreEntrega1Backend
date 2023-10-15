import http from 'http'
import { Server } from 'socket.io'
import fs from 'fs'
import path from 'path'
import { __dirname } from './utils.js'

import app from './app.js'

const serverHttp = http.createServer (app)
const serverSocket = new Server (serverHttp)

const port = 8080

const products = JSON.parse (fs.readFileSync (path.join (__dirname, 'data/products.json')))


serverHttp.listen (port, () => {

    console.log (`Servidor corriendo en http://localhost:${port}`)
})



serverSocket.on ('connection', (socketClient) => {

    console.log (`Se ha conectado un nuevo cliente: (${socketClient.id})`)


    socketClient.emit ('productos', products)


    socketClient.on ('nuevoProducto', (nuevoProducto) => {
        
        products.push (nuevoProducto)
        io.emit ('productos', products)
    })


    socketClient.on ('eliminarProducto', (productoId) => {
        
        const index = products.findIndex ((product) => product.id === productoId)

        if (index !== -1) {

          products.splice (index, 1)
          io.emit ('productos', products)
        }
    })


    socketClient.on ('disconnect', () => {

        console.log (`Se ha desconectado el cliente: (${socketClient.id})`)
    })
})
