import React, { useState, useEffect } from "react";

const ApologyMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingFlowers, setFloatingFlowers] = useState([]);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 375,
    height: typeof window !== "undefined" ? window.innerHeight : 667,
  });

  useEffect(() => {
    setIsVisible(true);

    // Handle screen resize
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Create floating flowers with mobile-friendly count
    const flowerCount = screenSize.width < 768 ? 6 : 12;
    const flowers = [];
    for (let i = 0; i < flowerCount; i++) {
      flowers.push({
        id: i,
        left: Math.random() * 90 + 5, // Keep within bounds
        top: Math.random() * 90 + 5,
        animationDelay: Math.random() * 5,
        size:
          screenSize.width < 768
            ? Math.random() * 0.3 + 0.4
            : Math.random() * 0.5 + 0.5,
        type: Math.floor(Math.random() * 3),
      });
    }
    setFloatingFlowers(flowers);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize.width]);

  const flowerEmojis = ["🌸", "💜", "🌺"];
  const isMobile = screenSize.width < 768;
  const isSmallMobile = screenSize.width < 480;
  const isVerySmallMobile = screenSize.width < 360;

  // Responsive JavaScript styling objects
  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #3730a3 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "15px 10px" : "20px",
      overflow: "hidden",
      position: "relative",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      boxSizing: "border-box",
    },

    floatingFlower: {
      position: "absolute",
      fontSize: isMobile ? "1.5rem" : "2rem",
      opacity: isMobile ? 0.15 : 0.2,
      animation: "bounce 4s infinite ease-in-out",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: 1,
    },

    card: {
      maxWidth: isMobile ? "100%" : "600px",
      width: "100%",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      borderRadius: isMobile ? "20px" : "30px",
      padding: isVerySmallMobile
        ? "25px 15px"
        : isSmallMobile
        ? "30px 20px"
        : isMobile
        ? "35px 25px"
        : "40px",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      textAlign: "center",
      transform: isVisible ? "translateY(0)" : "translateY(20px)",
      opacity: isVisible ? 1 : 0,
      transition: "all 1s ease-out",
      position: "relative",
      zIndex: 2,
      margin: "0 auto",
    },

    headerFlowers: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: isVerySmallMobile ? "10px" : isSmallMobile ? "15px" : "20px",
      marginBottom: isMobile ? "15px" : "20px",
      flexWrap: "wrap",
    },

    flowerLarge: {
      fontSize: isVerySmallMobile
        ? "2rem"
        : isSmallMobile
        ? "2.5rem"
        : isMobile
        ? "2.8rem"
        : "3rem",
      animation: "pulse 2s infinite",
      display: "inline-block",
    },

    flowerCenter: {
      fontSize: isVerySmallMobile
        ? "2.5rem"
        : isSmallMobile
        ? "3rem"
        : isMobile
        ? "3.5rem"
        : "4rem",
    },

    title: {
      fontSize: isVerySmallMobile
        ? "2rem"
        : isSmallMobile
        ? "2.5rem"
        : isMobile
        ? "3rem"
        : "3rem",
      fontWeight: "bold",
      color: "#f3e8ff",
      marginBottom: isMobile ? "8px" : "10px",
      textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
      background: "linear-gradient(90deg, #fce7f3, #e9d5ff, #c7d2fe)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: "1.2",
      wordBreak: "keep-all",
    },

    divider: {
      width: isVerySmallMobile ? "60px" : isSmallMobile ? "80px" : "100px",
      height: isMobile ? "3px" : "4px",
      background: "linear-gradient(90deg, #f472b6, #a855f7)",
      margin: `0 auto ${isMobile ? "20px" : "30px"}`,
      borderRadius: "2px",
    },

    messageLarge: {
      fontSize: isVerySmallMobile
        ? "1rem"
        : isSmallMobile
        ? "1.1rem"
        : isMobile
        ? "1.15rem"
        : "1.2rem",
      color: "#e9d5ff",
      lineHeight: isMobile ? "1.6" : "1.8",
      marginBottom: isMobile ? "20px" : "30px",
      textAlign: "center",
      padding: "0 5px",
    },

    messageMedium: {
      fontSize: isVerySmallMobile
        ? "0.9rem"
        : isSmallMobile
        ? "0.95rem"
        : isMobile
        ? "1rem"
        : "1rem",
      color: "#ddd6fe",
      lineHeight: isMobile ? "1.6" : "1.8",
      marginBottom: isMobile ? "18px" : "25px",
      textAlign: "center",
      padding: "0 5px",
    },

    flowerBorder: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: isVerySmallMobile ? "5px" : isSmallMobile ? "8px" : "10px",
      margin: `${isMobile ? "25px" : "40px"} 0`,
      flexWrap: "wrap",
    },

    flowerBorderItem: {
      fontSize: isVerySmallMobile
        ? "1.2rem"
        : isSmallMobile
        ? "1.3rem"
        : "1.5rem",
      animation: "pulse 2s infinite",
    },

    closing: {
      fontSize: isVerySmallMobile
        ? "1.1rem"
        : isSmallMobile
        ? "1.2rem"
        : isMobile
        ? "1.3rem"
        : "1.5rem",
      color: "white",
      fontWeight: "bold",
      marginBottom: isMobile ? "15px" : "20px",
      lineHeight: "1.3",
      padding: "0 10px",
    },

    hearts: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: isVerySmallMobile ? "8px" : "10px",
    },

    heartItem: {
      fontSize: isVerySmallMobile
        ? "1.5rem"
        : isSmallMobile
        ? "1.8rem"
        : "2rem",
      animation: "pulse 2s infinite",
    },

    heartCenter: {
      fontSize: isVerySmallMobile
        ? "2rem"
        : isSmallMobile
        ? "2.2rem"
        : "2.5rem",
      color: "#f9a8d4",
      animation: "pulse 2s infinite",
    },

    cornerFlower: {
      position: "absolute",
      fontSize: isMobile ? "2.5rem" : "4rem",
      opacity: isMobile ? 0.2 : 0.3,
      animation: "spin 10s linear infinite",
      zIndex: 1,
    },

    cornerFlowerTopLeft: {
      top: isMobile ? "10px" : "-20px",
      left: isMobile ? "10px" : "-20px",
    },

    cornerFlowerBottomRight: {
      bottom: isMobile ? "10px" : "-20px",
      right: isMobile ? "10px" : "-20px",
      animationDirection: "reverse",
      animationDuration: "15s",
    },
  };

  // Create responsive keyframe animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(${isMobile ? "1.05" : "1.1"});
          opacity: 0.7;
        }
      }
      
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(${isMobile ? "-10px" : "-15px"});
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(${isMobile ? "-5px" : "-8px"});
        }
      }
      
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
      /* Ensure smooth scrolling on mobile */
      @media (max-width: 767px) {
        body {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Prevent zoom on input focus */
        input, select, textarea {
          font-size: 16px !important;
        }
        
        /* Better touch targets */
        * {
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
      }
      
      /* Ultra-small devices (Galaxy Fold, etc.) */
      @media (max-width: 320px) {
        .ultra-small-text {
          font-size: 0.85rem !important;
        }
      }
      
      /* Landscape orientation adjustments */
      @media (max-height: 500px) and (orientation: landscape) {
        .landscape-container {
          padding: 10px !important;
        }
        
        .landscape-card {
          padding: 20px 15px !important;
        }
        
        .landscape-title {
          font-size: 1.8rem !important;
          margin-bottom: 5px !important;
        }
        
        .landscape-message {
          font-size: 0.9rem !important;
          margin-bottom: 12px !important;
        }
        
        .landscape-flowers {
          margin: 15px 0 !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, [isMobile]);

  return (
    <div
      style={styles.container}
      className={screenSize.height < 500 ? "landscape-container" : ""}
    >
      {/* Floating flowers background */}
      {floatingFlowers.map((flower) => (
        <div
          key={flower.id}
          style={{
            ...styles.floatingFlower,
            left: `${flower.left}%`,
            top: `${flower.top}%`,
            animationDelay: `${flower.animationDelay}s`,
            fontSize: `${flower.size * 2}rem`,
          }}
        >
          {flowerEmojis[flower.type]}
        </div>
      ))}

      {/* Main content */}
      <div
        style={styles.card}
        className={screenSize.height < 500 ? "landscape-card" : ""}
      >
        {/* Header with large flowers */}
        <div style={styles.headerFlowers}>
          <span
            style={{
              ...styles.flowerLarge,
              animationDelay: "0s",
            }}
          >
            🌸
          </span>
          <span
            style={{
              ...styles.flowerLarge,
              ...styles.flowerCenter,
              animationDelay: "0.5s",
            }}
          >
            💜
          </span>
          <span
            style={{
              ...styles.flowerLarge,
              animationDelay: "1s",
            }}
          >
            🌺
          </span>
        </div>

        <h1
          style={styles.title}
          className={`${screenSize.height < 500 ? "landscape-title" : ""} ${
            isVerySmallMobile ? "ultra-small-text" : ""
          }`}
        >
          I'm Sorry
        </h1>

        <div style={styles.divider}></div>

        {/* Message content */}
        <div>
          <p
            style={styles.messageLarge}
            className={`${screenSize.height < 500 ? "landscape-message" : ""} ${
              isVerySmallMobile ? "ultra-small-text" : ""
            }`}
          >
            I deeply regret my actions and the hurt I've caused you.
          </p>

          <p
            style={styles.messageMedium}
            className={`${screenSize.height < 500 ? "landscape-message" : ""} ${
              isVerySmallMobile ? "ultra-small-text" : ""
            }`}
          >
            Your feelings matter to me more than words can express, and I take
            full responsibility for my mistakes. I understand that saying sorry
            is just the beginning, and I'm committed to making things right.
          </p>

          <p
            style={styles.messageMedium}
            className={`${screenSize.height < 500 ? "landscape-message" : ""} ${
              isVerySmallMobile ? "ultra-small-text" : ""
            }`}
          >
            Please know that you mean the world to me, and I hope you can find
            it in your heart to forgive me. I promise to do better and learn
            from this experience.
          </p>
        </div>

        {/* Decorative flower border */}
        <div
          style={styles.flowerBorder}
          className={screenSize.height < 500 ? "landscape-flowers" : ""}
        >
          {[...Array(isMobile ? 5 : 7)].map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.flowerBorderItem,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "💜" : "🌺"}
            </span>
          ))}
        </div>

        {/* Bottom message */}
        <div>
          <p
            style={styles.closing}
            className={`${screenSize.height < 500 ? "landscape-message" : ""} ${
              isVerySmallMobile ? "ultra-small-text" : ""
            }`}
          >
            With all my love and sincere apologies
          </p>

          {/* Heart with flowers */}
          <div style={styles.hearts}>
            <span style={styles.heartItem}>🌸</span>
            <span
              style={{
                ...styles.heartCenter,
                animationDelay: "0.5s",
              }}
            >
              💕
            </span>
            <span
              style={{
                ...styles.heartItem,
                animationDelay: "1s",
              }}
            >
              🌺
            </span>
          </div>
        </div>
      </div>

      {/* Additional floating elements - hidden on very small screens */}
      {!isVerySmallMobile && (
        <>
          <div
            style={{
              ...styles.cornerFlower,
              ...styles.cornerFlowerTopLeft,
            }}
          >
            🌸
          </div>
          <div
            style={{
              ...styles.cornerFlower,
              ...styles.cornerFlowerBottomRight,
            }}
          >
            🌺
          </div>
        </>
      )}
    </div>
  );
};

export default ApologyMessage;
