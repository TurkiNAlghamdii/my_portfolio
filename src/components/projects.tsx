'use client'

import { ExternalLink, Github, Calendar, Code2, Loader2, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getFeaturedProjects, type Project } from '@/lib/supabase'

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        setError(null)
        const data = await getFeaturedProjects()
        setProjects(data)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError('Failed to load projects. Please try again later.')
        // Fallback to hardcoded data if database fails
        setProjects([
          {
            id: '1',
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution built with Next.js and Supabase, featuring user authentication, product management, and payment integration.",
            image_url: null,
            technologies: ["Next.js", "Supabase", "Tailwind CSS", "Stripe"],
            live_url: "#",
            github_url: "#",
            status: "Completed" as const,
            year: "2024",
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            image_url: null,
            technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
            live_url: "#",
            github_url: "#",
            status: "In Progress" as const,
            year: "2024",
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-[#DFD0B8] dark:bg-[#222831]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#DFD0B8] mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-[#393E46] dark:text-[#948979] max-w-2xl mx-auto font-medium">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3 text-[#393E46] dark:text-[#948979]">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg font-medium">Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-[#DFD0B8] dark:bg-[#222831]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#DFD0B8] mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-[#393E46] dark:text-[#948979] max-w-2xl mx-auto font-medium">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-3 text-red-500">
              <AlertCircle className="h-6 w-6" />
              <span className="text-lg font-medium">{error}</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-[#DFD0B8] dark:bg-[#222831]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#DFD0B8] mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-[#393E46] dark:text-[#948979] max-w-2xl mx-auto font-medium">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative bg-[#948979] dark:bg-[#393E46] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-[#393E46]/20 dark:hover:shadow-[#222831]/30 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-[#393E46]/10 dark:border-[#948979]/10"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-600 dark:bg-green-400/20 dark:text-green-400' 
                    : project.status === 'In Progress'
                    ? 'bg-yellow-500/20 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-400'
                    : 'bg-blue-500/20 text-blue-600 dark:bg-blue-400/20 dark:text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-[#393E46] to-[#222831] dark:from-[#222831] dark:to-[#393E46] overflow-hidden">
                {project.image_url ? (
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Code2 className="h-12 w-12 text-[#DFD0B8] dark:text-[#948979] mx-auto mb-2 opacity-60" />
                        <span className="text-[#DFD0B8] dark:text-[#948979] text-sm font-medium opacity-80">
                          {project.title}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#393E46]/90 dark:bg-[#222831]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#DFD0B8] dark:bg-[#948979] text-[#393E46] dark:text-[#222831] rounded-full hover:bg-[#948979] dark:hover:bg-[#DFD0B8] transition-colors duration-200 transform hover:scale-110"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#DFD0B8] dark:bg-[#948979] text-[#393E46] dark:text-[#222831] rounded-full hover:bg-[#948979] dark:hover:bg-[#DFD0B8] transition-colors duration-200 transform hover:scale-110"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                {/* Title and Year */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#DFD0B8] dark:text-[#DFD0B8] group-hover:text-[#393E46] dark:group-hover:text-[#948979] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-[#DFD0B8] dark:text-[#948979] opacity-70">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">{project.year}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#DFD0B8] dark:text-[#948979] mb-4 leading-relaxed text-sm opacity-90">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-[#393E46]/80 dark:bg-[#222831]/80 text-[#DFD0B8] dark:text-[#DFD0B8] rounded-lg text-xs font-medium border border-[#393E46]/20 dark:border-[#948979]/20 hover:bg-[#393E46] dark:hover:bg-[#222831] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-[#393E46] dark:bg-[#222831] text-[#DFD0B8] dark:text-[#DFD0B8] rounded-lg hover:bg-[#222831] dark:hover:bg-[#393E46] transition-all duration-200 text-sm font-medium border border-[#393E46]/20 dark:border-[#948979]/20 hover:shadow-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-[#393E46] dark:border-[#948979] text-[#393E46] dark:text-[#948979] rounded-lg hover:bg-[#393E46] dark:hover:bg-[#948979] hover:text-[#DFD0B8] dark:hover:text-[#222831] transition-all duration-200 text-sm font-medium"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#393E46] to-[#222831] dark:from-[#948979] dark:to-[#393E46] opacity-60"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 