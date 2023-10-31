const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')

const serviceAccount = require('./key.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://starwars-gomoku-backend.firebaseio.com/'
})

const db = admin.database()

const app = express()

app.use(cors({ origin: 'https://starwars-gomoku.web.app' }))
app.use(express.static('public'))
app.use(bodyParser.json())

// Store rooms and their game data
const rooms = {}

// Function to send real-time updates to clients
const sendRealTimeUpdate = (roomCode, data) => {
    // Update data for all players in the room
    if (rooms[roomCode]) {
        for (const player of rooms[roomCode].players) {
            player.res.json(data)
        }
    }
}

// Create a new room or join an existing room
app.post('/api/create-or-join-room', (req, res) => {
    const { roomCode } = req.body

    if (!rooms[roomCode]) {
        // Create a new room
        rooms[roomCode] = {
            board: [...Array(15)].map(() => Array(15).fill(0)),
            currentPlayer: 'player1',
            players: []
        }
    }

    const room = rooms[roomCode]

    // If there are already two players, reject the third
    if (room.players.length >= 2) {
        res.status(403).send('Room is full.')
    } else {
        // Add the player to the room
        room.players.push({
            res,
            player: room.players.length === 0 ? 'player1' : 'player2'
        })

        // If the room is full, start the game
        if (room.players.length === 2) {
            // Inform both players that the game has started
            room.players[0].res.json({
                board: room.board,
                currentPlayer: room.currentPlayer
            })
            room.players[1].res.json({
                board: room.board,
                currentPlayer: room.currentPlayer
            })
        }
    }
})

// Handle player moves
app.post('/api/make-move', (req, res) => {
    const { roomCode, row, col, player } = req.body

    if (rooms[roomCode]) {
        const room = rooms[roomCode]
        const { board, currentPlayer } = room

        // Check if the player can make a move
        if (player === currentPlayer && board[row][col] === 0) {
            // Update the board with the player's move
            board[row][col] = player
            room.currentPlayer = player === 'player1' ? 'player2' : 'player1'

            // Send the real-time update to clients
            sendRealTimeUpdate(roomCode, {
                board,
                currentPlayer: room.currentPlayer
            })

            res.status(200).send('Move successful')
        } else {
            res.status(403).send('Invalid move.')
        }
    } else {
        res.status(404).send('Room not found.')
    }
})

// Reset the game
app.post('/api/reset-game', (req, res) => {
    const { roomCode } = req.body

    if (rooms[roomCode]) {
        const room = rooms[roomCode]
        room.board = [...Array(15)].map(() => Array(15).fill(0))
        room.currentPlayer = 'player1'

        // Send the real-time update to clients
        sendRealTimeUpdate(roomCode, {
            board: room.board,
            currentPlayer: room.currentPlayer
        })

        res.status(200).send('Game reset successfully')
    } else {
        res.status(404).send('Room not found.')
    }
})

exports.app = functions.https.onRequest(app)
