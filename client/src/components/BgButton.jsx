import React from "react";
import edit from "../assets/edit-image.png";

const BgButton = ({ onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <div className="icon-wrapper">
        <img src={edit} alt="Byt bakgrund" className="icon" />
      </div>
    </button>
  );
};

export default BgButton;
