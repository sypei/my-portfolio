"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  metrics: string;
  video: string;
  images: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  github?: string;
  demo?: string;
  publication?: string;
}

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [isClient, setIsClient] = useState(false);
  const [projectId, setProjectId] = useState<string>("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    if (params.id) {
      setProjectId(params.id as string);
    }

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
  }, [params.id]);

  // Project details data - make sure IDs match exactly with main page
  const projectDetails: Record<string, ProjectDetail> = {
    "embodied-exploration": {
      id: "embodied-exploration",
      title: "Embodied Exploration",
      description:
        "Facilitating Remote Accessibility Assessment for Wheelchair Users with VR",
      fullDescription:
        "This project explores how virtual reality can be used to conduct remote accessibility assessments for wheelchair users. By creating immersive virtual environments, we enable researchers and accessibility experts to evaluate spaces without requiring physical presence.",
      tech: ["C#", "Unity", "VR", "Accessibility"],
      metrics: "Published at ASSETS '23",
      video: "/embodiedexploration.mp4",
      images: ["/project1-1.jpg", "/project1-2.jpg"],
      challenges: [
        "Creating realistic wheelchair physics in VR",
        "Designing intuitive VR controls for accessibility research",
        "Ensuring accuracy of remote assessments",
      ],
      solutions: [
        "Implemented physics-based wheelchair simulation",
        "Developed custom VR interaction framework",
        "Validated measurements against real-world data",
      ],
      results: [
        "Published at ASSETS 2023",
        "95% accuracy in accessibility measurements",
        "Reduced assessment time by 60%",
      ],
      publication: "https://dl.acm.org/doi/10.1145/3597638.3608384",
    },
    forcesight: {
      id: "forcesight",
      title: "Forcesight",
      description: "Non-contact Force Sensing with Laser Speckle Imaging",
      fullDescription:
        "Forcesight introduces a novel approach to force sensing using laser speckle patterns. This non-contact method enables high-precision force measurements without physical sensors.",
      tech: ["Python", "Computer Vision", "Sensors"],
      metrics: "<0.3N error, patented",
      video: "/forcesight.mp4",
      images: ["/project2-1.jpg", "/project2-2.jpg"],
      challenges: [
        "Achieving sub-Newton force detection accuracy",
        "Real-time speckle pattern processing",
        "Robust performance under varying lighting",
      ],
      solutions: [
        "Advanced computer vision algorithms",
        "GPU-accelerated image processing",
        "Adaptive calibration system",
      ],
      results: [
        "Patent filed (WO2024030827A3)",
        "<0.3N force detection accuracy",
        "Best Demo Award at conference",
      ],
      github: "https://github.com/your-repo/forcesight",
    },
    "hand-interfaces": {
      id: "hand-interfaces",
      title: "Hand Interfaces",
      description:
        "Using Hands to Imitate Objects in AR/VR for Expressive Interactions",
      fullDescription:
        "Hand Interfaces enables users to use their bare hands to imitate and interact with virtual objects in AR/VR environments, creating more natural and expressive interactions.",
      tech: ["C#", "C++", "Python", "AR/VR"],
      metrics: "53K views, Meta SDK adoption",
      video: "/handinterfaces.mp4",
      images: ["/project3-1.jpg", "/project3-2.jpg"],
      challenges: [
        "Real-time hand tracking accuracy",
        "Object recognition and mapping",
        "Cross-platform compatibility",
      ],
      solutions: [
        "Machine learning hand pose estimation",
        "Dynamic gesture recognition system",
        "Unified AR/VR framework",
      ],
      results: [
        "53K views on social media",
        "Adopted in Meta SDK",
        "Published at CHI 2022",
      ],
      demo: "https://your-demo.com/hand-interfaces",
    },
    "ui-mobility": {
      id: "ui-mobility",
      title: "UI Mobility Control in XR",
      description:
        "Switching UI Positionings between Static, Dynamic, and Self Entities",
      fullDescription:
        "This research explores different UI positioning strategies in extended reality environments, investigating how interface mobility affects user experience and task performance.",
      tech: ["C#", "Python", "Unity", "XR"],
      metrics: "Published at CHI '24",
      video: "/uimobility.mp4",
      images: ["/project4-1.jpg", "/project4-2.jpg"],
      challenges: [
        "Optimizing UI positioning for different tasks",
        "Minimizing motion sickness",
        "Balancing accessibility and performance",
      ],
      solutions: [
        "Adaptive UI positioning algorithms",
        "User preference learning system",
        "Performance optimization techniques",
      ],
      results: [
        "Published at CHI 2024",
        "6x performance improvement",
        "26K views on research findings",
      ],
      publication: "https://dl.acm.org/doi/10.1145/3613904.3642734",
    },
  };

  // Show loading state until client-side is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  const project = projectDetails[projectId];

  // Temporary debugging - remove this later
  console.log("Project ID from URL:", projectId);
  console.log("Available project keys:", Object.keys(projectDetails));
  console.log("Found project:", project);

  // Show debug info on screen temporarily
  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
          <p>Project ID from URL: {projectId}</p>
          <p>Available keys: {Object.keys(projectDetails).join(", ")}</p>
          <p>Params object: {JSON.stringify(params)}</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mt-4 block"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-black"
      suppressHydrationWarning={true}
    >
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

      {/* Header */}
      <div className="bg-gray-50 py-8 px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600">{project.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-8">
        {/* Video */}
        <div className="mb-12">
          <video className="w-full rounded-lg shadow-lg" controls muted loop>
            <source src={project.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {project.fullDescription}
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Challenges, Solutions, Results */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <section>
            <h3 className="text-xl font-bold mb-4 text-red-600">Challenges</h3>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700">
                  • {challenge}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Solutions</h3>
            <ul className="space-y-2">
              {project.solutions.map((solution, index) => (
                <li key={index} className="text-gray-700">
                  • {solution}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-green-600">Results</h3>
            <ul className="space-y-2">
              {project.results.map((result, index) => (
                <li key={index} className="text-gray-700">
                  • {result}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Links */}
        <section className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Links</h2>
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Live Demo
              </a>
            )}
            {project.publication && (
              <a
                href={project.publication}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Read Publication
              </a>
            )}
          </div>
        </section>
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
