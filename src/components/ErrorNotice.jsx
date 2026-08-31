export default function ErrorNotice({ message, tone = 'error' }) {
  const styles = tone === 'error'
    ? 'border-[var(--error)]/40 bg-[#FBEBEA] text-[#7A241D]'
    : 'border-[var(--marigold)]/50 bg-[#FCF3DE] text-[var(--marigold-dark)]'

  return (
    <div className={`border px-4 py-3 text-sm ${styles}`} role="alert">
      {message}
    </div>
  )
}
