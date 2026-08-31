export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center gap-3 py-16 justify-center text-[var(--slate)]" role="status" aria-live="polite">
      <span className="w-4 h-4 border-2 border-[var(--line)] border-t-[var(--ink)] rounded-full animate-spin" />
      <span>{label}</span>
    </div>
  )
}
