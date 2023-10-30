const socketIO = require('socket.io')

module.exports = (server) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
        console.log('A user connected')

        // Handle WebSocket messages, game logic, and synchronization here.
        socket.on('message', (data) => {
            // Process the message (e.g., game move) and broadcast to others.
            io.emit('message', data)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })
    })
}
