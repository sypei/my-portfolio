"use client";

import { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  metrics: string;
  video: string;
  techColor: string;
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [touchedCard, setTouchedCard] = useState<string | null>(null);
  const [hasHover, setHasHover] = useState(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  // Fun emoji pool
  const emojis = [
    "💖",
    "👍",
    "🌟",
    "🎉",
    "🔥",
    "✨",
    "🎨",
    "🚀",
    "💫",
    "🌈",
    "🍦",
    "🎯",
    "💎",
    "🌸",
    "⚡",
    "🎪",
  ];

  useEffect(() => {
    setIsClient(true);
    setHasHover(window.matchMedia("(hover: hover)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Mobile touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    // Click effect handler
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;

      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        // TouchEvent
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }

      // Create random emoji effect
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const newEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        emoji: randomEmoji,
      };

      setClickEffects((prev) => [...prev, newEffect]);

      // Remove effect after animation completes
      setTimeout(() => {
        setClickEffects((prev) =>
          prev.filter((effect) => effect.id !== newEffect.id)
        );
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("touchend", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchend", handleClick);
    };
  }, []);

  const projects: Project[] = [
    {
      id: "embodied-exploration",
      title: "Embodied Exploration",
      description:
        "Facilitating Remote Accessibility Assessment for Wheelchair Users with VR",
      tech: ["C#", "Unity", "VR", "Accessibility"],
      metrics: "Published at ASSETS '23",
      video: "/embodiedexploration.mp4",
      techColor: "purple",
    },
    {
      id: "forcesight",
      title: "Forcesight",
      description: "Non-contact Force Sensing with Laser Speckle Imaging",
      tech: ["Python", "Computer Vision", "Sensors"],
      metrics: "<0.3N error, patented",
      video: "/forcesight.mp4",
      techColor: "green",
    },
    {
      id: "hand-interfaces",
      title: "Hand Interfaces",
      description:
        "Using Hands to Imitate Objects in AR/VR for Expressive Interactions",
      tech: ["C#", "C++", "Python", "AR/VR"],
      metrics: "53K views, Meta SDK adoption",
      video: "/handinterfaces.mp4",
      techColor: "blue",
    },
    {
      id: "ui-mobility",
      title: "UI Mobility Control in XR",
      description:
        "Switching UI Positionings between Static, Dynamic, and Self Entities",
      tech: ["C#", "Python", "Unity", "XR"],
      metrics: "Published at CHI '24",
      video: "/uimobility.mp4",
      techColor: "orange",
    },
  ];

  const handleCardHover = (cardId: string) => {
    if (hasHover) {
      setHoveredCard(cardId);
      setPlayingVideo(cardId);
    }
  };

  const handleCardLeave = () => {
    if (hasHover) {
      setHoveredCard(null);
      setPlayingVideo(null);
    }
  };

  const handleCardClick = (cardId: string) => {
    if (!hasHover) {
      // Mobile behavior
      if (touchedCard === cardId) {
        // Second tap - open project page in new tab
        window.open(`/projects/${cardId}`, "_blank");
      } else {
        // First tap - play video
        setTouchedCard(cardId);
        setPlayingVideo(cardId);
        setHoveredCard(cardId);

        // Auto-revert after 4 seconds
        setTimeout(() => {
          setTouchedCard(null);
          setPlayingVideo(null);
          setHoveredCard(null);
        }, 4000);
      }
    } else {
      // Desktop behavior - open in new tab
      window.open(`/projects/${cardId}`, "_blank");
    }
  };

  const getTechColorClass = (color: string) => {
    const colors = {
      purple: "bg-purple-200 text-purple-800",
      green: "bg-green-200 text-green-800",
      blue: "bg-blue-200 text-blue-800",
      orange: "bg-orange-200 text-orange-800",
    };
    return colors[color as keyof typeof colors] || "bg-gray-200 text-gray-800";
  };

  const activeCard = hoveredCard || touchedCard;

  return (
    <div className="min-h-screen bg-white text-black relative">
      {/* Click Effect Emojis */}
      {isClient &&
        clickEffects.map((effect) => (
          <div
            key={effect.id}
            className="fixed pointer-events-none z-50 text-2xl"
            style={{
              left: effect.x - 12,
              top: effect.y - 12,
              animation: "floatUp 1s ease-out forwards",
            }}
          >
            {effect.emoji}
          </div>
        ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) scale(1.2) rotate(10deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-60px) scale(0.8) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes breatheCircle {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.4;
          }
        }
      `}</style>

      {/* Main content */}
      <div
        className={`p-8 transition-opacity duration-300 ${
          activeCard ? "opacity-30" : "opacity-100"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">Siyou Pei</h1>
        <p className="text-xl">Software Engineer | PhD in ECE</p>
      </div>

      {/* Projects Grid */}
      <div className="p-8">
        <h2
          className={`text-3xl font-bold mb-8 text-center transition-opacity duration-300 ${
            activeCard ? "opacity-30" : "opacity-100"
          }`}
        >
          Featured Projects
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const isActiveCard = activeCard === project.id;
            const shouldDim = activeCard && !isActiveCard;

            return (
              <div
                key={project.id}
                className={`bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
                  isActiveCard
                    ? "z-20 relative transform scale-105"
                    : shouldDim
                    ? "opacity-30"
                    : "hover:shadow-xl"
                }`}
                onMouseEnter={() => handleCardHover(project.id)}
                onMouseLeave={handleCardLeave}
                onClick={() => handleCardClick(project.id)}
              >
                {/* Video/Image Container */}
                <div className="relative aspect-video bg-gray-100">
                  <video
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    ref={(el) => {
                      if (el) {
                        if (playingVideo === project.id) {
                          el.play();
                        } else {
                          el.pause();
                          el.currentTime = 0;
                        }
                      }
                    }}
                  >
                    <source src={project.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play button overlay for mobile - only show on client */}
                  {isClient && !hasHover && touchedCard !== project.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div
                  className={`p-6 transition-opacity duration-300 ${
                    isActiveCard ? "opacity-70" : "opacity-100"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 rounded text-sm ${getTechColorClass(
                          project.techColor
                        )}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-green-600 font-semibold">
                    {project.metrics}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mouse follower - only render on client */}
      {isClient && (
        <>
          <div
            className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50"
            style={{
              left: mousePosition.x - 8,
              top: mousePosition.y - 8,
              transition: "left 0.1s ease-out, top 0.1s ease-out",
              boxShadow:
                "0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)",
              filter: "blur(0.5px)",
              animation: "breathe 2s ease-in-out infinite",
            }}
          />

          <div
            className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none z-40"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
              transition: "left 0.2s ease-out, top 0.2s ease-out",
              animation: "breatheCircle 2.5s ease-in-out infinite",
            }}
          />
        </>
      )}
    </div>
  );
}
