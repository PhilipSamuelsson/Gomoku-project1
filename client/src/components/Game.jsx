import { useState, useEffect } from 'react';
import Board from './Board';
import WinnerModule from './WinnerModule';
import RestartButton from './RestartButton'; // Note the lowercase 'r'

const Game = () => {
    const [board, setBoard] = useState([...Array(15)].map(() => Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    // Function to restart the game
    const restartGame = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/reset-game', {
                method: 'POST',
            });
            if (response.ok) {
                // Reset the game on the client
                setBoard([...Array(15)].map(() => Array(15).fill(null)));
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

    useEffect(() => {
        // Function to fetch the initial game board data when the component mounts
        const fetchInitialGameBoard = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get-board');
                if (response.ok) {
                    const data = await response.json();
                    setBoard(data.board);
                    // Handle other game state updates, such as the current player
                } else {
                    const errorMessage = await response.text();
                    console.error(`Failed to fetch game board. Status: ${response.status}. Error: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        }

        fetchInitialGameBoard(); // Fetch initial game board data when component mounts

        // Clean up any resources (e.g., clearInterval) if needed
        return () => {
            // Clean up code, if any
        }
    }, []);

    // Check for win function
    function checkForWin(board, row, col, player) {
        const directions = [
            [0, 1],  // Right
            [1, 0],  // Down
            [1, 1],  // Diagonal right-down
            [-1, 1]  // Diagonal left-down
        ];

        for (const [dx, dy] of directions) {
            let count = 1;

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
                console.log('WINNER!!');
                return true;
            }
        }

        return false;
    }

    // Handle player moves and check for wins
    const handleMove = (row, col) => {
        // Check if the cell is empty and the game is still in progress
        if (board[row][col] === null && !gameOver) {
            // Update the board with the current player's stone
            const updatedBoard = [...board];
            updatedBoard[row][col] = currentPlayer;
            setBoard(updatedBoard);

            // Send the move data to the server
            sendMoveToServer(row, col, currentPlayer);

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

    const sendMoveToServer = async (row, col, player) => {
        try {
            const response = await fetch('http://localhost:8000/api/make-move', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ row, col, player }),
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
    }


    return (
        <div id="container">
            {gameOver ? (
                <div id="game-over">
                    {winner ? (
                        <WinnerModule winner={winner} restartGame={restartGame} />
                    ) : (
                        <p>It&apos;s a draw!</p>
                    )}
                </div>
            ) : (
                <>

                    <Board board={board} handleMove={handleMove} />
                    <RestartButton restartGame={restartGame} />
                </>

            )}
        </div >

    )
}

export default Game;
