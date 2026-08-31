export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="text-sm font-medium text-[var(--marigold-dark)] mb-2">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold text-[var(--ink)]">{title}</h2>
      {description && <p className="mt-3 text-[var(--slate)]">{description}</p>}
    </div>
  )
}
