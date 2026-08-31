import { Link } from 'react-router-dom'
import { useSavedJobs } from '../context/SavedJobsContext'
import JobCard from '../components/JobCard'
import SectionHeading from '../components/SectionHeading'

export default function SavedJobs() {
  const { savedJobs, clearSaved } = useSavedJobs()

  return (
    <div className="container-page py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Your list" title="Saved jobs" description="Jobs you've starred stay here, on this device, until you remove them." />
        {savedJobs.length > 0 && (
          <button type="button" onClick={clearSaved} className="btn-secondary text-sm">
            Clear all
          </button>
        )}
      </div>

      {savedJobs.length === 0 ? (
        <div className="mt-10 border border-dashed border-[var(--line)] p-10 text-center">
          <p className="text-[var(--slate)]">You haven't saved any jobs yet.</p>
          <Link to="/jobs" className="btn-primary inline-block mt-5">Browse open roles</Link>
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
