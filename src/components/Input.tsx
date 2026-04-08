import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helpText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={[
            'rounded border px-3 py-2 text-sm text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
            error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white',
          ].join(' ')}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
        {helpText && !error && (
          <p id={`${inputId}-help`} className="text-xs text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
