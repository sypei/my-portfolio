"use client";

import { useState, useEffect } from "react";
import Link from 'next/link'

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  metrics: string;
  video: string;
  techColor: string;
  labels: string[]; // Added labels for filtering
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // New state for filters
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Fun emoji pool
    const emojis = ['💖', '👍', '🌟', '🎉', '🔥', '✨', '🎨', '🚀', '💫', '🌈', '🍦', '🎯', '💎', '🌸', '⚡', '🎪']

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
      metrics: "Published at ASSETS &apos;23",
      video: "/embodiedexploration.mp4",
      techColor: "purple",
      labels: ["XR", "Unity", "C#", "Accessibility"],
    },
    {
      id: "forcesight",
      title: "Forcesight",
      description: "Non-contact Force Sensing with Laser Speckle Imaging",
      tech: ["Python", "Computer Vision", "Sensors"],
      metrics: "<0.3N error, patented",
      video: "/forcesight.mp4",
      techColor: "green",
      labels: ["Applied AI/ML", "XR", "Python"],
    },
    {
      id: "hand-interfaces",
      title: "Hand Interfaces",
      description:
        "Using Hands to Imitate Objects in AR/VR for Expressive Interactions",
      tech: ["C#", "C/C++", "Python", "XR"],
      metrics: "53K views, Meta SDK adoption",
      video: "/handinterfaces.mp4",
      techColor: "blue",
      labels: ["XR", "C#", "C/C++", "Python"],
    },
    {
      id: "ui-mobility",
      title: "UI Mobility Control in XR",
      description:
        "Switching UI Positionings between Static, Dynamic, and Self Entities",
      tech: ["C#", "Python", "Unity", "XR"],
      metrics: "Published at CHI &apos;24",
      video: "/uimobility.mp4",
      techColor: "orange",
      labels: ["XR", "C#", "Python"],
    },
    {
      id: "haptic-muscle-skin",
      title: "Haptic Artificial Muscle Skin",
      description: "Artificial muscle skin system for haptic feedback in Extended Reality",
      tech: ['C#', 'C/C++', 'Hardware', 'Haptics'],
      metrics: "Published in Science Advances",
      video: "/haptic-skin.mp4",
      techColor: "red",
      labels: ["XR", "C#", "C/C++", "Hardware"],
    },
    {
      id: "wheelpose",
      title: "WheelPose",
      description: "Data Synthesis Techniques to Improve Pose Estimation Performance on Wheelchair Users",
      tech: ["Python", "C#", "Applied AI/ML", "Computer Vision"],
      metrics: "Published at CHI &apos;24",
      video: "/wheelpose.mp4",
      techColor: "teal",
      labels: ["Applied AI/ML", "Python", "C#", "Accessibility"],
    },
    {
      id: "auritus",
      title: "Auritus",
      description: "Open-source optimization toolkit for training human movement models using earables",
      tech: ["Python", "C/C++", "Applied AI/ML", "IoT"],
      metrics: "Published at IMWUT &apos;22",
      video: "/auritus.jpg", // Changed to image file
      techColor: "indigo",
      labels: ["Applied AI/ML", "Python", "C/C++", "Hardware"],
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

  const activeCard = hoveredCard || touchedCard;

  // Define which labels to show as global filters
  const globalFilters = ["XR", "Applied AI/ML", "C#", "C/C++", "Python"];

  // Filter projects based on selected filters
  const filteredProjects = selectedFilters.length === 0 
    ? projects 
    : projects.filter(project => 
        selectedFilters.some(filter => project.labels.includes(filter))
      );

  // Handle filter toggle
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

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

      {/* Navigation Bar */}
      <nav className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 fixed top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Name */}
            <Link href="/" className="font-bold text-lg sm:text-xl text-black hover:text-gray-700 transition-colors">
              <span className="hidden sm:inline">Siyou Pei | Software Engineer & Researcher</span>
              <span className="sm:hidden">Siyou Pei</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">About</Link>
              <Link href="/" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">Portfolio</Link>
              <Link href="/resume" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">Resume</Link>        
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  // X icon when menu is open
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Desktop Social Links */}
            <div className="hidden md:flex space-x-4">
              <a href="https://linkedin.com/in/sypei" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/SiyouPei" target="_blank" rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                title="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://scholar.google.be/citations?user=WZd4DYAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                title="Google Scholar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM5 13.18l7 3.82 7-3.82V18L12 21.82 5 18v-4.82z"/>
                </svg>
              </a>
              <a href="https://github.com/sypei" target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-900 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                {/* Mobile Navigation Links */}
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-black transition-colors p-3 rounded-lg hover:bg-gray-100 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-black transition-colors p-3 rounded-lg hover:bg-gray-100 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link 
                  href="/resume" 
                  className="text-gray-700 hover:text-black transition-colors p-3 rounded-lg hover:bg-gray-100 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume
                </Link>
                
                {/* Mobile Social Links */}
                <div className="flex justify-center space-x-6 pt-4 border-t border-gray-100 mt-4">
                  <a href="https://linkedin.com/in/sypei" target="_blank" rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                    title="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/SiyouPei" target="_blank" rel="noopener noreferrer" 
                    className="text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                    title="X (Twitter)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://scholar.google.be/citations?user=WZd4DYAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                    title="Google Scholar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM5 13.18l7 3.82 7-3.82V18L12 21.82 5 18v-4.82z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/sypei" target="_blank" rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-900 transition-colors p-2 rounded-lg hover:bg-gray-100" 
                    title="GitHub">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Main content - add top padding for fixed nav */}
      <div className={`pt-20 p-8 transition-opacity duration-300 ${activeCard ? 'opacity-30' : 'opacity-100'}`}>
      
      </div>
     
      {/* Projects Grid */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Filter Tags - responsive layout */}
        <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {/* All filter */}
            <button
              onClick={() => setSelectedFilters([])}
              className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${
                selectedFilters.length === 0
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({projects.length})
            </button>
            
            {/* Individual filter tags */}
            {globalFilters.map((filter) => {
              const count = projects.filter(p => p.labels.includes(filter)).length;
              const isSelected = selectedFilters.includes(filter);
              
              return (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 sm:px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {filter} ({count})
                </button>
              );
            })}
          </div>
          
          {/* Filter summary - responsive text */}
          <div className="text-center mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            {selectedFilters.length > 0 ? (
              <p>Showing {filteredProjects.length} projects with: {selectedFilters.join(', ')}</p>
            ) : (
              <p>Showing all {projects.length} projects</p>
            )}
          </div>
        </div>

        {/* Responsive Grid Container - Option 1 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project) => {
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
                {/* Video/Image Container - responsive aspect ratio */}
                <div className="relative aspect-video bg-gray-100">
                  {project.video.endsWith('.mp4') ? (
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
                  ) : (
                    <img
                      src={project.video}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Play button overlay for mobile - responsive size */}
                  {isClient && !hasHover && touchedCard !== project.id && project.video.endsWith('.mp4') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-6 sm:border-l-8 border-l-black border-t-3 sm:border-t-4 border-t-transparent border-b-3 sm:border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content - responsive padding and typography */}
                <div className={`p-4 sm:p-5 md:p-6 transition-opacity duration-300 ${
                  isActiveCard ? "opacity-70" : "opacity-100"
                }`}>
                  {/* Title - responsive text size */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  
                  {/* Description - responsive text */}
                  <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>

                  {/* COMBINED Technologies & Categories - replaces both old sections */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {[...new Set([
                      ...(project.tech || []), 
                      ...(project.labels || [])
                    ])]
                      .filter(Boolean)
                      .sort()
                      .map((tag) => {
                        const getTagColor = (tag: string) => {
                          if (['C#', 'C++', 'Python', 'JavaScript'].includes(tag)) {
                            return 'bg-blue-200 text-blue-800';
                          }
                          if (['Unity', 'React', 'Next.js', 'TensorFlow'].includes(tag)) {
                            return 'bg-purple-200 text-purple-800';
                          }
                          if (['VR', 'AR', 'XR', 'Computer Vision', 'Machine Learning', 'Applied AI/ML'].includes(tag)) {
                            return 'bg-green-200 text-green-800';
                          }
                          if (['Hardware', 'Sensors', 'Haptics', 'IoT'].includes(tag)) {
                            return 'bg-orange-200 text-orange-800';
                          }
                          if (['Research', 'HCI', 'Accessibility', 'Sensing'].includes(tag)) {
                            return 'bg-teal-200 text-teal-800';
                          }
                          return 'bg-gray-200 text-gray-800';
                        };

                        return (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 ${getTagColor(tag)}`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                  </div>

                  {/* Metrics - responsive text */}
                  <div className="text-green-600 font-semibold text-sm sm:text-base">
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