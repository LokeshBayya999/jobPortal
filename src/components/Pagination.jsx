export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  )

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="Pagination">
      <button
        type="button"
        className="btn-secondary !px-3 !py-1.5 text-sm disabled:opacity-40 disabled:pointer-events-none"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      {pages.map((p, idx) => (
        <span key={p} className="flex items-center gap-1.5">
          {idx > 0 && pages[idx - 1] !== p - 1 && <span className="text-[var(--slate)] px-1">…</span>}
          <button
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`w-9 h-9 text-sm border transition-colors ${
              p === page ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'border-[var(--line)] hover:border-[var(--ink)]'
            }`}
          >
            {p}
          </button>
        </span>
      ))}

      <button
        type="button"
        className="btn-secondary !px-3 !py-1.5 text-sm disabled:opacity-40 disabled:pointer-events-none"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  )
}
