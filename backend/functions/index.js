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

exports.app = functions.https.onRequest(app)
