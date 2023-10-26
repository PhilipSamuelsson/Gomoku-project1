import PropTypes from "prop-types";
import { useState } from "react";
import "./readyButton.css";

export default function ReadyButton({ title }) {
  const [isActive, setIsActive] = useState(true);
  return (
    <div
      className="ready-button-content"
      onClick={() => setIsActive(false)}
    >
      {isActive ? (
        <div className="ready-button-active">
          <p>{title}</p>
        </div>
      ) : (
        <div className="ready-button-inactive">
          <p>Finding an opponent... </p>
        </div>
      )}
    </div>
  );
}

ReadyButton.propTypes = {
  title: PropTypes.string,
};
