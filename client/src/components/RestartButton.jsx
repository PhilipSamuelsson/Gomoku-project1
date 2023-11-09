import React from 'react';
import PropTypes from 'prop-types';
import '../RestartButton.css';

const RestartButton = ({ restartGame }) => {
    return (
        <div className="footer">
            <button className="reset" onClick={restartGame}>Restart Game</button>
        </div>
    );
};

RestartButton.propTypes = {
    restartGame: PropTypes.func.isRequired,
};

export default RestartButton;
