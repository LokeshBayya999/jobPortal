import { useState } from 'react'
import FormField from '../components/FormField'

const initialValues = { name: '', email: '', subject: 'General question', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.message.trim()) {
    errors.message = 'Tell us a little about what you need.'
  } else if (values.message.trim().length < 20) {
    errors.message = `Add a bit more detail (${values.message.trim().length}/20 characters).`
  }
  return errors
}

export default function Contact() {
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
      setValues(initialValues)
    }
  }

  return (
    <div className="container-page py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
      <div>
        <p className="text-sm font-medium text-[var(--marigold-dark)] mb-2">Contact</p>
        <h1 className="font-display text-4xl font-semibold text-[var(--ink)]">Talk to the team</h1>
        <p className="mt-4 text-[var(--slate)] max-w-sm">
          Questions about a listing, a company that should be removed, or interested in posting a role? Send us a
          note and we will reply from a real inbox, usually within two working days.
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="text-[var(--slate)]">Email</dt>
            <dd className="font-medium">hello@fieldnote.example</dd>
          </div>
          <div>
            <dt className="text-[var(--slate)]">Response time</dt>
            <dd className="font-medium">1–2 working days</dd>
          </div>
        </dl>
      </div>

      <div className="border border-[var(--line)] bg-[var(--paper-raised)] p-6 md:p-8">
        {submitted && (
          <div className="mb-6 border border-[var(--success)]/40 bg-[#EAF6EE] text-[#1E5C39] px-4 py-3 text-sm" role="status">
            Thanks — your message has been sent. We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Your name" error={errors.name} value={values.name} onChange={handleChange('name')} placeholder="Jordan Smith" />
            <FormField label="Email address" type="email" error={errors.email} value={values.email} onChange={handleChange('email')} placeholder="you@example.com" />
          </div>

          <FormField label="Subject" as="select" value={values.subject} onChange={handleChange('subject')}>
            <option>General question</option>
            <option>Report an incorrect listing</option>
            <option>Post a job with us</option>
            <option>Something else</option>
          </FormField>

          <FormField
            label="Message"
            as="textarea"
            rows={5}
            error={errors.message}
            value={values.message}
            onChange={handleChange('message')}
            placeholder="What would you like help with?"
          />

          <button type="submit" className="btn-primary w-full sm:w-auto">
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
