import React from "react";
import "./ScrollDownButton.module.css";

const ScrollDownButton = () => {
  const handleScroll = () => {
    const lowerSection = document.getElementById("lower-section");
    if (lowerSection) {
      lowerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="scroll-button-container">
      <button className="scroll-button" onClick={handleScroll}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="scroll-icon"
        >
          <path d="M12 18a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 1.414-1.414L12 15.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5A1 1 0 0 1 12 18z" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollDownButton;
