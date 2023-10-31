import { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [board, setBoard] = useState([...Array(15)].map(() => Array(15).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Function to restart the game
  const restartGame = async () => {
    try {
      const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/reset-game', {
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
      console.error('Error restarting the game:', error);
    }
  };

  useEffect(() => {
    // Function to fetch the initial game board data when the component mounts
    const fetchInitialGameBoard = async () => {
      try {
        const response = await fetch('https://us-central1-starwars-gomoku-backend.cloudfunctions.net/app/api/get-board');
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
    };

    fetchInitialGameBoard(); // Fetch initial game board data when component mounts

    // Clean up any resources (e.g., clearInterval) if needed
    return () => {
      // Clean up code, if any
    };
  }, []);

  // ... (rest of the code)

  return (
    <div id="container">
      {gameOver ? (
        <div id="game-over">
          {winner ? (
            <p>{winner} wins!</p>
          ) : (
            <p>It's a draw!</p>
          )}
          <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <Board board={board} handleMove={handleMove} />
      )}
    </div>
  );
};

export default Game;