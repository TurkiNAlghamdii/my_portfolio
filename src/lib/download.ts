// Resume download utility functions

export function downloadResume() {
  // Use API route to proxy the download (more secure)
  const resumeUrl = '/api/download-resume'
  
  // Create download link
  const link = document.createElement('a')
  link.href = resumeUrl
  link.download = 'Turki_Naif_Alghamdi_Resume.pdf'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function openResumeInNewTab() {
  // Use API route to proxy the download
  const resumeUrl = '/api/download-resume'
  window.open(resumeUrl, '_blank')
}

// Alternative method if you want to host the resume externally
export function downloadResumeFromUrl(url: string, filename: string = 'resume.pdf') {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function to use with Dropbox, OneDrive, or other cloud storage
export function downloadResumeFromCloud(cloudUrl: string) {
  window.open(cloudUrl, '_blank')
} 