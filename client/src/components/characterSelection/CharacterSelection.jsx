
import PropTypes from 'prop-types';
import './CharacterSelection.css'; // Import the CSS file

const CharacterSelection = ({ characters, onSelectCharacter, isOpen, onClose, playerNumber  }) => {
  const closeCharacterSelection = () => {
    onClose();
  };

  return (
    <div className={`characterSelection ${isOpen ? 'open' : ''} player${playerNumber}`}>
      <button onClick={closeCharacterSelection}>Close</button>
      {characters.map((character, index) => (
        <div key={index} className="characterOption" onClick={() => onSelectCharacter(character)}>
          <img src={character.image} alt={character.name} />
          <div>{character.name}</div>
        </div>
      ))}
    </div>
  );
};

CharacterSelection.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectCharacter: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  playerNumber: PropTypes.oneOf([1, 2]).isRequired, // Add validation for playerNumber
};

export default CharacterSelection;
