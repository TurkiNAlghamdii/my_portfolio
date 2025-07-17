import { createClient } from '@supabase/supabase-js'

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client if environment variables are missing
let supabase: ReturnType<typeof createClient>

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. Using mock client.')
  // Create a mock client that will always return empty arrays
  supabase = {
    from: () => ({
      select: () => ({
        order: () => ({
          data: [],
          error: null
        }),
        eq: () => ({
          order: () => ({
            data: [],
            error: null
          }),
          data: [],
          error: null
        }),
        single: () => ({
          data: null,
          error: { message: 'Supabase not configured' }
        }),
        data: [],
        error: null
      }),
      insert: () => ({
        select: () => ({
          single: () => ({
            data: null,
            error: { message: 'Supabase not configured' }
          })
        })
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: () => ({
              data: null,
              error: { message: 'Supabase not configured' }
            })
          })
        })
      })
    })
  } as unknown as ReturnType<typeof createClient>
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// TypeScript types for the database
export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  technologies: string[]
  live_url: string | null
  github_url: string | null
  status: 'Completed' | 'In Progress' | 'Planning'
  year: string
  featured: boolean
  created_at: string
  updated_at: string
}

// Database functions
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }

    return (data as unknown as Project[]) || []
  } catch (err) {
    console.error('Error in getProjects:', err)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching featured projects:', error)
      return []
    }

    return (data as unknown as Project[]) || []
  } catch (err) {
    console.error('Error in getFeaturedProjects:', err)
    return []
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      return null
    }

    return (data as unknown as Project) || null
  } catch (err) {
    console.error('Error in getProjectById:', err)
    return null
  }
}

// Admin functions (for adding/updating projects)
export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return null
    }

    return (data as unknown as Project) || null
  } catch (err) {
    console.error('Error in createProject:', err)
    return null
  }
}

export async function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return null
    }

    return (data as unknown as Project) || null
  } catch (err) {
    console.error('Error in updateProject:', err)
    return null
  }
} 