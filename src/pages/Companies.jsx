import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useJobs } from '../hooks/useJobs'
import Loader from '../components/Loader'
import ErrorNotice from '../components/ErrorNotice'
import SectionHeading from '../components/SectionHeading'

export default function Companies() {
  const { jobs, loading, error } = useJobs()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const companies = useMemo(() => {
    const map = new Map()
    jobs.forEach((job) => {
      if (!map.has(job.company_name)) {
        map.set(job.company_name, { name: job.company_name, count: 0, categories: new Set() })
      }
      const entry = map.get(job.company_name)
      entry.count += 1
      entry.categories.add(job.category)
    })
    return Array.from(map.values()).sort((a, b) => b.count - a.count)
  }, [jobs])

  const filtered = companies.filter((company) => company.name.toLowerCase().includes(query.toLowerCase()))

  const handleQueryChange = (event) => {
    const value = event.target.value
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Companies"
        title="Who's hiring right now"
        description="Built from the same live feed as the jobs board — one row per company with an open role."
      />

      <div className="mt-8 max-w-sm">
        <label htmlFor="company-search" className="sr-only">Search companies</label>
        <input
          id="company-search"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search companies…"
          className="input-field"
        />
      </div>

      <div className="mt-8">
        {loading && <Loader label="Loading companies…" />}
        {error && !loading && <ErrorNotice tone="notice" message={error} />}

        {!loading && filtered.length === 0 && (
          <p className="text-[var(--slate)] py-10">No companies match “{query}”.</p>
        )}

        {!loading && filtered.length > 0 && (
          <ul className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            {filtered.map((company) => (
              <li key={company.name} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-medium">{company.name}</p>
                  <p className="text-xs text-[var(--slate)] mt-0.5">
                    {company.count} open role{company.count === 1 ? '' : 's'}
                  </p>
                </div>
                <Link
                  to={`/jobs?search=${encodeURIComponent(company.name)}`}
                  className="btn-secondary text-sm !py-1.5 !px-3 whitespace-nowrap"
                >
                  View roles
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
