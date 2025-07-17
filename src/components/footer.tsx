'use client'

import { Github, Linkedin, Mail, Heart, ArrowUp, Download, ExternalLink, MapPin, Calendar, Code, Coffee, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useGitHubActivity } from '@/lib/github'
import { downloadResume } from '@/lib/download'

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())
  const { activities, loading, error } = useGitHubActivity()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const technologies = [
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 
    'Supabase', 'Node.js', 'Power BI', 'JavaScript'
  ]

  return (
    <footer className="bg-[#393E46] dark:bg-[#222831] text-[#DFD0B8] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DFD0B8' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Personal Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#DFD0B8] to-[#948979] bg-clip-text text-transparent">
                  Turki Naif Alghamdi
                </h3>
                <p className="text-[#948979] text-lg leading-relaxed mb-6">
                  Full-stack developer passionate about creating exceptional digital experiences. 
                  I turn ideas into reality through clean code and innovative solutions.
                </p>
                <div className="flex items-center space-x-6 text-sm text-[#948979]">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Jeddah, Saudi Arabia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Available for projects</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect with Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/TurkiNAlghamdii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-6 w-6 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/turknialghamdi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" />
                  </a>
                  <a
                    href="https://x.com/Leparapluiie"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:TurkiNaifAlghamdi@gmail.com"
                    className="group w-12 h-12 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="h-6 w-6 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={downloadResume}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Download className="h-4 w-4 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" />
                  <span className="text-[#948979] group-hover:text-[#DFD0B8] transition-colors">Download Resume</span>
                </button>
                <a 
                  href="#contact"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 rounded-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Mail className="h-4 w-4 text-[#948979] group-hover:text-[#DFD0B8] transition-colors" />
                  <span className="text-[#948979] group-hover:text-[#DFD0B8] transition-colors">Hire Me</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-[#948979] hover:text-[#DFD0B8] transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-[#948979] rounded-full group-hover:bg-[#DFD0B8] transition-colors"></span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Fun Stats */}
              <div className="mt-8 p-4 bg-[#DFD0B8]/5 rounded-lg">
                <h5 className="text-lg font-semibold mb-4">Fun Stats</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#948979] flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>Lines of Code</span>
                    </span>
                    <span className="text-[#DFD0B8] font-semibold">50K+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#948979] flex items-center space-x-2">
                      <Coffee className="h-4 w-4" />
                      <span>Cups of Coffee</span>
                    </span>
                    <span className="text-[#DFD0B8] font-semibold">∞</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#948979] flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Projects Done</span>
                    </span>
                    <span className="text-[#DFD0B8] font-semibold">20+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Technologies I Love</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#DFD0B8]/10 hover:bg-[#DFD0B8]/20 text-[#948979] hover:text-[#DFD0B8] rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* GitHub Activity */}
              <div className="p-4 bg-[#DFD0B8]/5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-lg font-semibold">Latest Activity</h5>
                  {loading && (
                    <div className="w-4 h-4 border-2 border-[#948979] border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                
                <div className="space-y-3 text-sm">
                  {activities.length > 0 && activities[0].type !== 'no-activity' ? (
                    activities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-2">
                        <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                          {activity.url ? (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#DFD0B8] hover:text-[#948979] transition-colors group"
                            >
                              <p className="truncate">{activity.title}</p>
                              <p className="text-[#948979] text-xs truncate">{activity.description}</p>
                            </a>
                          ) : (
                            <div>
                              <p className="text-[#DFD0B8] truncate">{activity.title}</p>
                              <p className="text-[#948979] text-xs truncate">{activity.description}</p>
                            </div>
                          )}
                          <p className="text-[#948979] text-xs mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    !loading && (
                      <div className="text-center py-4">
                        <p className="text-[#948979] text-sm">No recent public activity</p>
                        <p className="text-[#948979] text-xs mt-1">Check my GitHub profile for more details</p>
                      </div>
                    )
                  )}
                  
                  {error && (
                    <div className="text-[#948979] text-xs text-center py-2 bg-red-500/10 rounded-lg">
                      <p>Unable to load GitHub activity</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-3 border-t border-[#DFD0B8]/10">
                  <a
                    href="https://github.com/TurkiNAlghamdii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#948979] hover:text-[#DFD0B8] text-xs flex items-center space-x-1 transition-colors"
                  >
                    <Github className="h-3 w-3" />
                    <span>View all activity on GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#DFD0B8]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-[#948979] flex items-center">
                  Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> by Turki Naif Alghamdi
                </p>
                <span className="text-[#948979]">•</span>
                <p className="text-[#948979] text-sm">
                  © {currentYear} All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-[#948979]">
                <span>Built with Next.js & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-[#DFD0B8] hover:bg-[#948979] text-[#222831] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </footer>
  )
} 