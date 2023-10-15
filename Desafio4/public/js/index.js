(function() {

  const socket = io()

  
  socket.on ('connect', () => {

    console.log ('Conectado al servidor de Socket.IO')
  })


  socket.on ('disconnect', () => {

    console.log ('Desconectado al servidor de Socket.IO')
  })
})()