import { Link } from 'react-router-dom'
import { useSavedJobs } from '../context/SavedJobsContext'
import { formatJobType, formatDate, stripHtml, truncate } from '../utils/format'

export default function JobCard({ job }) {
  const { isSaved, toggleSaved } = useSavedJobs()
  const saved = isSaved(job.id)

  return (
    <article className="group border border-[var(--line)] bg-[var(--paper-raised)] p-5 flex flex-col gap-3 border-l-4 border-l-[var(--marigold)] hover:border-l-[var(--ink)] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to={`/jobs/${job.id}`} className="font-display text-lg font-semibold leading-snug hover:underline">
            {job.title}
          </Link>
          <p className="text-sm text-[var(--slate)] mt-0.5">{job.company_name}</p>
        </div>
        <button
          type="button"
          onClick={() => toggleSaved(job)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
          className={`shrink-0 w-9 h-9 border flex items-center justify-center text-lg transition-colors ${
            saved ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--marigold)]' : 'border-[var(--line)] text-[var(--slate)] hover:border-[var(--ink)]'
          }`}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <p className="text-sm text-[var(--slate)] flex-1">{truncate(stripHtml(job.description), 140)}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--slate)] border-t border-[var(--line)] pt-3">
        <span>{formatJobType(job.job_type)}</span>
        <span>{job.candidate_required_location || 'Worldwide'}</span>
        {job.salary && <span>{job.salary}</span>}
        <span className="ml-auto">{formatDate(job.publication_date)}</span>
      </div>
    </article>
  )
}
