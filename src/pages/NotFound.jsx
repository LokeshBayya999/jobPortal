import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="font-display text-6xl font-semibold text-[var(--marigold-dark)]">404</p>
      <h1 className="font-display text-2xl font-semibold mt-3">This page took a different job</h1>
      <p className="text-[var(--slate)] mt-2">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary inline-block mt-6">Back to home</Link>
    </div>
  )
}
