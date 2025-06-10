'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ClickEffect {
  id: number
  x: number
  y: number
  emoji: string
}

export default function ResumePage() {
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([])

  // Fun emoji pool
  const emojis = ['💖', '👍', '🌟', '🎉', '🔥', '✨', '🎨', '🚀', '💫', '🌈', '🍦', '🎯', '💎', '🌸', '⚡', '🎪']

  useEffect(() => {
    setIsClient(true)

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
  }, [])

  return (
    <div className="min-h-screen bg-white text-black relative" suppressHydrationWarning={true}>
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

      {/* Navigation Bar */}
      <nav className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 fixed top-0 z-30">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          {/* Logo/Name */}
          <Link href="/" className="font-bold text-xl text-black hover:text-gray-700 transition-colors">
            Siyou Pei | Software Engineer & Researcher
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="\about" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">About</Link>
            <Link href="\" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">Portfolio</Link>
            <Link href="\resume" className="text-gray-700 hover:text-black transition-colors p-2 rounded-lg hover:bg-gray-100">Resume</Link>        
            {/* <a href="#publications" className="text-gray-700 hover:text-black transition-colors">Publications</a> */}
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
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
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100" 
              title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-6">Resume</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            
            {/* Download Button */}
            <a 
              href="/resume.pdf" 
              download="Siyou_Pei_Resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Download PDF
            </a>
          </div>

          {/* PDF Embed */}
          <div className="w-full">
            <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-[800px] border-0 rounded"
                title="Resume PDF"
              >
                <p>
                  Your browser does not support PDFs. 
                  <a href="/resume.pdf" className="text-blue-600 hover:text-blue-800">
                    Download the PDF
                  </a> instead.
                </p>
              </iframe>
            </div>
            
            {/* Fallback for mobile */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-gray-600 mb-4">
                For better viewing on mobile, download the PDF:
              </p>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                Open PDF
              </a>
            </div>
          </div>
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