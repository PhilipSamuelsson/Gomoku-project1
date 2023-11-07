import { useState } from "react";
import bakgrund1 from "../assets/backgrounds/bakgrund1.jpg";
import bakgrund2 from "../assets/backgrounds/bakgrund2.jpg";
import bakgrund3 from "../assets/backgrounds/bakgrund3.jpg";
import bakgrund4 from "../assets/backgrounds/bakgrund4.jpg";
import bakgrund5 from "../assets/backgrounds/bakgrund5.jpg";
import bakgrund6 from "../assets/backgrounds/bakgrund6.jpg";
import bakgrund7 from "../assets/backgrounds/bakgrund7.jpg";
import bakgrund8 from "../assets/backgrounds/bakgrund8.jpg";
import ChangeButton from "./BgButton";

const backgrounds = [
  bakgrund1,
  bakgrund2,
  bakgrund3,
  bakgrund4,
  bakgrund5,
  bakgrund6,
  bakgrund7,
  bakgrund8,
];

const BackgroundChanger = () => {
  const [currentBackground, setCurrentBackground] = useState(1);

  const changeBackground = () => {
    console.log("Current background:", currentBackground);
    const newBackground = (currentBackground % backgrounds.length) + 1;
    console.log("New background:", newBackground);
    setCurrentBackground(newBackground);
  };

  return (
    <div className="background-changer-container">
      <div
        className="background-changer"
        style={{
          backgroundImage: `url(${backgrounds[currentBackground - 1]})`,
        }}
      />
      <ChangeButton onClick={changeBackground} />
    </div>
  );
};

export default BackgroundChanger;
