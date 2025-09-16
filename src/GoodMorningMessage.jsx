import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Sun,
  Sparkles,
  MessageCircle,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Gift,
  Zap,
} from "lucide-react";

const GoodMorningMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [clickedHearts, setClickedHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [collectedStars, setCollectedStars] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const audioRef = useRef(null);

  const motivationalQuotes = [
    "You are my sunshine that brightens every morning! ☀️",
    "Every day with you is a new adventure waiting to unfold! 🌟",
    "Your smile is the fuel that powers my entire day! 💫",
    "Together, we can conquer anything life throws our way! 💪",
    "You make ordinary moments feel absolutely extraordinary! ✨",
    "Your love gives me wings to soar through any challenge! 🦋",
    "Every morning with you feels like Christmas morning! 🎁",
  ];

  const loveMessages = [
    "You're absolutely amazing! 💖",
    "I'm so lucky to have you! 🍀",
    "You light up my world! ✨",
    "You're my happy place! 🏡",
    "Forever grateful for you! 🙏",
    "You're simply magical! 🪄",
  ];
  useEffect(() => {
    setShowMessage(true);
    generateHearts();

    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;

      // Try autoplay immediately (may be blocked if not muted)
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked until user interaction.");
      });
    }

    // Enable sound after any user click
    const enableSound = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.log("Audio play failed:", e));
      }
      window.removeEventListener("click", enableSound);
    };
    window.addEventListener("click", enableSound);

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", enableSound);
    };
  }, []);

  useEffect(() => {
    setShowMessage(true);
    generateHearts();

    // Create audio element for background music
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const generateHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: Date.now() + i,
        left: Math.random() * 90 + 5,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 15 + Math.random() * 10,
        clickable: Math.random() > 0.7,
      });
    }
    setHearts(newHearts);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleHeartClick = (heartId, event) => {
    event.stopPropagation();
    if (!clickedHearts.includes(heartId)) {
      setClickedHearts([...clickedHearts, heartId]);
      setScore(score + 10);

      // Create explosion effect
      const explosion = document.createElement("div");
      explosion.innerHTML = "💖";
      explosion.style.position = "absolute";
      explosion.style.left = event.clientX + "px";
      explosion.style.top = event.clientY + "px";
      explosion.style.fontSize = "24px";
      explosion.style.pointerEvents = "none";
      explosion.style.zIndex = "1000";
      explosion.style.animation = "explode 1s ease-out forwards";
      document.body.appendChild(explosion);

      setTimeout(() => {
        document.body.removeChild(explosion);
      }, 1000);

      // Show random love message
      if (score > 0 && (score + 10) % 50 === 0) {
        showRandomMessage();
      }
    }
  };

  const showRandomMessage = () => {
    const randomMessage =
      loveMessages[Math.floor(Math.random() * loveMessages.length)];
    alert(randomMessage);
  };

  const handleSendMessage = () => {
    setShowSurprise(true);
    setTimeout(() => setShowSurprise(false), 3000);
    generateHearts();
    const messages = [
      "Your love has been sent across the universe! 🌌💕",
      "Message delivered with a million kisses! 😘💋",
      "Love packet transmitted successfully! 📡❤️",
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setClickedHearts([]);
    setCollectedStars(0);
    generateHearts();

    setTimeout(() => {
      setGameActive(false);
      alert(`Game Over! You collected ${score} love points! 💖`);
    }, 30000); // 30 second game
  };

  const collectStar = (starIndex) => {
    if (!collectedStars.toString().includes(starIndex)) {
      setCollectedStars((prev) => prev + 1);
      setScore((prev) => prev + 25);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: showSurprise
          ? "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        backgroundSize: showSurprise ? "400% 400%" : "cover",
        animation: showSurprise ? "rainbow 2s ease infinite" : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Background Music */}
      <audio ref={audioRef} src="/videoplayback.mp3" autoPlay muted />

      {/* Music Controls */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={toggleMusic}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50px",
            padding: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {isPlaying ? (
            <Pause size={20} color="#7c3aed" />
          ) : (
            <Play size={20} color="#7c3aed" />
          )}
        </button>
        <button
          onClick={toggleMute}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50px",
            padding: "12px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {isMuted ? (
            <VolumeX size={20} color="#dc2626" />
          ) : (
            <Volume2 size={20} color="#7c3aed" />
          )}
        </button>
      </div>

      {/* Score Display */}
      {gameActive && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "15px 20px",
            borderRadius: "25px",
            fontWeight: "bold",
            color: "#7c3aed",
            fontSize: "18px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          💖 Score: {score}
        </div>
      )}

      {/* Interactive floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          onClick={(e) =>
            gameActive && heart.clickable && handleHeartClick(heart.id, e)
          }
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            bottom: "-50px",
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
            opacity: clickedHearts.includes(heart.id) ? 0 : 0.8,
            cursor: gameActive && heart.clickable ? "pointer" : "default",
            transform:
              gameActive && heart.clickable ? "scale(1.2)" : "scale(1)",
            transition: "all 0.3s ease",
            zIndex: 10,
            userSelect: "none",
          }}
        >
          {heart.clickable && gameActive ? "💖" : "❤️"}
        </div>
      ))}

      {/* Main container */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "25px",
          padding: "40px 30px",
          maxWidth: "450px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transform: showMessage
            ? "translateY(0) scale(1)"
            : "translateY(50px) scale(0.9)",
          transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          opacity: showMessage ? 1 : 0,
          position: "relative",
        }}
      >
        {/* Header with sun icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          <Sun
            style={{
              width: "35px",
              height: "35px",
              color: "#ff6b6b",
              marginRight: "10px",
              animation: "pulse 2s ease-in-out infinite",
              cursor: "pointer",
            }}
            onClick={() => {
              setScore((prev) => prev + 5);
              alert("Sunshine bonus! +5 points! ☀️");
            }}
          />
          <h1
            style={{
              background: "linear-gradient(45deg, #4f46e5, #7c3aed, #dc2626)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: "bold",
              margin: 0,
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            Good Morning, My Beautiful Love!
          </h1>
        </div>

        {/* Main message */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "25px",
            color: "white",
            boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onClick={() => {
            alert("You clicked the main message! Here's a virtual hug! 🤗");
            setScore((prev) => prev + 15);
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <Heart
              style={{
                width: "24px",
                height: "24px",
                color: "#ff6b9d",
                marginRight: "8px",
                animation: "heartbeat 1.5s ease-in-out infinite",
              }}
            />
            <Sparkles
              style={{
                width: "24px",
                height: "24px",
                color: "#ffd93d",
                marginLeft: "8px",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "clamp(16px, 4vw, 20px)",
              lineHeight: "1.6",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Rise and shine, my amazing love! Today is another beautiful day to
            chase your dreams and make magic happen! 🌟
          </p>
        </div>

        {/* Rotating motivational quotes */}
        <div
          style={{
            background: "linear-gradient(135deg, #dc2626, #7c3aed)",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "25px",
            color: "white",
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 20px rgba(220, 38, 38, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={() => {
            setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
            setScore((prev) => prev + 5);
          }}
        >
          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 18px)",
              lineHeight: "1.5",
              margin: 0,
              fontStyle: "italic",
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
              textAlign: "center",
            }}
          >
            {motivationalQuotes[currentQuote]}
          </p>
        </div>

        {/* Interactive stars */}
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              onClick={() => collectStar(star)}
              style={{
                width: "20px",
                height: "20px",
                color: collectedStars >= star ? "#ffd93d" : "#ddd",
                cursor: "pointer",
                transition: "all 0.3s ease",
                animation: `twinkle 2s ease-in-out infinite ${star * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Game button */}
        <button
          onClick={startGame}
          disabled={gameActive}
          style={{
            background: gameActive
              ? "linear-gradient(135deg, #gray, #darkgray)"
              : "linear-gradient(135deg, #ff6b6b, #4ecdc4)",
            border: "none",
            borderRadius: "50px",
            padding: "15px 25px",
            color: "white",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            fontWeight: "bold",
            cursor: gameActive ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
            transition: "all 0.3s ease",
            boxShadow: "0 5px 15px rgba(255, 107, 107, 0.4)",
            width: "100%",
            maxWidth: "200px",
          }}
        >
          <Zap style={{ width: "18px", height: "18px", marginRight: "8px" }} />
          {gameActive ? "Playing..." : "Start Love Game!"}
        </button>

        {/* Send message button */}
        <button
          onClick={handleSendMessage}
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            border: "none",
            borderRadius: "50px",
            padding: "15px 30px",
            color: "white",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transition: "all 0.3s ease",
            boxShadow: "0 5px 15px rgba(79, 70, 229, 0.4)",
            width: "100%",
            maxWidth: "200px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(79, 70, 229, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 5px 15px rgba(79, 70, 229, 0.4)";
          }}
        >
          <MessageCircle
            style={{ width: "18px", height: "18px", marginRight: "8px" }}
          />
          Send My Love
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "clamp(12px, 3vw, 14px)",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          Made with endless love just for you 💕
          <br />
          <span style={{ fontSize: "10px" }}>
            {gameActive
              ? "Click the sparkling hearts! Tap anywhere for bonuses!"
              : 'Tap the "Start Love Game" to play!'}
          </span>
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(79, 70, 229, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(79, 70, 229, 0.6), 0 0 30px rgba(124, 58, 237, 0.4);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes explode {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
          }
        }
        
        @media (max-width: 480px) {
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default GoodMorningMessage;

