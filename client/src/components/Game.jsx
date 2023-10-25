import { useState, useEffect } from 'react'
import Board from './Board'

const Game = () => {
    // State to store the game board and current player
    const [board, setBoard] = useState(
        [...Array(15)].map(() => Array(15).fill(null))
    )
    const [currentPlayer, setCurrentPlayer] = useState('player1') // Or 'player2' based on your setup

    // Polling interval (in milliseconds)
    const pollingInterval = 5000 // Adjust the interval as needed

    useEffect(() => {
        // Function to fetch the game board and update state
        const fetchGameBoard = async () => {
            try {
                const response = await fetch('/api/get-board') // Adjust the endpoint to your server
                if (response.ok) {
                    const data = await response.json()
                    setBoard(data.board)
                    // Handle other game state updates, such as the current player
                } else {
                    console.error('Failed to fetch game board')
                }
            } catch (error) {
                console.error('Error fetching game data:', error)
            }
        }

        // Periodically fetch game updates
        const pollIntervalId = setInterval(fetchGameBoard, pollingInterval)

        // Clean up the interval on component unmount
        return () => {
            clearInterval(pollIntervalId)
        }
    }, [])

    // Handle player moves
    const handleMove = (row, col) => {
        console.log('Row:', row, 'Col:', col) // Debugging: Verify that row and col are correct

        // Debugging: Check if the board state is updated correctly
        const updatedBoard = [...board]
        updatedBoard[row][col] =
            currentPlayer === 'player1' ? 'player1' : 'player2'
        console.log('Updated Board:', updatedBoard)

        // Debugging: Check the current player
        console.log('Current Player:', currentPlayer)

        // Update the board state to place the stone
        setBoard(updatedBoard)
    }

    return (
        <div>
            <h1>Online Gomoku Game</h1>
            <Board board={board} handleMove={handleMove} />
        </div>
    )
}

export default Game
