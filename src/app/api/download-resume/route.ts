import { NextRequest, NextResponse } from 'next/server'

// Secure resume download API route
export async function GET(request: NextRequest) {
  try {
    // The actual Supabase URL is hidden on the server side and can be stored in env vars
    const RESUME_URL = process.env.RESUME_URL || 'https://rechlvadwsjwxyhgksto.supabase.co/storage/v1/object/public/files/Turki-Naif-Alghamdi-resume.pdf'
    
    // Optional: Add download analytics (commented out for production)
    // const userAgent = request.headers.get('user-agent') || 'Unknown'
    // const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'
    // console.log(`Resume download - IP: ${ip}, User-Agent: ${userAgent}, Time: ${new Date().toISOString()}`)
    
    // Fetch the file from Supabase
    const response = await fetch(RESUME_URL)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }
    
    // Get the file content
    const fileBuffer = await response.arrayBuffer()
    
    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Turki_Naif_Alghamdi_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'X-Robots-Tag': 'noindex', // Prevent search engine indexing
      },
    })
  } catch (error) {
    console.error('Resume download error:', error)
    return NextResponse.json(
      { error: 'Failed to download resume' },
      { status: 500 }
    )
  }
} 