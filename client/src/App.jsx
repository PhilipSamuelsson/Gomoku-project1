import './styles.css'
<<<<<<< Updated upstream
import Player from './components/Player'
import Game from './components/Game'
import Navbar from './components/Navbar'

export default function App() {
    return (
        <div className="App">
            <Navbar />
            <Player />
            <Game />
            {/* Render the Game component here */}
            {/* Add other components or content as needed */}
        </div>
    )
=======
import { useState } from 'react';
import Player from './components/Player';
import Game from './components/Game';
import LandingPage from './components/LandingPage/LandingPage';
import BackgroundChanger from "./components/BackgroundChanger";
import Rules from "./components/Rules/Rules";
import RestartButton from "./components/RestartButton";

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
          <BackgroundChanger />
          <section className="player-section">
            <Player playerNumber={1} />
            <Player playerNumber={2} />
          </section>
          <Game>  <Rules /> </Game>
        </div>
      ) : (
        // Render the LandingPage component until the Ready button is clicked
        <div>

          <LandingPage onReadyButtonClick={startGame} />
        </div>)
      }
    </div>
  );
>>>>>>> Stashed changes
}
