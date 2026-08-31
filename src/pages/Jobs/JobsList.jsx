import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useJobs } from '../../hooks/useJobs'
import { findCategory } from '../../data/categories'
import JobCard from '../../components/JobCard'
import Loader from '../../components/Loader'
import ErrorNotice from '../../components/ErrorNotice'
import Pagination from '../../components/Pagination'

const PAGE_SIZE = 6

export default function JobsList() {
  const { categoryId } = useParams()
  const category = categoryId ? findCategory(categoryId) : null
  const { jobs, loading, error } = useJobs()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'newest'
  const page = Number(searchParams.get('page')) || 1

  // Local input state lets typing feel instant while the URL updates on a
  // short debounce, using a ref to hold the timer across renders.
  const [searchInput, setSearchInput] = useState(search)
  const debounceRef = useRef(null)

  useEffect(() => setSearchInput(search), [search])

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) next.set(key, value)
      else next.delete(key)
    })
    setSearchParams(next, { replace: true })
  }

  const handleSearchInput = (event) => {
    const value = event.target.value
    setSearchInput(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateParams({ search: value, page: null })
    }, 350)
  }

  useEffect(() => () => clearTimeout(debounceRef.current), [])

  const filtered = useMemo(() => {
    let result = jobs
    if (category) {
      result = result.filter((job) => job.category === category.remotiveCategory)
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company_name.toLowerCase().includes(term)
      )
    }
    const sorted = [...result].sort((a, b) => {
      if (sort === 'oldest') return new Date(a.publication_date) - new Date(b.publication_date)
      if (sort === 'az') return a.title.localeCompare(b.title)
      return new Date(b.publication_date) - new Date(a.publication_date)
    })
    return sorted
  }, [jobs, category, search, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">
            {category ? category.label : 'All open roles'}
          </h1>
          <p className="text-sm text-[var(--slate)] mt-1">
            {loading ? 'Loading…' : `${filtered.length} role${filtered.length === 1 ? '' : 's'} found`}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <label htmlFor="jobs-search" className="sr-only">Search jobs</label>
        <input
          id="jobs-search"
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="Search by title or company…"
          className="input-field flex-1"
        />
        <label htmlFor="jobs-sort" className="sr-only">Sort jobs</label>
        <select
          id="jobs-sort"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value === 'newest' ? null : e.target.value })}
          className="input-field sm:w-48"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">Title, A–Z</option>
        </select>
      </div>

      <div className="mt-8">
        {loading && <Loader label="Fetching live listings…" />}
        {error && !loading && <ErrorNotice tone="notice" message={error} />}

        {!loading && pageItems.length === 0 && (
          <p className="text-[var(--slate)] py-10">
            No roles match your search{search ? ` for “${search}”` : ''}. Try a different keyword or category.
          </p>
        )}

        {!loading && pageItems.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {pageItems.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <Pagination page={currentPage} totalPages={totalPages} onPageChange={(p) => updateParams({ page: p === 1 ? null : String(p) })} />
      </div>
    </div>
  )
}
