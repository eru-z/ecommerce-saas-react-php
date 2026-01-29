import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/* CARD CONTAINER */
export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`
        group relative rounded-2xl
        border border-neutral-800/80
        bg-neutral-900/80 backdrop-blur
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-neutral-700
        hover:shadow-2xl hover:shadow-black/40
        focus-within:border-neutral-600
        ${className}
      `}
    >
      {/* subtle accent glow — portfolio style */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          group-focus-within:opacity-100
          bg-gradient-to-br
          from-blue-500/6 via-indigo-500/4 to-transparent
        "
      />

      {/* content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

/* CARD HEADER */
export const CardHeader = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`
        flex items-center justify-between
        px-6 py-4
        border-b border-neutral-800/80
        ${className}
      `}
    >
      {children}
    </div>
  );
};

/* CARD BODY */
export const CardBody = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

/* CARD TITLE */
export const CardTitle = ({ children, className = '' }: CardProps) => {
  return (
    <h3
      className={`
        text-sm font-medium tracking-wide
        text-white
        ${className}
      `}
    >
      {children}
    </h3>
  );
};
