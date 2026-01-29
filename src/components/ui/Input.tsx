import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="block text-xs uppercase tracking-widest text-white/70">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full rounded-xl
            bg-neutral-900/80 backdrop-blur
            px-4 py-2.5
            text-sm text-white placeholder:text-white/40
            border transition-all duration-200
            outline-none

            ${
              error
                ? 'border-rose-500/60 focus:border-rose-500'
                : 'border-neutral-800 focus:border-neutral-600'
            }

            focus:ring-0
            ${className}
          `}
          {...props}
        />

        {error && (
          <p className="text-xs text-rose-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
