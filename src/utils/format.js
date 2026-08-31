export function formatJobType(jobType) {
  if (!jobType) return 'Full time'
  return jobType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatDate(dateString) {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncate(text, length = 160) {
  if (!text) return ''
  return text.length > length ? `${text.slice(0, length).trim()}…` : text
}
