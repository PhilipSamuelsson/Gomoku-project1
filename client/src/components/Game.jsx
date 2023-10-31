import { useState, useEffect } from 'react';
import Board from './Board';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const Game = ({ roomCode }) => {
    const [board, setBoard] = useState([...Array(15)].map(() => Array(15).fill(0)));
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        // Function to fetch the initial game board data when the component mounts
        const fetchInitialGameBoard = async () => {
            try {
                const response = await fetch(`https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/create-or-join-room`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roomCode }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setBoard(data.board);
                    // Handle other game state updates, such as the current player
                } else {
                    const errorMessage = await response.text();
                    console.error(`Failed to create/join room. Status: ${response.status}. Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error creating/joining room:', error);
            }
        }

        fetchInitialGameBoard(); // Fetch initial game board data when the component mounts

        // Clean up any resources (e.g., clearInterval) if needed
        return () => {
            // Clean up code, if any
        }
    }, [roomCode]);

    // Check for win function
    // ...

    // Handle player moves and check for wins
    const handleMove = async (row, col) => {
        // Check if the cell is empty and the game is still in progress
        if (board[row][col] === 0 && !gameOver) {
            // Update the board with the current player's stone
            const updatedBoard = [...board];
            updatedBoard[row][col] = currentPlayer;
            setBoard(updatedBoard);

            // Send the move data to the server
            try {
                const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/make-move', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roomCode, row, col, player: currentPlayer }),
                });

                if (response.ok) {
                    console.log('Move successful');
                } else {
                    const errorMessage = await response.text();
                    console.error(`Failed to make a move. Status: ${response.status}. Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error making a move:', error);
            }

            // Check for a win after the move
            // ...

            // Switch to the other player
            setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
        }
    }

    // Reset the game function
    const resetGame = async () => {
        try {
            const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/reset-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCode }),
            });

            if (response.ok) {
                // Reset the game on the client
                setBoard([...Array(15)].map(() => Array(15).fill(0)));
                setCurrentPlayer('player1');
                setGameOver(false);
                setWinner(null);
            } else {
                const errorMessage = await response.text();
                console.error(`Failed to reset the game. Status: ${response.status}. Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error resetting the game:', error);
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
                    <button onClick={resetGame}>Restart Game</button>
                </div>
            ) : (
                <Board board={board} handleMove={handleMove} />
            )}
        </div>
    )
}

Game.propTypes = {
    roomCode: PropTypes.string.isRequired,
    onJoinRoom: PropTypes.func.isRequired,
};

export default Game;
