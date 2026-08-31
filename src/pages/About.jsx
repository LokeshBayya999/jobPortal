import SectionHeading from '../components/SectionHeading'

const timeline = [
  { year: '2022', text: 'Fieldnote started as a weekly email of ten hand-checked remote listings, sent to about 40 people.' },
  { year: '2023', text: 'We opened the board publicly and dropped logins for browsing — anyone can read a full posting before signing up for anything.' },
  { year: '2024', text: 'Live search was added so listings reflect what is actually open right now, not a cached snapshot from last month.' },
  { year: '2026', text: 'Fieldnote now surfaces roles across eight fields, with saved searches and one-page applications.' },
]

const values = [
  {
    title: 'Full postings, not teasers',
    text: 'If a listing is worth showing, it is worth showing completely — responsibilities, pay range where the employer shares it, and what a normal week looks like.',
  },
  {
    title: 'No dead listings',
    text: 'We would rather show fewer jobs than let a filled role sit at the top of a search for another two weeks.',
  },
  {
    title: 'One clear next step',
    text: 'Every job page ends with a single action: apply, or go back to the list. No dark patterns, no accounts required to look around.',
  },
]

export default function About() {
  return (
    <div className="container-page py-16 space-y-20">
      <section className="max-w-2xl">
        <p className="text-sm font-medium text-[var(--marigold-dark)] mb-2">About Fieldnote</p>
        <h1 className="font-display text-4xl font-semibold text-[var(--ink)] leading-tight">
          A smaller board, on purpose.
        </h1>
        <p className="mt-5 text-[var(--slate)] text-lg">
          Most job boards optimize for volume — more listings, more reposts, more reasons to keep scrolling.
          Fieldnote optimizes for the fifteen minutes someone spends deciding whether a role is worth their evening.
          That means fewer listings, but every one of them current and complete.
        </p>
      </section>

      <section>
        <SectionHeading eyebrow="How we got here" title="A short timeline" />
        <ol className="mt-8 space-y-6 max-w-2xl">
          {timeline.map((item) => (
            <li key={item.year} className="grid grid-cols-[4rem_1fr] gap-4 border-t border-[var(--line)] pt-4">
              <span className="font-display text-lg font-semibold text-[var(--ink)]">{item.year}</span>
              <p className="text-[var(--slate)]">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading eyebrow="What we care about" title="Three working principles" />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {values.map((value) => (
            <div key={value.title} className="border border-[var(--line)] bg-[var(--paper-raised)] p-5">
              <h3 className="font-display text-lg font-semibold text-[var(--ink)]">{value.title}</h3>
              <p className="mt-2 text-sm text-[var(--slate)]">{value.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
