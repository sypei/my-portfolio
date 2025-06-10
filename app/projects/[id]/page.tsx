'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ProjectDetail {
  id: string
  title: string
  description: string
  fullDescription: string
  tech: string[]
  metrics: string
  video: string
  images: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  github?: string
  paper?: string
  videoPreview?: string // YouTube link for main video
  videoPresentation?: string // YouTube link for presentation
}

interface ClickEffect {
  id: number
  x: number
  y: number
  emoji: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [isClient, setIsClient] = useState(false)
  const [projectId, setProjectId] = useState<string>('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])
  

  // Fun emoji pool
  const emojis = ['💖', '👍', '🌟', '🎉', '🔥', '✨', '🎨', '🚀', '💫', '🌈', '🍦', '🎯', '💎', '🌸', '⚡', '🎪']

  useEffect(() => {
    setIsClient(true)
    if (params.id) {
      setProjectId(params.id as string)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Mobile touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        setMousePosition({ x: touch.clientX, y: touch.clientY })
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        setMousePosition({ x: touch.clientX, y: touch.clientY })
      }
    }

    // Click effect handler
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY
      
      if (e instanceof MouseEvent) {
        clientX = e.clientX
        clientY = e.clientY
      } else {
        // TouchEvent
        clientX = e.changedTouches[0].clientX
        clientY = e.changedTouches[0].clientY
      }

      // Create random emoji effect
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      const newEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        emoji: randomEmoji
      }

      setClickEffects(prev => [...prev, newEffect])

      // Remove effect after animation completes
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('click', handleClick)
    window.addEventListener('touchend', handleClick, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchend', handleClick)
    }
  }, [params.id])

  // Project details data - make sure IDs match exactly with main page
  const projectDetails: Record<string, ProjectDetail> = {
    'embodied-exploration': {
      id: 'embodied-exploration',
      title: 'Embodied Exploration',
      description: 'Facilitating Remote Accessibility Assessment for Wheelchair Users with VR',
      fullDescription: 'Embodied Exploration is a Virtual Reality technique for wheelchair users to evaluate accessibility remotely. It delivers the experience of a physical visit while keeping the convenience of remote assessment. We validated the efficacy of Embodied Exploration against photo galleries and virtual tours through user studies.',
      tech: ['C#', 'Unity', 'VR', 'Accessibility'],
      metrics: 'Published at ASSETS \'23',
      video: '/embodiedexploration.mp4',
      images: ['/project1-1.jpg', '/project1-2.jpg'],
      challenges: [
        'Creating realistic wheelchair physics in VR',
        'Designing intuitive VR controls for accessibility research',
        'Ensuring accuracy of remote assessments'
      ],
      solutions: [
        'Implemented physics-based wheelchair simulation',
        'Developed custom VR interaction framework',
        'Validated measurements against real-world data'
      ],
      results: [
        'Published at ASSETS 2023',
        'Personalized avatars matching exact wheelchair models',
        'Significantly increase assessment confidence'
      ],
      paper: 'https://doi.org/10.1145/3597638.3608410',
      videoPreview: 'https://youtu.be/IWj8Lc4u3-E',
      videoPresentation: 'https://www.youtube.com/watch?v=XXgwiLo-TqM'
    },
    'forcesight': {
      id: 'forcesight',
      title: 'Forcesight',
      description: 'Non-contact Force Sensing with Laser Speckle Imaging',
      fullDescription: 'ForceSight is a non-contact force sensing approach using laser speckle imaging. Our key observation is that object surfaces deform in the presence of force. This deformation, though very minute, manifests as observable and discernible laser speckle shifts, which we leverage to sense the applied force.',
      tech: ['Python', 'Computer Vision', 'Sensors'],
      metrics: '<0.3N error, patented, Best Demo Honorable Mention',
      video: '/forcesight.mp4',
      images: ['/project2-1.jpg', '/project2-2.jpg'],
      challenges: [
        'Real-time speckle pattern processing',
        'Non-instrumented vision-based force sensing',
        'Achieving sub-Newton force detection accuracy',
      ],
      solutions: [
        'Advanced computer vision algorithms (hand pose estimation, skin segmentation, Farneback optical flow)',
        'GPU-accelerated image processing',
        'Adaptive calibration system'
      ],
      results: [
        'Patent filed (WO2024030827A3)',
        '<0.3N force detection accuracy',
        'Best Demo Honorable Mention at UIST 2022'
      ],
      github: 'https://github.com/forcesight/ForceSight',
      paper: 'https://doi.org/10.1145/3526113.3545622',
      videoPreview: 'https://www.youtube.com/watch?v=c7U0BBB5QWU'
    },
    'hand-interfaces': {
      id: 'hand-interfaces',
      title: 'Hand Interfaces',
      description: 'Using Hands to Imitate Objects in AR/VR for Expressive Interactions',
      fullDescription: 'A new interaction technique that lets users\' hands become virtual objects by imitating the objects themselves. For example, a thumbs-up hand pose is used to mimic a joystick. We created a wide array of interaction designs around this idea to demonstrate its applicability in object retrieval and interactive control tasks.',
      tech: ['C#', 'C++', 'Python', 'XR'],
      metrics: '53K views, Meta SDK adoption, Best Paper Honorable Mention',
      video: '/handinterfaces.mp4',
      images: ['/project3-1.jpg', '/project3-2.jpg'],
      challenges: [
        'Real-time hand tracking accuracy',
        'Object recognition and mapping',
        'Cross-platform compatibility'
      ],
      solutions: [
        'Machine learning hand pose estimation',
        'Dynamic gesture recognition system',
        'Unified AR/VR framework'
      ],
      results: [
        '53K views on social media',
        'Adopted in Meta SDK',
        'Best Paper Honorable Mention at CHI 2022'
      ],
      github: 'https://github.com/handinterfaces/Hand-Interfaces',
      paper: 'https://dl.acm.org/doi/abs/10.1145/3491102.3501898',
      videoPreview: 'https://www.youtube.com/watch?v=ATg3M4QsfEQ',
      videoPresentation: 'https://www.youtube.com/watch?v=LBIpIioWTaw'
    },
    'ui-mobility': {
      id: 'ui-mobility',
      title: 'UI Mobility Control in XR',
      description: 'Switching UI Positionings between Static, Dynamic, and Self Entities',
      fullDescription: 'We facilitated UI mobility between static, dynamic, and self entities with Finger Switches based on users\' in-situ needs. Extended reality (XR) has the potential for seamless user interface (UI) transitions across people, objects, and environments, but UI mobility remains an often-overlooked feature.',
      tech: ['C#', 'Python', 'Unity', 'XR'],
      metrics: 'Published at CHI \'24',
      video: '/uimobility.mp4',
      images: ['/project4-1.jpg', '/project4-2.jpg'],
      challenges: [
        'Minimizing user frustration when using XR in motion',
        'Optimizing UI positioning for different tasks',
        'Balancing mobility and performance'
      ],
      solutions: [
        'Adaptive UI positioning algorithms',
        'Gaze + Gesture interaction design',
        'Performance optimization techniques'
      ],
      results: [
        'Published at CHI 2024',
        '6x performance improvement',
        '26K views on research findings'
      ],
      paper: 'https://dl.acm.org/doi/10.1145/3613904.3642220',
      videoPreview: 'https://youtu.be/bhsrxvT38_M',
      videoPresentation: 'https://youtu.be/57pLICbQHgQ'
    },
    'haptic-muscle-skin': {
      id: 'haptic-muscle-skin',
      title: 'Haptic Artificial Muscle Skin',
      description: 'Artificial muscle skin system for haptic feedback in Extended Reality',
      fullDescription: 'We present a wearable haptic artificial muscle skin based on multilayer dielectric elastomer actuators (DEAs) in Extended Reality (XR) systems to enhance immersion. This breakthrough technology provides realistic haptic feedback for enhanced XR experiences.',
      tech: ['C#', 'C/C++', 'Hardware', 'Haptics'],
      metrics: 'Published in Science Advances',
      video: '/haptic-skin.mp4',
      images: ['/project5-1.jpg', '/project5-2.jpg'],
      challenges: [
        'Creating realistic on-skin haptic feedback',
        'Integrating with existing XR systems',
        'Ensuring user safety and comfort'
      ],
      solutions: [
        'Bio-inspired artificial muscle design',
        'Real-time haptic rendering algorithms',
        'Comprehensive safety protocols'
      ],
      results: [
        'Published in Science Advances 2024',
        'Breakthrough in haptic technology',
        'Integrated HW/SW framework for haptics in XR',
      ],
      paper: 'https://www.science.org/doi/full/10.1126/sciadv.adr1765'
    },
    'wheelpose': {
      id: 'wheelpose',
      title: 'WheelPose',
      description: 'Data Synthesis Techniques to Improve Pose Estimation Performance on Wheelchair Users',
      fullDescription: 'A data synthesis pipeline to address the underrepresentation of wheelchair users in data collection for pose estimation models. Our configurable pipeline generates synthetic data of wheelchair users using motion capture data and motion generation outputs simulated in the Unity game engine.',
      tech: ["Python", "C#", "Applied AI/ML", "Computer Vision"],
      metrics: 'Published at CHI \'24',
      video: '/wheelpose.mp4',
      images: ['/project6-1.jpg', '/project6-2.jpg'],
      challenges: [
        'Limited wheelchair user data in existing datasets',
        'Pose estimation bias against wheelchair users',
        'Creating realistic synthetic training data'
      ],
      solutions: [
        'Novel data synthesis pipeline',
        'Wheelchair-specific pose augmentation',
        'Domain adaptation techniques'
      ],
      results: [
        'Published at CHI 2024',
        'Ful end-to-end pipeline to synthesize wheelchair user data',
        'Open-source dataset released'
      ],
      github: 'https://github.com/hilab-open-source/wheelpose',
      paper: 'https://dl.acm.org/doi/10.1145/3613904.3642555',
      videoPreview: 'https://www.youtube.com/watch?v=KWVG5bVYwd4'
    },
    'auritus': {
      id: 'auritus',
      title: 'Auritus',
      description: 'Open-source optimization toolkit for training human movement models using earables',
      fullDescription: 'AURITUS is an extendable and open-source optimization toolkit designed to enhance and replicate earable applications. AURITUS handles data collection, pre-processing, and labeling tasks using graphical tools and provides a hardware-in-the-loop (HIL) optimizer and TinyML interface to develop lightweight and real-time machine-learning models for activity detection and filters for head-pose tracking.',
      tech: ['Python', 'C++', 'Applied AI/ML', 'IoT'],
      metrics: 'Published at IMWUT \'21',
      video: '/auritus.jpg',
      images: ['/project7-1.jpg', '/project7-2.jpg'],
      challenges: [
        'Processing noisy earable sensor data',
        'Real-time movement classification',
        'Cross-user model generalization'
      ],
      solutions: [
        'Advanced signal processing algorithms',
        'Ensemble learning approaches',
        'Transfer learning techniques'
      ],
      results: [
        'Published at IMWUT 2021',
        '1.6x precision improvement',
        'Open-source toolkit for earable applications',
      ],
      github: 'https://github.com/nesl/auritus',
      paper: 'https://dl.acm.org/doi/abs/10.1145/3534586'
    }
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle youtu.be format
    const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (youtuBeMatch) {
      return youtuBeMatch[1];
    }
    
    // Handle youtube.com format
    const youtubeMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (youtubeMatch) {
      return youtubeMatch[1];
    }
    
    return null;
  };


  // Show loading state until client-side is ready
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  const project = projectDetails[projectId]

  // Temporary debugging - remove this later
  console.log('Project ID from URL:', projectId)
  console.log('Available project keys:', Object.keys(projectDetails))
  console.log('Found project:', project)

  // Show debug info on screen temporarily
  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
          <p>Project ID from URL: {projectId}</p>
          <p>Available keys: {Object.keys(projectDetails).join(', ')}</p>
          <p>Params object: {JSON.stringify(params)}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 block">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black" suppressHydrationWarning={true}>
      {/* Click Effect Emojis */}
      {isClient && clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="fixed pointer-events-none z-50 text-2xl"
          style={{
            left: effect.x - 12,
            top: effect.y - 12,
            animation: 'floatUp 1s ease-out forwards'
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
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes breatheCircle {
          0%, 100% {
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
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Portfolio
          </Link>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600">{project.description}</p>
        </div>
      </div>
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-8">
        {/* Video Preview or Thumbnail */}
        <div className="mb-12">
          {(() => {
            const videoId = getYouTubeVideoId(project.videoPreview);
            
            if (videoId) {
              // YouTube embed
              return (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${project.title} - Video Preview`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            } else if (project.video && project.video.endsWith('.mp4')) {
              // Local video file
              return (
                <video
                  className="w-full rounded-lg shadow-lg"
                  controls
                  muted
                  loop
                  onError={(e) => {
                    console.error('Video failed to load:', project.video);
                    // Hide the video element if it fails to load
                    e.target.style.display = 'none';
                    // Show fallback message
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center text-gray-500';
                    fallback.textContent = 'Video not available';
                    e.target.parentNode.insertBefore(fallback, e.target);
                  }}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            } else if (project.video) {
              // Static image fallback
              return (
                <img
                  src={project.video}
                  alt={project.title}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', project.video);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
              );
            } else {
              // No media available
              return (
                <div className="w-full h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center text-gray-500">
                  No media available
                </div>
              );
            }
          })()}
        </div>


        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{project.fullDescription}</p>
        </section>

        {/* Tech Stack & Categories - Combined with error handling */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technologies & Categories</h2>
          <div className="flex flex-wrap gap-3">
            {/* Safely combine tech and labels, remove duplicates, and sort */}
            {[...new Set([
              ...(project.tech || []), 
              ...(project.labels || [])
            ])]
              .filter(Boolean) // Remove any undefined/null values
              .sort()
              .map((tag) => {
                // Color coding based on category type
                const getTagColor = (tag) => {
                  // Programming languages
                  if (['C#', 'C++', 'Python', 'JavaScript'].includes(tag)) {
                    return 'bg-blue-100 text-blue-800';
                  }
                  // Frameworks/Tools
                  if (['Unity', 'React', 'Next.js', 'TensorFlow'].includes(tag)) {
                    return 'bg-purple-100 text-purple-800';
                  }
                  // Technologies/Domains
                  if (['VR', 'AR', 'XR', 'Computer Vision', 'Machine Learning', 'Applied AI/ML'].includes(tag)) {
                    return 'bg-green-100 text-green-800';
                  }
                  // Hardware/Sensors
                  if (['Hardware', 'Sensors', 'Haptics', 'IoT'].includes(tag)) {
                    return 'bg-orange-100 text-orange-800';
                  }
                  // Research/Academic
                  if (['Research', 'HCI', 'Accessibility', 'Sensing'].includes(tag)) {
                    return 'bg-teal-100 text-teal-800';
                  }
                  // Default
                  return 'bg-gray-100 text-gray-800';
                };

                return (
                  <span 
                    key={tag}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
        </section>

        {/* Challenges, Solutions, Results */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <section>
            <h3 className="text-xl font-bold mb-4 text-red-600">Challenges</h3>
            <ul className="space-y-2">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="text-gray-700">• {challenge}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Solutions</h3>
            <ul className="space-y-2">
              {project.solutions.map((solution, index) => (
                <li key={index} className="text-gray-700">• {solution}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-green-600">Results</h3>
            <ul className="space-y-2">
              {project.results.map((result, index) => (
                <li key={index} className="text-gray-700">• {result}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Links */}
        <section className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Paper
              </a>
            )}
            
            {project.videoPreview && (
              <a
                href={project.videoPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                </svg>
                Video
              </a>
            )}

            {project.videoPresentation && (
              <a
                href={project.videoPresentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
                </svg>
                Presentation
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                Code
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
              transition: 'left 0.1s ease-out, top 0.1s ease-out',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
              filter: 'blur(0.5px)',
              animation: 'breathe 2s ease-in-out infinite'
            }}
          />

          <div
            className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none z-40"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
              transition: 'left 0.2s ease-out, top 0.2s ease-out',
              animation: 'breatheCircle 2.5s ease-in-out infinite'
            }}
          />
        </>
      )}
    </div>
  )
}