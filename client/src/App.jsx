import "./styles.css";
import Player from "./components/Player";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import BackgroundChanger from "./components/BackgroundChanger";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Player />
      <BackgroundChanger />
      <Game />
      {/* Render the Game component here */}
      {/* Add other components or content as needed */}
    </div>
  );
}
