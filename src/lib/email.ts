import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

// Check if EmailJS is configured
const isEmailJSConfigured = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

// Initialize EmailJS only if configured
if (isEmailJSConfigured) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  } catch (error) {
    console.warn('Failed to initialize EmailJS:', error)
  }
}

export interface EmailData {
  name: string
  email: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
  error?: string
}

export async function sendContactEmail(data: EmailData): Promise<EmailResponse> {
  // Check if EmailJS is configured
  if (!isEmailJSConfigured) {
    return {
      success: false,
      message: 'Email service is currently unavailable. Please try contacting me directly via email or social media.',
      error: 'EmailJS not configured'
    }
  }

  try {
    // Validate input data
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
        error: 'Invalid input data'
      }
    }

    // Prepare template parameters
    const templateParams = {
      from_name: data.name.trim(),
      from_email: data.email.trim(),
      to_name: 'Turki',
      message: data.message.trim(),
      reply_to: data.email.trim(),
      current_date: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Riyadh',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      }
    } else {
      throw new Error(`EmailJS responded with status: ${response.status}`)
    }
  } catch (error) {
    // Handle specific EmailJS errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()
      const errorString = error.toString().toLowerCase()
      
      if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorString.includes('networkerror')) {
        return {
          success: false,
          message: 'Network error. Please check your internet connection and try again.',
          error: 'Network error'
        }
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('429') || errorString.includes('429')) {
        return {
          success: false,
          message: 'Too many requests. Please wait a moment and try again.',
          error: 'Rate limit exceeded'
        }
      } else if (errorMessage.includes('template') || errorMessage.includes('404') || errorString.includes('404')) {
        return {
          success: false,
          message: 'Email template not found. Please contact me directly.',
          error: 'Template error'
        }
      } else if (errorMessage.includes('unauthorized') || errorMessage.includes('401') || errorString.includes('401')) {
        return {
          success: false,
          message: 'Email service authentication failed. Please try again later.',
          error: 'Authentication error'
        }
      } else if (errorMessage.includes('service') || errorMessage.includes('400') || errorString.includes('400')) {
        return {
          success: false,
          message: 'Email service configuration error. Please contact me directly.',
          error: 'Service configuration error'
        }
      }
    }

    return {
      success: false,
      message: 'Unable to send message at this time. Please try again later or contact me directly.',
      error: 'Email service unavailable'
    }
  }
}

// Alternative: Send email to your own email for testing
export async function sendTestEmail(): Promise<EmailResponse> {
  const testData: EmailData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message to verify email functionality.'
  }

  return sendContactEmail(testData)
}

// Helper function to check if email service is available
export function isEmailServiceAvailable(): boolean {
  return isEmailJSConfigured
} 