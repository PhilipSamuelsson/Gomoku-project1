const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const admin = require('firebase-admin')
admin.initializeApp()

const app = express()

app.use(cors({ origin: 'https://starwars-gomoku.web.app' }))
app.use(express.static('public'))
app.use(bodyParser.json())

const db = admin.database()
const gameRef = db.ref('games/gameID') // Update with your Firebase Realtime Database reference

// Replace your existing code for getting and setting game data
app.get('/api/get-board', (req, res) => {
    gameRef.once('value', (snapshot) => {
        const gameData = snapshot.val()
        res.json({
            board: gameData.board,
            currentPlayer: gameData.currentPlayer
        })
    })
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
    gameRef.set(
        {
            board: [...Array(15)].map(() => Array(15).fill(0)),
            currentPlayer: 'player1'
        },
        (error) => {
            if (error) {
                console.error('Reset game failed: ', error)
                res.status(500).send('Reset game failed')
            } else {
                console.log('Game reset successfully.')
                res.status(200).send('Game reset successfully')
            }
        }
    )
})

exports.app = functions.https.onRequest(app)
