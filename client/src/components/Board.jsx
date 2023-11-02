import PropTypes from 'prop-types';
import Stone from './Stone';

const Board = ({ board, handleMove }) => {
  const handleCellClick = (rowIndex, colIndex) => {
    console.log(`Cell clicked: Row ${rowIndex}, Column ${colIndex}`);
    handleMove(rowIndex, colIndex);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            console.log('Cell data:', cell); // Add this line for debugging
            return (
              <div
                key={colIndex}
                className={`board-cell${cell ? ' clicked' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell ? (
                  <Stone
                    color={cell === 'player1' ? 'white' : 'black'}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  handleMove: PropTypes.func.isRequired,
};

export default Board;
