import { useState, useEffect } from 'react';
import Game from './components/Game';
import RoomJoin from './components/RoomJoin';
import './styles.css'

const App = () => {
    const [joinedRoom, setJoinedRoom] = useState(null);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if (joinedRoom) {
            const ws = new WebSocket('ws://localhost:8080');
            setWs(ws);

            ws.onopen = () => {
                ws.send(JSON.stringify({ type: 'create-or-join-room', roomCode: String(joinedRoom) }));
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return () => {
                ws.close();
            };
        }
    }, [joinedRoom]);

    const handleJoinRoom = (roomCode) => {
        setJoinedRoom(roomCode);
    };

    return (
        <div>
            <h1>Online Gomoku Game</h1>
            {joinedRoom && ws ? (
                <Game roomCode={joinedRoom} ws={ws} />
            ) : (
                <RoomJoin onJoinRoom={handleJoinRoom} />
            )}
        </div>
    );
};

export default App;
