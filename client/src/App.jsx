import { useState } from 'react';
import Game from './components/Game';
import RoomJoin from './components/RoomJoin';

const App = () => {
    const [joinedRoom, setJoinedRoom] = useState(null);
    const [waitingForPlayer, setWaitingForPlayer] = useState(false);

    const handleJoinRoom = (roomCode) => {
        setWaitingForPlayer(true);
        // You can handle the room joining here, for example, by updating state
        setJoinedRoom(roomCode);
    };

    return (
        <div>
            <h1>Online Gomoku Game</h1>
            {waitingForPlayer ? (
                <p>Waiting for another player...</p>
            ) : joinedRoom ? (
                <Game roomCode={joinedRoom} />
            ) : (
                <RoomJoin onJoinRoom={handleJoinRoom} />
            )}
        </div>
    );
};

export default App;
