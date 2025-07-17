'use client'

import { ArrowDown, Github, Linkedin, Mail, Eye, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = 'Turki'
  
  useEffect(() => {
    let currentIndex = 0
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsTypingComplete(true)
      }
    }, 150) // Adjust speed here (lower = faster)

    return () => clearInterval(typeInterval)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#DFD0B8] to-[#948979] dark:from-[#222831] dark:to-[#393E46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-[#222831] dark:text-[#DFD0B8]">
              Hi, I&apos;m{' '}
              <span className="text-[#393E46] dark:text-[#948979] relative">
                {displayedText}
                <span className={`inline-block w-0.5 h-[1em] bg-[#393E46] dark:bg-[#948979] ml-1 ${isTypingComplete ? 'animate-pulse' : 'animate-pulse'}`}></span>
              </span>
            </h1>
            <p className={`text-xl sm:text-2xl text-[#393E46] dark:text-[#948979] max-w-3xl mx-auto transition-all duration-700 ${
              isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              A passionate tech enthusiast and a full stack developer
            </p>
          </div>
          
          {/* Social Media Buttons */}
          <div className={`flex justify-center space-x-4 transition-all duration-700 delay-300 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a
              href="https://github.com/TurkiNAlghamdii"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#393E46] dark:bg-[#948979] text-[#DFD0B8] dark:text-[#222831] hover:bg-[#222831] dark:hover:bg-[#393E46] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="www.linkedin.com/in/turknialghamdi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#393E46] dark:bg-[#948979] text-[#DFD0B8] dark:text-[#222831] hover:bg-[#222831] dark:hover:bg-[#393E46] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:turkiNAlghamdi@gmail.com"
              className="p-3 rounded-lg bg-[#393E46] dark:bg-[#948979] text-[#DFD0B8] dark:text-[#222831] hover:bg-[#222831] dark:hover:bg-[#393E46] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 delay-500 ${
            isTypingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <a
              href="#projects"
              className="inline-flex items-center space-x-2 bg-[#393E46] dark:bg-[#948979] text-[#DFD0B8] dark:text-[#222831] hover:bg-[#222831] dark:hover:bg-[#393E46] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Eye className="h-4 w-4" />
              <span>View My Work</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-[#393E46] dark:border-[#948979] text-[#393E46] dark:text-[#948979] hover:bg-[#393E46] dark:hover:bg-[#948979] hover:text-[#DFD0B8] dark:hover:text-[#222831] px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
        
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-700 delay-700 ${
          isTypingComplete ? 'opacity-100' : 'opacity-0'
        }`}>
          <ArrowDown className="h-6 w-6 text-[#948979] dark:text-[#948979]" />
        </div>
      </div>
    </section>
  )
} 