'use client'

import { ThemeToggle } from './theme-toggle'
import { Menu, X, Home, User, Code, FolderOpen, Mail, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { downloadResume } from '@/lib/download'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigation = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#DFD0B8]/95 dark:bg-[#222831]/95 backdrop-blur-lg shadow-lg shadow-[#948979]/20 dark:shadow-[#222831]/20' 
        : 'bg-[#DFD0B8]/80 dark:bg-[#222831]/80 backdrop-blur-md'
    } border-b border-[#948979]/50 dark:border-[#393E46]/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="group cursor-pointer">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#393E46] to-[#222831] dark:from-[#948979] dark:to-[#DFD0B8] bg-clip-text text-transparent hover:from-[#222831] hover:to-[#393E46] dark:hover:from-[#DFD0B8] dark:hover:to-[#948979] transition-all duration-300">
                T U R K I
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-[#393E46] to-[#222831] dark:from-[#948979] dark:to-[#DFD0B8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative flex items-center space-x-2 px-4 py-2 rounded-lg text-[#222831] dark:text-[#DFD0B8] hover:text-[#393E46] dark:hover:text-[#948979] hover:bg-[#948979]/20 dark:hover:bg-[#393E46]/20 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#393E46] dark:bg-[#948979] scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Resume Download Button */}
            <button 
              onClick={downloadResume}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#393E46] dark:bg-[#948979] hover:bg-[#222831] dark:hover:bg-[#222831] text-[#DFD0B8] dark:text-[#222831] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] rounded-lg border border-[#393E46]/50 dark:border-[#948979]/50 hover:border-[#222831] dark:hover:border-[#222831] shadow-md hover:shadow-lg hover:shadow-[#393E46]/20 dark:hover:shadow-[#222831]/20 transition-all duration-300 ease-in-out"
            >
              <Download className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
              <span className="text-sm font-medium">Resume</span>
            </button>

            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative inline-flex items-center justify-center p-2 rounded-lg text-[#222831] dark:text-[#DFD0B8] hover:text-[#393E46] dark:hover:text-[#948979] hover:bg-[#948979]/20 dark:hover:bg-[#393E46]/20 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                  <X className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="px-4 pt-2 pb-4 space-y-2 bg-[#DFD0B8]/95 dark:bg-[#222831]/95 backdrop-blur-lg border-t border-[#948979]/50 dark:border-[#393E46]/50">
          {navigation.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[#222831] dark:text-[#DFD0B8] hover:text-[#393E46] dark:hover:text-[#948979] hover:bg-[#948979]/20 dark:hover:bg-[#393E46]/20 transition-all duration-200 transform ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-base font-medium">{item.name}</span>
              </button>
            )
          })}
          
          {/* Mobile Resume Button */}
          <button 
            onClick={downloadResume}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#393E46] dark:bg-[#948979] hover:bg-[#222831] dark:hover:bg-[#222831] text-[#DFD0B8] dark:text-[#222831] hover:text-[#DFD0B8] dark:hover:text-[#DFD0B8] rounded-lg border border-[#393E46]/50 dark:border-[#948979]/50 hover:border-[#222831] dark:hover:border-[#222831] shadow-md hover:shadow-lg hover:shadow-[#393E46]/20 dark:hover:shadow-[#222831]/20 transition-all duration-300 ease-in-out"
          >
            <Download className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            <span className="text-base font-medium">Download Resume</span>
          </button>
        </div>
      </div>
    </header>
  )
} 