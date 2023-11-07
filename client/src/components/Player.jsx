import { useState } from 'react';
import PropTypes from 'prop-types';
import '../components/player/player.css';
import CharacterSelection from './characterSelection/CharacterSelection';

function Player({ playerNumber }) {
  const [isCharacterSelectionOpen, setCharacterSelectionOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState(`Player ${playerNumber}`);

  const toggleCharacterSelection = () => {
    setCharacterSelectionOpen(!isCharacterSelectionOpen);
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    setPlayerName(character.name);
    toggleCharacterSelection();
  };

  const characterImageSrc = selectedCharacter ? selectedCharacter.image : '';

  return (
    <div className="playerContainer" onClick={toggleCharacterSelection}>
      <div className={`player${playerNumber}`}>
        <div className="profileCard">
          <img
            className="profileImage"
            src={characterImageSrc}
            alt="Profile Image"
          />
        </div>
        <div className="leftContainer">
          <div className="topLeft">
            <div className="textTop">{playerName}</div>
          </div>
          <div className="botLeft">
            <div className="timer">
              <div id={`timerDisplay${playerNumber}`}>00:00</div>
            </div>
          </div>
        </div>
        <div className="rightContainer">{/* ... (Player's rightContainer content) */}</div>
      </div>
      <div className={`characterSelection ${isCharacterSelectionOpen ? 'open' : ''}`}>
        <CharacterSelection
          isOpen={isCharacterSelectionOpen}
          onClose={toggleCharacterSelection}
          characters={starWarsCharacters}
          onSelectCharacter={selectCharacter}
          playerNumber={playerNumber}
        />
      </div>
    </div>
  );
}

Player.propTypes = {
  playerNumber: PropTypes.number.isRequired,
  
};

const starWarsCharacters = [
  {
    name: 'Luke Skywalker',
    image: 'https://i.pinimg.com/originals/4c/e3/44/4ce3446ef8dbbd5d9feaedb8caadc897.png',
  },
  {
    name: 'Princess Leia',
    image: 'https://i.pinimg.com/originals/be/ae/49/beae4969d8151ee3405b9b8131e2081f.png',
  },
  // Add more Star Wars characters here
];

export default Player;
