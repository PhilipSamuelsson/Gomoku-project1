import { useState, useEffect } from "react"

function WinnerModule(props) {
    const [message, setMessage] = useState({});
    const [randomMessageKey, setRandomMessageKey] = useState(null);

    useEffect(() => {

        fetch('../../public/message.json')
            .then((response) => response.json())
            .then((data) => {
                setMessage(data);

                const randomKeys = Object.keys(data).sort(() => Math.random() - 0.5);
                setRandomMessageKey(randomKeys[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="Winner-container">
            <div className="Inner-container">
            <h1 className="Winner-header">
                Winner {props.winner}</h1>
            {randomMessageKey && (
                <p className="Winner-text">{message[randomMessageKey]}</p>
            )}
            <button className="Winner-button" onClick={props.restartGame}>New Game</button>
            </div>
        </div>
    )
}

export default WinnerModule;
