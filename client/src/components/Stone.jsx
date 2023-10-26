// eslint-disable-next-line react/prop-types
function Stone({ color }) {
    const stoneStyle = {
      backgroundColor: color === 'white' ? '#ffffff' : '#000000', // Set the background color based on the color prop
    };

    return <div className="stone" style={stoneStyle}></div>;
  }

  export default Stone;
