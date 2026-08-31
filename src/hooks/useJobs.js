import { useEffect, useState } from 'react'
import { fallbackJobs } from '../data/fallbackJobs'

const API_URL = 'https://remotive.com/api/remote-jobs'

// Simple in-memory cache so switching filters doesn't re-fetch the whole
// dataset every time — we fetch the full list once per session and filter
// on the client, which also keeps the UI snappy while typing in the search box.
let cachedJobs = null

/**
 * Fetches the live job list once, then hands back the same array to every
 * component that calls this hook. Falls back to bundled sample data if the
 * network request fails, so the rest of the app still has content to show.
 */
export function useJobs() {
  const [jobs, setJobs] = useState(cachedJobs)
  const [loading, setLoading] = useState(!cachedJobs)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cachedJobs) return

    let cancelled = false
    const controller = new AbortController()

    async function fetchJobs() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}?limit=80`, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        if (!cancelled) {
          cachedJobs = data.jobs || []
          setJobs(cachedJobs)
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Falling back to sample job data:', err.message)
          cachedJobs = fallbackJobs
          setJobs(fallbackJobs)
          setError('We could not reach the live job feed, so sample listings are shown instead.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchJobs()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  return { jobs: jobs || [], loading, error }
}
