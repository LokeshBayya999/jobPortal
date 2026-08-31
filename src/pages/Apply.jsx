import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useJobs } from '../hooks/useJobs'
import FormField from '../components/FormField'
import Loader from '../components/Loader'

const initialValues = { fullName: '', email: '', phone: '', portfolioUrl: '', coverNote: '' }

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.phone && !/^[0-9+\-\s()]{7,}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number, or leave this blank.'
  }

  if (!values.portfolioUrl.trim()) {
    errors.portfolioUrl = 'Share a link to your resume, portfolio, or LinkedIn.'
  } else if (!/^https?:\/\/.+\..+/.test(values.portfolioUrl.trim())) {
    errors.portfolioUrl = 'Enter a full link starting with http:// or https://.'
  }

  if (!values.coverNote.trim()) {
    errors.coverNote = 'Add a short note on why you are a fit.'
  } else if (values.coverNote.trim().length < 30) {
    errors.coverNote = `A bit more detail helps (${values.coverNote.trim().length}/30 characters).`
  }

  return errors
}

export default function Apply() {
  const { jobId } = useParams()
  const { jobs, loading } = useJobs()
  const job = useMemo(() => jobs.find((item) => String(item.id) === jobId), [jobs, jobId])

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
    }
  }

  if (loading) return <div className="container-page py-16"><Loader label="Loading role…" /></div>

  if (!job) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-semibold">This role isn't available anymore</h1>
        <Link to="/jobs" className="btn-primary inline-block mt-6">Browse open roles</Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="container-page py-20 max-w-lg text-center mx-auto">
        <div className="w-12 h-12 rounded-full bg-[var(--ink)] text-[var(--marigold)] flex items-center justify-center mx-auto text-xl">✓</div>
        <h1 className="font-display text-2xl font-semibold mt-5">Application sent</h1>
        <p className="text-[var(--slate)] mt-2">
          Your application for <strong>{job.title}</strong> at {job.company_name} has been submitted. Keep an eye on
          your inbox for a reply.
        </p>
        <Link to="/jobs" className="btn-secondary inline-block mt-6">Back to jobs</Link>
      </div>
    )
  }

  return (
    <div className="container-page py-12 grid lg:grid-cols-[1fr_1.3fr] gap-10">
      <div>
        <p className="text-sm font-medium text-[var(--marigold-dark)] mb-2">Applying for</p>
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">{job.title}</h1>
        <p className="text-[var(--slate)] mt-1">{job.company_name}</p>
        <Link to={`/jobs/${job.id}`} className="text-sm underline mt-4 inline-block">
          View the full job posting
        </Link>
      </div>

      <div className="border border-[var(--line)] bg-[var(--paper-raised)] p-6 md:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Full name" error={errors.fullName} value={values.fullName} onChange={handleChange('fullName')} placeholder="Jordan Smith" />
            <FormField label="Email address" type="email" error={errors.email} value={values.email} onChange={handleChange('email')} placeholder="you@example.com" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Phone (optional)" type="tel" error={errors.phone} value={values.phone} onChange={handleChange('phone')} placeholder="+91 98765 43210" />
            <FormField label="Resume / portfolio link" error={errors.portfolioUrl} value={values.portfolioUrl} onChange={handleChange('portfolioUrl')} placeholder="https://…" />
          </div>
          <FormField
            label="Why are you a good fit?"
            as="textarea"
            rows={5}
            error={errors.coverNote}
            value={values.coverNote}
            onChange={handleChange('coverNote')}
            placeholder="Briefly connect your experience to this role."
          />
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Submit application
          </button>
        </form>
      </div>
    </div>
  )
}
