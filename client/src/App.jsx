import './styles.css'
import { useState } from 'react';
import Player from './components/Player';
import Game from './components/Game';
import LandingPage from './components/LandingPage/LandingPage';
import BackgroundChanger from "./components/BackgroundChanger";
import Rules from "./components/Rules/Rules";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  // Function to start the game when the Ready button is clicked
  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {gameStarted ? (
        // Render the game components when the game has started
        <div>
          <section className="player-section">
            <Player playerNumber={1} />
            <Player playerNumber={2} />
          </section>
          <BackgroundChanger />
          <Game>  <Rules/> </Game>

        </div>
      ) : (
        // Render the LandingPage component until the Ready button is clicked
        <div>

        <LandingPage onReadyButtonClick={startGame} />
      </div>)
      }
    </div>
  );
}
