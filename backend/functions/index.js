/* eslint-enable quotes */

const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const socketIO = require('socket.io')(http)

socketSetup(http)

const app = express()
app.use(cors({ origin: 'https://starwars-gomoku.web.app' }))
app.use(express.static('public'))
app.use(bodyParser.json())

// Create an HTTP server from the Express app
const server = http.createServer(app)

// Create a WebSocket server using the HTTP server
socketIO.on('connection', (socket) => {
    console.log('A user connected')

    // Handle user move messages
    socket.on('move', (data) => {
        // Process the move and update the game state
        // ...

        // Broadcast the updated game state to all connected clients
        socketIO.emit('gameState', game)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('WebSocket connection established')

    // You can handle WebSocket messages and game logic here
    ws.on('message', (message) => {
        console.log('Received WebSocket message:', message)

        // Handle the WebSocket message (e.g., game move logic)
        // Update game state and broadcast to connected clients
        // Example: game.board[row][col] = player;
    })
})

const game = {
    board: [...Array(15)].map(() => Array(15).fill(null)),
    currentPlayer: 'player1'
}

/**
 * Places the player's stone on the board and switches to the other player.
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @param {string} player - The player ('player1' or 'player2').
 */
// function makeMove(row, col, player) {
//   game.board[row][col] = player;
//   game.currentPlayer = player === "player1" ? "player2" : "player1";
// }

app.get('/', (req, res) => {
    res.send('tjoooo allihopa')
})

app.get('/api/get-board', (req, res) => {
    res.json({ board: game.board, currentPlayer: game.currentPlayer })
})

app.post('/api/reset-game', (req, res) => {
    game.board = [...Array(15)].map(() => Array(15).fill(null))
    game.currentPlayer = 'player1'
    res.status(200).send('Game reset successfully')
})

app.post('/api/make-move', (req, res) => {
    const { row, col, player } = req.body
    console.log('Received move data from client:', { row, col, player })

    game.board[row][col] = player
    game.currentPlayer = player === 'player1' ? 'player2' : 'player1' // Added

    console.log('Updated game board:', game.board)
    console.log('Next player:', game.currentPlayer)

    res.status(200).send('Move successful')
})

exports.app = functions.https.onRequest(app)

// GAMMLA KODEN

// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)
// const bodyParser = require('body-parser')
// const cors = require('cors')

// app.use(cors({ origin: 'https://starwars-gomoku.web.app/' }))
// app.use(express.static('public'))
// app.use(bodyParser.json())

// const game = {
//     board: [...Array(15)].map(() => Array(15).fill(null)),
//     currentPlayer: 'player1' // Initialize the current player
// }

// function makeMove(row, col, player) {
//     // Place the player's stone on the board
//     game.board[row][col] = player

//     // Switch to the other player
//     game.currentPlayer = player === 'player1' ? 'player2' : 'player1'
// }

// app.get('/', (req, res) => {
//     res.send('tjoooo allihopa')
// })
// // HTTP endpoint for fetching the game board
// app.get('/api/get-board', (req, res) => {
//     res.json({ board: game.board, currentPlayer: game.currentPlayer })
// })

// app.post('/api/reset-game', (req, res) => {
//     game.board = [...Array(15)].map(() => Array(15).fill(null))
//     game.currentPlayer = 'player1'
//     res.status(200).send('Game reset successfully')
// })

// // HTTP endpoint for handling player moves
// app.post('/api/make-move', (req, res) => {
//     const { row, col, player } = req.body
//     console.log('Received move data from client:', { row, col, player })

//     // Update the game board with the move
//     game.board[row][col] = player

//     // Log the updated game board
//     console.log('Updated game board:', game.board)

//     // Log the next player (you should have logic here to switch players)
//     console.log('Next player:', game.currentPlayer)

//     res.status(200).send('Move successful')
// })

// const PORT = process.env.PORT || 8000
// http.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })
