'use client'

import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { sendContactEmail, isEmailServiceAvailable } from '@/lib/email'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Check if email service is available
  const emailServiceAvailable = isEmailServiceAvailable()

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        return undefined
      default:
        return undefined
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) newErrors[key as keyof FormErrors] = error
    })
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')
    
    try {
      // Send email using EmailJS
      const result = await sendContactEmail(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message)
      }
      
      // Reset status after 7 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage('')
      }, 7000)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('An unexpected error occurred. Please try again or contact me directly.')
      
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage('')
      }, 7000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
    setFocusedField(null)
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  return (
    <section id="contact" className="py-20 bg-[#948979] dark:bg-[#393E46] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23DFD0B8' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#DFD0B8] mb-6">
            Let's Work Together
          </h2>
          <p className="text-[#DFD0B8]/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
          <div className="mt-8 w-24 h-1 bg-[#DFD0B8] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#DFD0B8]/10 dark:bg-[#222831]/30 rounded-2xl p-8 backdrop-blur-sm border border-[#DFD0B8]/20">
              <h3 className="text-2xl font-semibold text-[#DFD0B8] mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-[#DFD0B8]/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DFD0B8] dark:bg-[#222831] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-[#222831] dark:text-[#DFD0B8]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#DFD0B8] mb-1">Email</h4>
                    <p className="text-[#DFD0B8]/80 break-all">TurkiNaifAlghamdi@gmail.com</p>
                  </div>
                </div>
                
                <div className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-[#DFD0B8]/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#DFD0B8] dark:bg-[#222831] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-[#222831] dark:text-[#DFD0B8]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#DFD0B8] mb-1">Location</h4>
                    <p className="text-[#DFD0B8]/80">Jeddah, Saudi Arabia</p>
                    <p className="text-[#DFD0B8]/60 text-sm mt-1">Available for remote work</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#DFD0B8]/10 dark:bg-[#222831]/30 rounded-2xl p-8 backdrop-blur-sm border border-[#DFD0B8]/20">
              <h3 className="text-xl font-semibold text-[#DFD0B8] mb-6">Connect with Me</h3>
                              <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/turknialghamdi" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#DFD0B8] dark:bg-[#222831] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <svg className="w-6 h-6 text-[#222831] dark:text-[#DFD0B8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/TurkiNAlghamdii" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#DFD0B8] dark:bg-[#222831] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <svg className="w-6 h-6 text-[#222831] dark:text-[#DFD0B8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/Leparapluiie" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#DFD0B8] dark:bg-[#222831] rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <svg className="w-6 h-6 text-[#222831] dark:text-[#DFD0B8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-[#DFD0B8] dark:bg-[#222831] rounded-2xl shadow-2xl p-8 border border-[#393E46]/10 dark:border-[#948979]/10 backdrop-blur-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#222831] dark:text-[#DFD0B8] mb-2">Send me a message</h3>
              <p className="text-[#393E46] dark:text-[#948979]">I'd love to hear about your project. Tell me more!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Service Notice */}
              {!emailServiceAvailable && (
                <div className="flex items-center space-x-3 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                    Email service is currently being configured. You can still submit the form, but you may want to contact me directly via social media.
                  </span>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    {submitMessage}
                  </span>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span className="text-red-700 dark:text-red-300 font-medium">
                    {submitMessage}
                  </span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#222831] dark:text-[#DFD0B8]">
                  Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === 'name' ? 'text-[#393E46] dark:text-[#948979]' : 'text-[#948979] dark:text-[#393E46]'
                    }`} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('name')}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] placeholder-[#DFD0B8]/60 dark:placeholder-[#948979] focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-[#393E46]/30 dark:border-[#948979]/30 focus:ring-[#393E46]/50 dark:focus:ring-[#948979]/50'
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#222831] dark:text-[#DFD0B8]">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-[#393E46] dark:text-[#948979]' : 'text-[#948979] dark:text-[#393E46]'
                    }`} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('email')}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] placeholder-[#DFD0B8]/60 dark:placeholder-[#948979] focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-[#393E46]/30 dark:border-[#948979]/30 focus:ring-[#393E46]/50 dark:focus:ring-[#948979]/50'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-[#222831] dark:text-[#DFD0B8]">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === 'message' ? 'text-[#393E46] dark:text-[#948979]' : 'text-[#948979] dark:text-[#393E46]'
                    }`} />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => handleFocus('message')}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] placeholder-[#DFD0B8]/60 dark:placeholder-[#948979] focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-[#393E46]/30 dark:border-[#948979]/30 focus:ring-[#393E46]/50 dark:focus:ring-[#948979]/50'
                    }`}
                    placeholder="Tell me about your project, timeline, budget, or just say hello..."
                  />
                </div>
                <div className="flex justify-between items-center">
                  {errors.message ? (
                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.message}</span>
                    </p>
                  ) : (
                    <div />
                  )}
                  <span className={`text-sm ${
                    formData.message.length > 900 ? 'text-red-600 dark:text-red-400' : 'text-[#393E46] dark:text-[#948979]'
                  }`}>
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-[#393E46]/50 dark:bg-[#948979]/50 cursor-not-allowed'
                    : 'bg-[#393E46] hover:bg-[#222831] dark:bg-[#948979] dark:hover:bg-[#393E46] hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
                } text-[#DFD0B8] dark:text-[#222831] focus:ring-[#393E46] dark:focus:ring-[#948979]`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#DFD0B8] dark:border-[#222831]"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 