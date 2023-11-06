import './styles.css'
import Player from './components/Player'
import Game from './components/Game'
import Navbar from './components/Navbar'

export default function App() {
    return (
        <div className="App">
            <Navbar />
            <Player playerNumber={1}/>
            <Player playerNumber={2}/>
            <Game />
            {/* Render the Game component here */}
            {/* Add other components or content as needed */}
        </div>
    )
}
