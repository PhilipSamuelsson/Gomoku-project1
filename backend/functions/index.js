const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const admin = require('firebase-admin')

// Initialize Firebase Admin with your service account key
const serviceAccount = require('./key.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://starwars-gomoku-backend.firebaseio.com/'
})

const db = admin.database()
const gameRef = db.ref('games/gameID')

const app = express()

app.use(cors({ origin: 'https://starwars-gomoku.web.app' }))
app.use(express.static('public'))
app.use(bodyParser.json())

// Function to send real-time updates to clients
const sendRealTimeUpdate = (data) => {
    gameRef.set(data, (error) => {
        if (error) {
            console.error('Error sending real-time update:', error)
        }
    })
}

app.get('/api/get-board', (req, res) => {
    // Attempt to fetch the game board data
    gameRef.once(
        'value',
        (snapshot) => {
            const gameData = snapshot.val()
            if (gameData) {
                res.json({
                    board: gameData.board,
                    currentPlayer: gameData.currentPlayer
                })
            } else {
                console.error('Error fetching game board data: Data not found')
                res.status(500).send('Error fetching game board data')
            }
        },
        (error) => {
            console.error('Error fetching game board data:', error)
            res.status(500).send('Error fetching game board data')
        }
    )
})

app.post('/api/make-move', (req, res) => {
    const { row, col, player } = req.body

    // Update the game data in Firebase Realtime Database
    gameRef.transaction(
        (currentData) => {
            if (currentData) {
                currentData.board[row][col] = player
                currentData.currentPlayer =
                    player === 'player1' ? 'player2' : 'player1'
            }

            // Send the real-time update to clients
            sendRealTimeUpdate(currentData)

            return currentData
        },
        (error, committed, snapshot) => {
            if (error) {
                console.error('Transaction failed: ', error)
                res.status(500).send('Move failed')
            } else {
                console.log('Transaction completed successfully.')
                res.status(200).send('Move successful')
            }
        }
    )
})

app.post('/api/reset-game', (req, res) => {
    // Reset the game data in Firebase Realtime Database
    const initialData = {
        board: [...Array(15)].map(() => Array(15).fill(0)),
        currentPlayer: 'player1'
    }

    gameRef.set(initialData, (error) => {
        if (error) {
            console.error('Reset game failed: ', error)
            res.status(500).send('Reset game failed')
        } else {
            console.log('Game reset successfully.')

            // Send the real-time update to clients with initialData
            sendRealTimeUpdate(initialData)

            res.status(200).send('Game reset successfully')
        }
    })
})

exports.app = functions.https.onRequest(app)
