import PropTypes from 'prop-types'
import Stone from './Stone' // Import your Stone component

const Board = ({ board, handleMove }) => {



    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={`board-cell${cell ? ' clicked' : ''}`}
                            onClick={() => handleMove(rowIndex, colIndex)}
                        >
                            {cell ? (
                                <Stone
                                    color={
                                        cell === 'player1' ? 'white' : 'black'
                                    }
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

Board.propTypes = {
    board: PropTypes.array.isRequired,
    handleMove: PropTypes.func.isRequired
}

export default Board
