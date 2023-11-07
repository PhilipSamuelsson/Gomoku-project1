
import ReadyButton from "../ReadyButton/ReadyButton";
import Rules from "../Rules/Rules";
import "./landingPage.css";
import Logo from "./white-logo.png";
import PropTypes from "prop-types"; // Import PropType
import Player from "../Player";

export default function LandingPage({ onReadyButtonClick }) {
  return (
    <div className="landing-page-content">
      <div className="landing-page-background">
        <div className="landing-page-logo">
          <img src={Logo} alt="GOMOKU" />
        </div>
        <section className="player-section">
        <Player playerNumber={1} />
        <Player playerNumber={2} />
      </section>
        {/* Pass the onReadyButtonClick prop to the ReadyButton component */}
        <ReadyButton title="Start Game" onReadyButtonClick={onReadyButtonClick} />
      </div>
      <Rules />
    </div>
  );
}

LandingPage.propTypes = {
    onReadyButtonClick: PropTypes.func.isRequired, // Validate the onReadyButtonClick prop
  };
