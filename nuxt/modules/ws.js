import SocketIO from 'socket.io'

export default function () {
  this.nuxt.hook('listen', (server) => {
    const io = SocketIO(server)
    io.on('connection', (socket) => {
      socket.on('test', (msg, cb) => {
        console.log('TEST!', msg)
        cb({ it: 'works!' })
      })
    })
  })
}
