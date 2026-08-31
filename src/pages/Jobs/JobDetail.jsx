import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useJobs } from '../../hooks/useJobs'
import { useSavedJobs } from '../../context/SavedJobsContext'
import { formatJobType, formatDate } from '../../utils/format'
import Loader from '../../components/Loader'

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { jobs, loading } = useJobs()
  const { isSaved, toggleSaved } = useSavedJobs()

  const job = useMemo(() => jobs.find((item) => String(item.id) === id), [jobs, id])

  const related = useMemo(() => {
    if (!job) return []
    return jobs.filter((item) => item.category === job.category && item.id !== job.id).slice(0, 2)
  }, [jobs, job])

  if (loading) return <div className="container-page py-16"><Loader label="Loading role…" /></div>

  if (!job) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-semibold">We couldn't find that role</h1>
        <p className="text-[var(--slate)] mt-2">It may have been filled or the link is out of date.</p>
        <Link to="/jobs" className="btn-primary inline-block mt-6">Browse open roles</Link>
      </div>
    )
  }

  return (
    <div className="container-page py-12 grid lg:grid-cols-[1fr_320px] gap-10">
      <div>
        <button type="button" onClick={() => navigate(-1)} className="text-sm text-[var(--slate)] hover:text-[var(--ink)] mb-6">
          ← Back
        </button>

        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">{job.title}</h1>
        <p className="text-[var(--slate)] mt-2">{job.company_name}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--slate)] mt-4 border-y border-[var(--line)] py-4">
          <span>{formatJobType(job.job_type)}</span>
          <span>{job.candidate_required_location || 'Worldwide'}</span>
          {job.salary && <span>{job.salary}</span>}
          <span>Posted {formatDate(job.publication_date)}</span>
        </div>

        <div
          className="prose-content mt-6 text-[var(--ink)] leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_li]:mb-1.5 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      <aside className="lg:sticky lg:top-24 h-fit border border-[var(--line)] bg-[var(--paper-raised)] p-5">
        <Link to={`/apply/${job.id}`} className="btn-primary w-full block text-center">
          Apply for this role
        </Link>
        <button
          type="button"
          onClick={() => toggleSaved(job)}
          className="btn-secondary w-full mt-3"
        >
          {isSaved(job.id) ? '★ Saved' : '☆ Save for later'}
        </button>

        {related.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--slate)] mb-3">More in {job.category?.replace('-', ' ')}</p>
            <div className="space-y-3">
              {related.map((item) => (
                <Link key={item.id} to={`/jobs/${item.id}`} className="block text-sm hover:underline">
                  {item.title}
                  <span className="block text-xs text-[var(--slate)]">{item.company_name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
