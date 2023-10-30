import { useState, useEffect } from 'react';
import Board from './Board';
import io from 'socket.io-client';

const Game = () => {
    const [board, setBoard] = useState([...Array(15)].map(() => Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('player1');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);

    const socket = io('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app');

    const fetchInitialGameBoard = async () => {
        try {
            const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/get-board');
            if (response.ok) {
                const data = await response.json();
                setBoard(data.board);
                setCurrentPlayer(data.currentPlayer);
            } else {
                const errorMessage = await response.text();
                console.error(`Failed to fetch game board. Status: ${response.status}. Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    }

    useEffect(() => {
        fetchInitialGameBoard();

        socket.on('move', (data) => {
            const { row, col, player } = data;

            const updatedBoard = [...board];
            updatedBoard[row][col] = player;
            setBoard(updatedBoard);

            if (checkForWin(updatedBoard, row, col, player)) {
                setGameOver(true);
                setWinner(player);
            } else {
                setCurrentPlayer(player === 'player1' ? 'player2' : 'player1');
            }
        });

        return () => {
            socket.disconnect();
        };
    }, );

    const restartGame = async () => {
        try {
            const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/reset-game', {
                method: 'POST',
            });
            if (response.ok) {
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

    const handleMove = (row, col) => {
        if (board[row][col] === null && !gameOver) {
            const updatedBoard = [...board];
            updatedBoard[row][col] = currentPlayer;
            setBoard(updatedBoard);

            sendMoveToServer(row, col, currentPlayer);
        }
    }

    const sendMoveToServer = async (row, col, player) => {
        try {
            const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/make-move', {
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

export default Game;
