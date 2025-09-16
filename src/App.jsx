import React, { useState, useEffect } from "react";
import GoodMorningMessage from "./GoodMorningMessage";

const App = () => {
  const [started, setStarted] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (started) {
    return <GoodMorningMessage />;
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `${windowHeight}px`,
    width: `${windowWidth}px`,
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    fontFamily: "Arial, sans-serif",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    textAlign: "center",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
  };

  const buttonStyle = {
    padding: "15px 40px",
    fontSize: "clamp(16px, 5vw, 24px)",
    border: "none",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#333333",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const handleHover = (e, enter) => {
    e.target.style.transform = enter ? "scale(1.05)" : "scale(1)";
    e.target.style.boxShadow = enter
      ? "0 8px 20px rgba(0,0,0,0.3)"
      : "0 5px 15px rgba(0,0,0,0.2)";
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
        onClick={() => setStarted(true)}
      >
        Enter
      </button>
    </div>
  );
};

export default App;
