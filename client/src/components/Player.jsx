import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../components/player/player.css';
import CharacterSelection from './characterSelection/CharacterSelection';


function Player({ playerNumber, isCharacterSelectionEnabled }) {

  const [isCharacterSelectionOpen, setCharacterSelectionOpen] = useState(false);

  // Initialize with default values
  const [selectedCharacter, setSelectedCharacter] = useState(
    JSON.parse(localStorage.getItem(`selectedCharacter${playerNumber}`)) || null
  );

  // Initialize with default value
  const [playerName, setPlayerName] = useState(
    localStorage.getItem(`playerName${playerNumber}`) || `Player ${playerNumber}`
  );

  // Function to toggle the character selection modal
  const toggleCharacterSelection = () => {
    // Only open the character selection if it's enabled
    if (isCharacterSelectionEnabled) {
      setCharacterSelectionOpen(!isCharacterSelectionOpen);
    }
  };

  // Function to select a character
  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    setPlayerName(character.name);
    toggleCharacterSelection();
  };

  useEffect(() => {
    // Load the state from localStorage when the component mounts
    const storedSelectedCharacter = localStorage.getItem(`selectedCharacter${playerNumber}`);
    const storedPlayerName = localStorage.getItem(`playerName${playerNumber}`);

    if (storedSelectedCharacter !== null) {
      setSelectedCharacter(JSON.parse(storedSelectedCharacter));
    }

    if (storedPlayerName !== null) {
      setPlayerName(storedPlayerName);
    }
  }, [playerNumber]);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`selectedCharacter${playerNumber}`, JSON.stringify(selectedCharacter));
    localStorage.setItem(`playerName${playerNumber}`, playerName);
  }, [selectedCharacter, playerName, playerNumber]);

  const characterImageSrc = selectedCharacter ? selectedCharacter.image : '';

  console.log('isCharacterSelectionEnabled:', isCharacterSelectionEnabled); // Log the game state

  return (
    <div className={`playerContainer player${playerNumber}`} onClick={toggleCharacterSelection}>
      <div className="player">
        {playerNumber === 1 ? (
          <>
            <div className="leftContainer1">
              <div className="topLeft">
                <div className="textTop">{playerName}</div>
              </div>
              {/* <div className="botLeft">
                <div className="timer">
                  <div id={`timerDisplay${playerNumber}`}></div>
                </div>
              </div> */}
            </div>
            <div className="rightContainer1">
              <div className="profileCard">
                <img
                  className="profileImage"
                  src={characterImageSrc}
                  alt="Profile Image"
                />
              </div>{/* ... (Player's rightContainer content) */}
            </div>
          </>
        ) : (
          <>
            <div className="leftContainer2">
              <div className="profileCard">
                <img
                  className="profileImage"
                  src={characterImageSrc}
                  alt="Profile Image"
                />
              </div>
            </div>
            <div className="rightContainer2">
              <div className="topRight">
                <div className="textTop">{playerName}</div>
              </div>
              {/* <div className="botLeft">
                <div className="timer">
                  <div id={`timerDisplay${playerNumber}`}></div>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
      <div className={`characterSelection ${isCharacterSelectionOpen && isCharacterSelectionEnabled ? 'open' : ''}`}>
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
  isCharacterSelectionEnabled: PropTypes.bool.isRequired, // A prop to enable or disable character selection
};

const starWarsCharacters = [
  {
    name: 'Luke Skywalker',
    image: 'https://i.pinimg.com/originals/4c/e3/44/4ce3446ef8dbbd5d9feaedb8caadc897.png',
  },
  {
    name: 'Princess Leia',
    image: 'https://i.pinimg.com/originals/be/ae/49/beae4969d8151ee3405b9b8131e2081f.png',
  }, {
    name: 'Darth Vader',
    image: 'https://i.pinimg.com/originals/9f/9f/73/9f9f73b4b9b89101f9419241d64233d3.png'
  }
];

export default Player;
