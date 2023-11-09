import  { useState, useEffect } from 'react';
import ReadyButton from "../ReadyButton/ReadyButton";
import Rules from "../Rules/Rules";
import "./landingPage.css";
import Logo from "./white-logo.png";
import PropTypes from "prop-types"; // Import PropTypes
import Player from "../Player";

export default function LandingPage({ onReadyButtonClick, onSelectCharacter }) {
  // State variables to hold the selected characters for each player
  const [selectedCharacter1, setSelectedCharacter1] = useState(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState(null);

  // Function to handle character selection for a player
  const handleCharacterSelect = (playerNumber, character) => {
    if (playerNumber === 1) {
      setSelectedCharacter1(character);
    } else if (playerNumber === 2) {
      setSelectedCharacter2(character);
    }
  };

  useEffect(() => {
    // Check if both players have selected characters
    if (selectedCharacter1 && selectedCharacter2) {
        console.log("selectedCharacter1", selectedCharacter1);
        console.log("selectedCharacter2", selectedCharacter2);
      // Call the onReadyButtonClick function to start the game
      onReadyButtonClick();
    }
  }, [selectedCharacter1, selectedCharacter2, onReadyButtonClick]);

  return (
    <div className="landing-page-content">
      <div className="landing-page-background">
        <div className="landing-page-logo">
          <img src={Logo} alt="GOMOKU" />
        </div>
        <section className="player-section">
          <Player
            playerNumber={1}
            selectedCharacter={selectedCharacter1}
            onSelectCharacter={character => handleCharacterSelect(1, character)}
            isCharacterSelectionEnabled={true} // Enable character selection in the landing page
          />
          <Player
            playerNumber={2}
            selectedCharacter={selectedCharacter2}
            onSelectCharacter={character => handleCharacterSelect(2, character)}
            isCharacterSelectionEnabled={true} // Enable character selection in the landing page
          />
        </section>
        <ReadyButton title="Start Game" onReadyButtonClick={onReadyButtonClick} />
      </div>
      <Rules />
    </div>
  );
}

LandingPage.propTypes = {
  onReadyButtonClick: PropTypes.func.isRequired, // Validate the onReadyButtonClick prop
  onSelectCharacter: PropTypes.func.isRequired, // Validate the onSelectCharacter prop
};
