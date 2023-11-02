import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const Game = ({ roomCode, ws }) => {
  const [waitingForPlayer, setWaitingForPlayer] = useState(true);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (ws) {
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'player-joined':
              console.log('Player joined message received from server:', data);
              setBoard(data.board);
              setCurrentPlayer(data.currentPlayer);
              setPlayer(data.player); // Update the player state
              setWaitingForPlayer(false); // Set waitingForPlayer to false
              break;
          case 'game-reset':
            // Handle the game reset condition, e.g., clear the board
            setBoard(data.board);
            setCurrentPlayer(data.currentPlayer);
            break;
          default:
            break;
        }
      };
    }
  }, [ws]);
  const handleMove = (row, col) => {
    console.log(`Player: ${player}, Current Player: ${currentPlayer}`);
    // Check if it's the player's turn and the cell is empty
    if (currentPlayer === player && !board[row][col]) {
      // Update the local state of the board
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[row][col] = currentPlayer;
        return newBoard;
      });

      // Send a 'make-move' message to the server with the row and col
      ws.send(JSON.stringify({
        type: 'make-move',
        roomCode,
        data: { row, col, player: currentPlayer },
      }));

      // Update the currentPlayer state to the other player
      setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
    }
  };
  return (
    <div>
      <h2>Room: {roomCode}</h2>
      {waitingForPlayer ? (
        <p>Waiting for another player...</p>
      ) : (
        <div>
          <p>Current player: {currentPlayer}</p>
          {board.length > 0 && handleMove && (
            <Board board={board} handleMove={handleMove} />
          )}
        </div>
      )}
    </div>
  );
};

Game.propTypes = {
  roomCode: PropTypes.string.isRequired,
  ws: PropTypes.instanceOf(WebSocket).isRequired,
};

export default Game;
