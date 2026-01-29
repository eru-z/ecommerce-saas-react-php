import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) => {
  const variants = {
    success: `
      bg-emerald-500/15
      text-emerald-400
      border border-emerald-500/30
    `,
    warning: `
      bg-amber-500/15
      text-amber-400
      border border-amber-500/30
    `,
    danger: `
      bg-rose-500/15
      text-rose-400
      border border-rose-500/30
    `,
    info: `
      bg-blue-500/15
      text-blue-400
      border border-blue-500/30
    `,
    default: `
      bg-neutral-800/60
      text-white/80
      border border-neutral-700
    `,
  };

  return (
    <span
      className={`
        inline-flex items-center
        rounded-full
        px-2.5 py-1
        text-[11px] font-medium tracking-wide
        backdrop-blur
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
