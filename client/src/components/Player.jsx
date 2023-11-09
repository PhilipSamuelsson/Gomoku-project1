
<<<<<<< Updated upstream
import '../player.css'
=======

function Player({ playerNumber }) {
  const [isCharacterSelectionOpen, setCharacterSelectionOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState(`Player ${playerNumber}`);
>>>>>>> Stashed changes

function Player() {
    return (
        <div id="bodyContainer">
            <div className="playerContainer">
                <div className="playerOne">
                    <div className="leftContainer">
                        <div className="topLeft">
                            <div className="textTop">Player 1</div>
                        </div>
                        <div className="botLeft">
                            <div className="timer">
                                <div id="timerDisplay1">00:00</div>
                            </div>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div className="profileCard">
                            <img className="profileImage" src="" alt="Profile Image" />
                        </div>
                    </div>
                </div>

<<<<<<< Updated upstream
                <div className="playerTwo">
                    <div className="rightContainer">
                        <div className="profileCard">
                            <img className="profileImage" src="" alt="Profile Image" />
                        </div>
                    </div>
                    <div className="leftContainer">
                        <div className="topLeft">
                            <div className="textTop">Player 2</div>
                        </div>
                        <div className="botLeft">
                            <div className="timer">
                                <div id="timerDisplay2">00:00</div>
                            </div>
                        </div>
                    </div>
                </div>
=======
  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    setPlayerName(character.name);
    toggleCharacterSelection();
  };

  const characterImageSrc = selectedCharacter ? selectedCharacter.image : '';

  return (
    <div className="playerContainer" onClick={toggleCharacterSelection}>
      <div className={`player${playerNumber}`}>
        <div className="leftContainer">
          <div className="topLeft">
            <div className="textTop">{playerName}</div>
          </div>
          <div className="botLeft">
            <div className="timer">
              <div id={`timerDisplay${playerNumber}`}>00:00</div>
>>>>>>> Stashed changes
            </div>

            {/* <div id="gameContainer">
                <div id="playerTurn"></div>
                <button onClick={toggleTimer}>Toggle Timer</button>
            </div> */}
        </div>
<<<<<<< Updated upstream
    );
}

let players = [
    { timer: 300 }, // Player One with 5 minutes
    { timer: 300 }  // Player Two with 5 minutes
=======
        <div className="rightContainer">
          <div className="profileCard">
            <img
              className="profileImage"
              src={characterImageSrc}
              alt="Profile Image"
            />
          </div>{/* ... (Player's rightContainer content) */}
        </div>
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
  }, {
    name: 'Darth Vader',
    image: 'https://i.pinimg.com/originals/9f/9f/73/9f9f73b4b9b89101f9419241d64233d3.png'
  }
>>>>>>> Stashed changes
];
let currentPlayerIndex = 0;
let interval;

function toggleTimer() {
    if (!interval) {
        interval = setInterval(() => {
            players[currentPlayerIndex].timer--;
            updateTimerDisplay(`timerDisplay${currentPlayerIndex + 1}`, players[currentPlayerIndex].timer);

            if (players[currentPlayerIndex].timer === 0) {
                switchPlayer();
                resetTimer();
            }
        }, 1000);
    } else {
        clearInterval(interval);
        interval = null;
    }
}

function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    currentPlayer = currentPlayerIndex + 1;
}

function resetTimer() {
    players[currentPlayerIndex].timer = 300; // Reset to 5 minutes
}

function updateTimerDisplay(displayId, time) {
    const timerDisplayElement = document.getElementById(displayId);

    // Assuming timerDisplayElement is a valid DOM element
    if (timerDisplayElement) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplayElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}



export default Player;
