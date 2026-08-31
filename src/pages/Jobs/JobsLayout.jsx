import { NavLink, Outlet } from 'react-router-dom'
import { categories } from '../../data/categories'

export default function JobsLayout() {
  const sidebarLinkClass = ({ isActive }) =>
    `block px-3 py-2 text-sm border-l-2 transition-colors ${
      isActive ? 'border-[var(--marigold-dark)] bg-[var(--paper-raised)] font-medium text-[var(--ink)]' : 'border-transparent text-[var(--slate)] hover:text-[var(--ink)]'
    }`

  return (
    <div className="container-page py-12">
      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--slate)] mb-3 px-3">Categories</p>
          <nav className="space-y-1" aria-label="Job categories">
            <NavLink to="/jobs" end className={sidebarLinkClass}>
              All jobs
            </NavLink>
            {categories.map((category) => (
              <NavLink key={category.id} to={`/jobs/category/${category.id}`} className={sidebarLinkClass}>
                {category.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
