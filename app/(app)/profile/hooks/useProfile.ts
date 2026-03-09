import { useState, useEffect } from 'react'
import { profileService } from '../services/profileService'

interface UserProfile {
  email: string
  createdAt: string
}

export function useProfile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await profileService.getCurrentUserProfile()
      if (user && user.email) {
        setUser({
          email: user.email,
          createdAt: user.created_at || new Date().toISOString(),
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (email: string) => {
    const namePart = email.split('@')[0]
    const words = namePart.split(/[._-]/)
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
    return namePart.substring(0, 2).toUpperCase()
  }

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleSignOut = async () => {
    try {
      await profileService.signOutUser()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    getInitials,
    formatDate,
    handleSignOut,
  }
}
