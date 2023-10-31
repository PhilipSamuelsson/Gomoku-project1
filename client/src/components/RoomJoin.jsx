import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const RoomJoin = ({ onJoinRoom }) => {
    const [roomCode, setRoomCode] = useState('');

    const handleJoinRoom = () => {
        if (roomCode.trim() !== '') {
            onJoinRoom(roomCode);
        }
    };

    return (
        <div>
            <h2>Join a Room</h2>
            <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    );
};

RoomJoin.propTypes = {
    onJoinRoom: PropTypes.func.isRequired, // Prop validation for onJoinRoom
};

export default RoomJoin;
