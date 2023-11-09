import './styles.css'
import { useState } from 'react';
import Player from './components/Player';
import Game from './components/Game';
import LandingPage from './components/LandingPage/LandingPage';
import BackgroundChanger from "./components/BackgroundChanger";

import Rules from "./components/Rules/Rules";
import RestartButton from "./components/RestartButton";
import Logo from './assets/white-logo.png'



export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1Character, setPlayer1Character] = useState(null);
  const [player2Character, setPlayer2Character] = useState(null);

  // Function to start the game when the Ready button is clicked
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        // Render the game components when the game has started

        <div>
          <BackgroundChanger />

      <div className='game-section'>
            <img src={Logo} alt="GOMOKU" />

          <section className="player-section">
            <Player playerNumber={1} selectedCharacter={player1Character} />
            <Player playerNumber={2} selectedCharacter={player2Character} />
          </section>

          <BackgroundChanger />

          <Game/>  
          <Rules/> 



        </div>
      ) : (
        // Render the LandingPage component until the Ready button is clicked
        <div>

          <LandingPage
            onReadyButtonClick={startGame}
            onSelectCharacter={(playerNumber, character) => {
              if (playerNumber === 1) {
                setPlayer1Character(character);
              } else if (playerNumber === 2) {
                setPlayer2Character(character);
              }
            }}
          />
        </div>
      )}

    </div>
  );
}
