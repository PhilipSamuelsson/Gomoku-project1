import PropTypes from 'prop-types';
import Stone from './Stone';

const Board = ({ board, handleMove }) => {
    return (
        <div className="board">
            {Object.keys(board).map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {Object.keys(board[row]).map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className={`board-cell${board[row][col] ? ' clicked' : ''}`}
                            onClick={() => handleMove(row, col)}
                        >
                            {board[row][col] ? (
                                <Stone
                                    color={
                                        board[row][col] === 'player1' ? 'white' : 'black'
                                    }
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

Board.propTypes = {
    board: PropTypes.object.isRequired, // Change the prop type to object
    handleMove: PropTypes.func.isRequired
}

export default Board;
