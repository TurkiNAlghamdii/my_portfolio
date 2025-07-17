'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-lg border border-[#948979]/50 bg-[#DFD0B8] dark:border-[#393E46]/50 dark:bg-[#393E46] animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setTheme(newTheme)
    console.log('Theme toggled to:', newTheme)
    console.log('HTML class:', document.documentElement.className)
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#948979]/50 dark:border-[#393E46]/50 bg-[#948979]/20 dark:bg-[#393E46]/30 text-[#222831] dark:text-[#DFD0B8] transition-all duration-200 hover:bg-[#948979]/30 dark:hover:bg-[#393E46]/50 hover:border-[#393E46]/70 dark:hover:border-[#948979]/70 hover:shadow-lg hover:shadow-[#948979]/20 dark:hover:shadow-[#393E46]/20 transform hover:scale-105"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        <Sun className={`h-5 w-5 transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} />
        <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
    </button>
  )
} 