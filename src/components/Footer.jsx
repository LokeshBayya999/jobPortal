import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] mt-24">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3 text-sm text-[var(--slate)]">
        <div>
          <p className="font-display text-lg text-[var(--ink)] mb-2">Fieldnote</p>
          <p>A small, focused board for people who want to read a job posting and actually understand the role.</p>
        </div>
        <div>
          <p className="font-semibold text-[var(--ink)] mb-2">Explore</p>
          <ul className="space-y-1.5">
            <li><Link to="/jobs" className="hover:text-[var(--ink)]">Browse jobs</Link></li>
            <li><Link to="/companies" className="hover:text-[var(--ink)]">Companies hiring</Link></li>
            <li><Link to="/saved" className="hover:text-[var(--ink)]">Saved jobs</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-[var(--ink)] mb-2">Company</p>
          <ul className="space-y-1.5">
            <li><Link to="/about" className="hover:text-[var(--ink)]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--ink)]">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-page py-4 border-t border-[var(--line)] text-xs text-[var(--slate)]">
        Job data provided by the Remotive public API. © {new Date().getFullYear()} Fieldnote.
      </div>
    </footer>
  )
}
