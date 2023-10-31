// Parent component
import RoomJoin from './RoomJoin';

const ParentComponent = () => {
    const handleJoinRoom = (roomCode) => {
        // Handle room joining here
        console.log(`Joining room: ${roomCode}`);
    };

    return (
        <div>
            <h1>My App</h1>
            <RoomJoin onJoinRoom={handleJoinRoom} />
        </div>
    );
};

export default ParentComponent;
