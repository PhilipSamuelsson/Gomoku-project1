import { useState } from "react";
import PropTypes from "prop-types";
import "./readyButton.css";

export default function ReadyButton({ title, onReadyButtonClick }) {
  const [isActive, setIsActive] = useState(true);

  const onClick = () => {
    setIsActive(false);
    setTimeout(() => {
      // Call the callback function when the button is clicked
      onReadyButtonClick();
    }, 4000);
  };

  return (
    <div className="ready-button-content" onClick={onClick}>
      {isActive ? (
        <div className="ready-button-active">
          <p>{title}</p>
        </div>
      ) : (
        <div className="ready-button-inactive">
          <p>Finding an opponent</p>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
    </div>
  );
}

ReadyButton.propTypes = {
  title: PropTypes.string,
  onReadyButtonClick: PropTypes.func.isRequired, // Callback function prop
};
