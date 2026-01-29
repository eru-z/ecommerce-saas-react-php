import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-200 ease-out
    outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:ring-1 focus-visible:ring-neutral-600
  `;

  const variants = {
    primary: `
      bg-blue-500/90 text-white
      hover:bg-blue-500
      hover:-translate-y-[1px]
      shadow-lg shadow-blue-500/20
    `,
    secondary: `
      bg-neutral-800 text-white
      hover:bg-neutral-700
      hover:-translate-y-[1px]
      shadow-lg shadow-black/30
    `,
    outline: `
      border border-neutral-700
      text-white
      hover:bg-neutral-800/60
      hover:border-neutral-600
    `,
    danger: `
      bg-rose-500/90 text-white
      hover:bg-rose-500
      hover:-translate-y-[1px]
      shadow-lg shadow-rose-500/20
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
