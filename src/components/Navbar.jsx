import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSavedJobs } from '../context/SavedJobsContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/jobs', label: 'Jobs' },
  { to: '/companies', label: 'Companies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { savedJobs } = useSavedJobs()

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
      isActive ? 'border-[var(--marigold-dark)] text-[var(--ink)]' : 'border-transparent text-[var(--slate)] hover:text-[var(--ink)]'
    }`

  return (
    <header className="sticky top-0 z-40 bg-[var(--paper)]/95 backdrop-blur border-b border-[var(--line)]">
      <div className="container-page flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-semibold" onClick={() => setOpen(false)}>
          <span className="inline-block w-2.5 h-2.5 bg-[var(--marigold)]" aria-hidden="true" />
          Fieldnote
        </NavLink>

        <nav className="hidden md:flex items-center" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/saved" className="ml-3 btn-secondary text-sm !px-4 !py-2 relative">
            Saved
            {savedJobs.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs bg-[var(--ink)] text-white rounded-full align-middle">
                {savedJobs.length}
              </span>
            )}
          </NavLink>
        </nav>

        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`block h-0.5 bg-[var(--ink)] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 bg-[var(--ink)] transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-[var(--ink)] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-[var(--line)] bg-[var(--paper)]" aria-label="Mobile navigation">
          <div className="container-page flex flex-col py-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)} className="py-3 border-b border-[var(--line)] text-[var(--ink)] font-medium">
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/saved" onClick={() => setOpen(false)} className="py-3 text-[var(--ink)] font-medium">
              Saved ({savedJobs.length})
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
