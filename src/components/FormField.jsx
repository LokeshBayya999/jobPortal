import { useId } from 'react'

export default function FormField({ label, error, as = 'input', children, ...props }) {
  const id = useId()
  const Field = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input'

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5">
        {label}
      </label>
      <Field
        id={id}
        className={`input-field ${error ? 'has-error' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </Field>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}
