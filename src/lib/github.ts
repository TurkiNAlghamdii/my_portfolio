import { useState, useEffect } from 'react'

// GitHub API integration for fetching user activity
export interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    name: string
    url: string
  }
  payload: {
    commits?: Array<{
      message: string
      url: string
    }>
    action?: string
    ref?: string
    ref_type?: string
    pull_request?: {
      title: string
      html_url: string
    }
    issue?: {
      title: string
      html_url: string
    }
  }
}

export interface ActivityItem {
  id: string
  type: 'commit' | 'repo' | 'pr' | 'issue' | 'release' | 'no-activity'
  title: string
  description: string
  timestamp: string
  url?: string
  color: string
}

const POSSIBLE_USERNAMES = ['TurkiNAlghamdii']

export async function fetchGitHubActivity(): Promise<ActivityItem[]> {
  for (const username of POSSIBLE_USERNAMES) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events/public`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App'
        },
        cache: 'no-store'
      })

      if (response.ok) {
        const events: GitHubEvent[] = await response.json()
        
        if (events && events.length > 0) {
          const activities: ActivityItem[] = events
            .slice(0, 15)
            .map(event => processGitHubEvent(event))
            .filter((activity): activity is ActivityItem => activity !== null)
            .slice(0, 3)

          if (activities.length > 0) {
            return activities
          }
        }
      }
    } catch (error) {
      continue
    }
  }

  return getNoActivityMessage()
}

function processGitHubEvent(event: GitHubEvent): ActivityItem | null {
  const timeAgo = getTimeAgo(event.created_at)
  const repoName = event.repo.name.split('/')[1] // Get repo name without username

  switch (event.type) {
    case 'PushEvent':
      const commitCount = event.payload.commits?.length || 0
      return {
        id: event.id,
        type: 'commit',
        title: `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''}`,
        description: `to ${repoName}`,
        timestamp: timeAgo,
        url: `https://github.com/${event.repo.name}`,
        color: 'bg-green-500'
      }

    case 'CreateEvent':
      if (event.payload.ref_type === 'repository') {
        return {
          id: event.id,
          type: 'repo',
          title: 'Created new repository',
          description: repoName,
          timestamp: timeAgo,
          url: `https://github.com/${event.repo.name}`,
          color: 'bg-blue-500'
        }
      } else if (event.payload.ref_type === 'branch') {
        return {
          id: event.id,
          type: 'commit',
          title: 'Created new branch',
          description: `${event.payload.ref} in ${repoName}`,
          timestamp: timeAgo,
          url: `https://github.com/${event.repo.name}`,
          color: 'bg-green-500'
        }
      }
      return null

    case 'PullRequestEvent':
      return {
        id: event.id,
        type: 'pr',
        title: `${event.payload.action} pull request`,
        description: `in ${repoName}`,
        timestamp: timeAgo,
        url: event.payload.pull_request?.html_url,
        color: 'bg-purple-500'
      }

    case 'IssuesEvent':
      return {
        id: event.id,
        type: 'issue',
        title: `${event.payload.action} issue`,
        description: `in ${repoName}`,
        timestamp: timeAgo,
        url: event.payload.issue?.html_url,
        color: 'bg-orange-500'
      }

    case 'ReleaseEvent':
      return {
        id: event.id,
        type: 'release',
        title: 'Published release',
        description: `in ${repoName}`,
        timestamp: timeAgo,
        url: `https://github.com/${event.repo.name}/releases`,
        color: 'bg-indigo-500'
      }

    case 'ForkEvent':
      return {
        id: event.id,
        type: 'repo',
        title: 'Forked repository',
        description: repoName,
        timestamp: timeAgo,
        url: `https://github.com/${event.repo.name}`,
        color: 'bg-cyan-500'
      }

    case 'WatchEvent':
      return {
        id: event.id,
        type: 'repo',
        title: 'Starred repository',
        description: repoName,
        timestamp: timeAgo,
        url: `https://github.com/${event.repo.name}`,
        color: 'bg-yellow-500'
      }

    case 'DeleteEvent':
      return {
        id: event.id,
        type: 'commit',
        title: 'Deleted branch',
        description: `${event.payload.ref} in ${repoName}`,
        timestamp: timeAgo,
        url: `https://github.com/${event.repo.name}`,
        color: 'bg-red-500'
      }

    default:
      return null
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else {
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years} year${years > 1 ? 's' : ''} ago`
  }
}

function getNoActivityMessage(): ActivityItem[] {
  return [{
    id: 'no-activity',
    type: 'no-activity',
    title: 'No recent activity found',
    description: 'This user has no recent public activity on GitHub.',
    timestamp: 'N/A',
    color: 'bg-gray-200'
  }]
}

// Hook for React components
export function useGitHubActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchGitHubActivity()
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
        setActivities(getNoActivityMessage())
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return { activities, loading, error }
} 