const express = require('express')
const WebSocket = require('ws')
const http = require('http')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// Store rooms and their game data
const rooms = {}

// Function to send real-time updates to clients
const sendRealTimeUpdate = (roomCode, data) => {
    // Update data for all players in the room
    if (rooms[roomCode]) {
        for (const ws of rooms[roomCode].players) {
            ws.send(JSON.stringify(data))
        }
    }
}

// Function to check for a win
const checkForWin = (board, row, col, player) => {
    // Check in all eight directions
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
        [-1, 0],
        [0, -1],
        [-1, -1],
        [-1, 1]
    ]

    for (const [dx, dy] of directions) {
        let count = 1 // Count of consecutive pieces
        let r, c

        // Check in one direction
        for (let i = 1; i <= 4; i++) {
            r = row + i * dx
            c = col + i * dy

            if (
                r >= 0 &&
                r < 15 &&
                c >= 0 &&
                c < 15 &&
                board[r][c] === player
            ) {
                count++
            } else {
                break
            }
        }

        for (let i = 1; i <= 4; i++) {
            r = row - i * dx
            c = col - i * dy

            if (
                r >= 0 &&
                r < 15 &&
                c >= 0 &&
                c < 15 &&
                board[r][c] === player
            ) {
                count++
            } else {
                break
            }
        }

        if (count >= 5) {
            return true // Player wins
        }
    }

    return false
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const { type, roomCode, data } = JSON.parse(message)

        switch (type) {
            case 'create-or-join-room': {
                const roomCodeStr = String(roomCode)

                if (!rooms[roomCodeStr]) {
                    // Create a new room
                    rooms[roomCodeStr] = {
                        board: [...Array(15)].map(() => Array(15).fill(0)),
                        currentPlayer: 'player1',
                        players: []
                    }
                }

                const room = rooms[roomCodeStr]

                // If there are already two players, reject the third
                if (room.players.length >= 2) {
                    ws.send(JSON.stringify({ error: 'Room is full.' }))
                } else {
                    // Add the player to the room
                    room.players.push(ws)

                    // Send a 'player-joined' message to the new player
                    ws.send(
                        JSON.stringify({
                            type: 'player-joined',
                            board: room.board,
                            currentPlayer: room.currentPlayer,
                            player:
                                room.players.length === 1
                                    ? 'player1'
                                    : 'player2' // Set the player field
                        })
                    )

                    if (room.players.length === 2) {
                        // The room is full, start the game
                        room.players.forEach((playerWs) => {
                            playerWs.send(
                                JSON.stringify({
                                    type: 'player-joined',
                                    board: room.board,
                                    currentPlayer: room.currentPlayer,
                                    player:
                                        playerWs === ws ? 'player2' : 'player1'
                                })
                            )
                        })
                    }
                }
                break
            }

            case 'make-move': {
                const { row, col, player } = data

                if (rooms[roomCode]) {
                    const room = rooms[roomCode]
                    const { board, currentPlayer } = room

                    // Check if the player can make a move
                    if (player === currentPlayer && board[row][col] === 0) {
                        // Update the board with the player's move
                        board[row][col] = player

                        // Check for a win
                        if (checkForWin(board, row, col, player)) {
                            // Game over, the current player wins
                            sendRealTimeUpdate(roomCode, {
                                type: 'game-over',
                                board,
                                winner: player
                            })
                        } else {
                            // Toggle the current player for both players in the room
                            room.currentPlayer =
                                player === 'player1' ? 'player2' : 'player1'

                            // Send the real-time update to clients
                            sendRealTimeUpdate(roomCode, {
                                board,
                                currentPlayer: room.currentPlayer
                            })
                        }
                    } else {
                        ws.send(JSON.stringify({ error: 'Invalid move.' }))
                    }
                } else {
                    ws.send(JSON.stringify({ error: 'Room not found.' }))
                }
                break
            }
            case 'reset-game': {
                if (rooms[roomCode]) {
                    const room = rooms[roomCode]
                    room.board = [...Array(15)].map(() => Array(15).fill(0))
                    room.currentPlayer = 'player1'

                    // Send the real-time update to clients
                    sendRealTimeUpdate(roomCode, {
                        type: 'game-reset',
                        board: room.board,
                        currentPlayer: room.currentPlayer
                    })
                } else {
                    ws.send(JSON.stringify({ error: 'Room not found.' }))
                }
                break
            }
        }
    })
})

server.listen(8080, () => {
    console.log('Server started on port 8080')
})
