import PropTypes from 'prop-types';

function Stone({ color }) {
  const stoneStyle = {
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    border: '1px solid #d0d0d048',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.35)',
    backgroundColor: color === 'white' ? 'white' : 'black',
  };

  return <div className="stone" style={stoneStyle}></div>;
}

Stone.propTypes = {
    color: PropTypes.string.isRequired,
  };

export default Stone;
