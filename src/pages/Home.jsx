import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { useJobs } from '../hooks/useJobs'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import ErrorNotice from '../components/ErrorNotice'
import SectionHeading from '../components/SectionHeading'

export default function Home() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { jobs, loading, error } = useJobs()

  const handleSearch = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/jobs?search=${encodeURIComponent(trimmed)}` : '/jobs')
  }

  const featured = jobs.slice(0, 3)

  return (
    <div>
      <section className="border-b border-[var(--line)]">
        <div className="container-page grid md:grid-cols-[1.2fr_1fr] gap-10 py-16 md:py-24 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] text-[var(--ink)]">
              Read the whole job posting.
              <br />
              Then decide.
            </h1>
            <p className="mt-5 text-lg text-[var(--slate)] max-w-md">
              Fieldnote pulls in real, currently-open roles and strips away the noise — no logins to browse, no
              recycled listings, just what the job actually involves.
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg" role="search">
              <label htmlFor="hero-search" className="sr-only">
                Search job titles or keywords
              </label>
              <input
                id="hero-search"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “product designer” or “support”"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Search jobs
              </button>
            </form>
            <p className="mt-3 text-xs text-[var(--slate)]">
              Or <Link to="/jobs" className="underline">browse every open role</Link> without a search term.
            </p>
          </div>

          <div className="border border-[var(--line)] bg-[var(--paper-raised)] p-6">
            <p className="text-sm font-medium text-[var(--slate)] mb-4">Right now on Fieldnote</p>
            <dl className="grid grid-cols-2 gap-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--slate)]">Open roles</dt>
                <dd className="font-display text-3xl font-semibold mt-1">{loading ? '—' : jobs.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--slate)]">Categories</dt>
                <dd className="font-display text-3xl font-semibold mt-1">{categories.length}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--slate)]">Fully remote</dt>
                <dd className="font-display text-3xl font-semibold mt-1">Most</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-[var(--slate)]">Updated</dt>
                <dd className="font-display text-3xl font-semibold mt-1">Daily</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Browse by field"
          title="Find your corner of the market"
          description="Every category links to a live, filtered list — pick one to see what's currently open."
        />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/jobs/category/${category.id}`}
              className="border border-[var(--line)] bg-[var(--paper-raised)] p-4 hover:border-[var(--ink)] transition-colors flex items-center justify-between"
            >
              <span className="font-medium">{category.label}</span>
              <span aria-hidden="true" className="text-[var(--marigold-dark)]">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <SectionHeading eyebrow="Fresh today" title="Featured openings" />
          <Link to="/jobs" className="btn-secondary text-sm whitespace-nowrap">
            View all jobs
          </Link>
        </div>

        <div className="mt-8">
          {loading && <Loader label="Fetching live listings…" />}
          {error && !loading && <ErrorNotice tone="notice" message={error} />}
          {!loading && (
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
