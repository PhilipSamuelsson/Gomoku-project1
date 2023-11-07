import { useState } from "react";
import PropTypes from "prop-types";
import "./readyButton.css";

export default function ReadyButton({ title }) {
  const [isActive, setIsActive] = useState(true);

  const onClick = () => {
    setIsActive(false);
    setTimeout( () => {alert("Match funnen!")}, 4000)

  };

  return (
    <div className="ready-button-content" onClick={onClick}>
      {isActive ? (
        <div className="ready-button-active">
          <p>{title}</p>
        </div>
      ) : (
        <div className="ready-button-inactive">
          <p>Finding an opponent </p>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      )}
    </div>
  );
}

ReadyButton.propTypes = {
  title: PropTypes.string,
};
