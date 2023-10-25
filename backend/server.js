const express = require('express')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({ origin: 'http://localhost:3000' }))
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

// HTTP endpoint for handling player moves
app.post('/make-move', (req, res) => {
    const { row, col, player } = req.body

    // Call the makeMove function directly without validation
    makeMove(row, col, player)

    // Respond with a success status
    res.status(200).send('Move successful')
})

const PORT = process.env.PORT || 8000
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
