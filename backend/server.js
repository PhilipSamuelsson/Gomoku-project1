const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.static('public'))
app.use(bodyParser.json())

const game = {
    board: [...Array(15)].map(() => Array(15).fill(null)),
    currentPlayer: 'player1' // Initialize the current player
}

function makeMove(row, col, player) {
    // Place the player's stone on the board
    game.board[row][col] = player

    // Switch to the other player
    game.currentPlayer = player === 'player1' ? 'player2' : 'player1'
}

app.get('/', (req, res) => {
    res.send('tjoooo allihopa')
})
// HTTP endpoint for fetching the game board
app.get('/api/get-board', (req, res) => {
    res.json({ board: game.board, currentPlayer: game.currentPlayer })
})

app.post('/api/reset-game', (req, res) => {
    game.board = [...Array(15)].map(() => Array(15).fill(null))
    game.currentPlayer = 'player1'
    res.status(200).send('Game reset successfully')
})

// HTTP endpoint for handling player moves
app.post('/api/make-move', (req, res) => {
    const { row, col, player } = req.body
    console.log('Received move data from client:', { row, col, player })

    // Update the game board with the move
    game.board[row][col] = player

    // Log the updated game board
    console.log('Updated game board:', game.board)

    // Log the next player (you should have logic here to switch players)
    console.log('Next player:', game.currentPlayer)

    res.status(200).send('Move successful')
})

const PORT = process.env.PORT || 8000
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
