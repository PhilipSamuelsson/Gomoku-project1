
import '../player.css'

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
            </div>

            {/* <div id="gameContainer">
                <div id="playerTurn"></div>
                <button onClick={toggleTimer}>Toggle Timer</button>
            </div> */}
        </div>
    );
}

let players = [
    { timer: 300 }, // Player One with 5 minutes
    { timer: 300 }  // Player Two with 5 minutes
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
