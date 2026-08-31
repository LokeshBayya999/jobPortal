import { createContext, useContext, useEffect, useReducer } from 'react'

const SavedJobsContext = createContext(null)
const STORAGE_KEY = 'fieldnote.savedJobs'

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function savedJobsReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.some((job) => job.id === action.job.id)
      return exists
        ? state.filter((job) => job.id !== action.job.id)
        : [...state, action.job]
    }
    case 'REMOVE':
      return state.filter((job) => job.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function SavedJobsProvider({ children }) {
  const [savedJobs, dispatch] = useReducer(savedJobsReducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedJobs))
  }, [savedJobs])

  const toggleSaved = (job) => dispatch({ type: 'TOGGLE', job })
  const removeSaved = (id) => dispatch({ type: 'REMOVE', id })
  const clearSaved = () => dispatch({ type: 'CLEAR' })
  const isSaved = (id) => savedJobs.some((job) => job.id === id)

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSaved, removeSaved, clearSaved, isSaved }}>
      {children}
    </SavedJobsContext.Provider>
  )
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext)
  if (!context) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider')
  }
  return context
}
