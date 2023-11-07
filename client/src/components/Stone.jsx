// eslint-disable-next-line react/prop-types
import Black1 from '../assets/Black1.png'
import White1 from '../assets/White1.png'

// eslint-disable-next-line react/prop-types
function Stone({ color }) {
    const imageSource = color === 'white' ? Black1 : White1;

    return (
        <img
            className="stone"
            src={imageSource}
            alt={color === 'white' ? 'White Stone' : 'Black Stone'}
        />
    );
}

export default Stone;
