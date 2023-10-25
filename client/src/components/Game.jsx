import { useState, useEffect } from 'react'
import Board from './Board'

const Game = () => {
    const [board, setBoard] = useState([...Array(15)].map(() => Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [gameOver, setGameOver] = useState(false); // Initialize gameOver
    const [winner, setWinner] = useState(null); // Initialize winner

    // Polling interval (in milliseconds)
    const pollingInterval = 5000 // Adjust the interval as needed


    // Check for win function
    function checkForWin(board, row, col, player) {
        const directions = [
            [0, 1],  // Right
            [1, 0],  // Down
            [1, 1],  // Diagonal right-down
            [-1, 1]  // Diagonal left-down
        ];

        for (const [dx, dy] of directions) {
            let count = 1; // Initialize with 1 to count the current stone

            // Check both directions
            for (let direction of [-1, 1]) {
                let r = row + dx * direction;
                let c = col + dy * direction;

                while (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === player) {
                    count++;
                    r += dx * direction;
                    c += dy * direction;
                }
            }

            if (count >= 5) {
                // Player wins
                console.log('WINNER!!')
                return true;
            }
        }

        return false;
    }

      // Function to restart the game
      const restartGame = () => {
        setBoard([...Array(15)].map(() => Array(15).fill(null))); // Clear the board
        setCurrentPlayer('player1'); // Reset to the initial player
        setGameOver(false); // Reset the game over state
        setWinner(null); // Reset the winner
    }

    useEffect(() => {
        // Function to fetch the game board and update state
        const fetchGameBoard = async () => {
            try {
                const response = await fetch('/api/get-board');
                if (response.ok) {
                    const data = await response.json();
                    setBoard(data.board);
                    // Handle other game state updates, such as the current player
                } else {
                    const errorMessage = await response.text(); // Get the error message from the response
                    console.error(`Failed to fetch game board. Status: ${response.status}. Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        }

        // Periodically fetch game updates
        const pollIntervalId = setInterval(fetchGameBoard, pollingInterval)

        // Clean up the interval on component unmount
        return () => {
            clearInterval(pollIntervalId)
        }
    }, [])

       // Handle player moves and check for wins
       const handleMove = (row, col) => {
        // Check if the cell is empty and the game is still in progress
        const moveData = { row, col, player: currentPlayer };
        console.log('Sending move data to server:', moveData);
        if (board[row][col] === null && !gameOver) {
            // Update the board with the current player's stone
            const updatedBoard = [...board];
            updatedBoard[row][col] = currentPlayer;
            setBoard(updatedBoard);

            // Check for a win after the move
            if (checkForWin(updatedBoard, row, col, currentPlayer)) {
                // Player wins
                setGameOver(true);
                setWinner(currentPlayer);
            } else {
                // Switch to the other player
                setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
            }
        }
    }


    return (
        <div>
            <h1>Online Gomoku Game</h1>
            {gameOver ? (
                <div>
                    {winner ? (
                        <p>{winner} wins!</p>
                    ) : (
                        <p>It&apos;s a draw!</p>
                    )}
                    <button onClick={restartGame}>Restart Game</button>
                </div>
            ) : (
                <Board board={board} handleMove={handleMove} />
            )}
        </div>
    )
}

export default Game
