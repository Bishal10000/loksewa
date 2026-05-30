"use client";

import { cn } from '@/lib/utils';

export function FilterChip({
  active,
  children,
  onClick,
  className,
}: React.PropsWithChildren<{ active?: boolean; onClick?: () => void; className?: string }>): JSX.Element {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-[20px] border px-5 py-2 text-[13px] font-semibold transition-all duration-200',
        active
          ? 'border-[#DC143C] bg-[#DC143C] text-white shadow-[0_4px_15px_rgba(220,20,60,0.35)]'
          : 'border-[rgba(255,255,255,0.1)] bg-white/5 text-[#6B7280] hover:border-[rgba(255,255,255,0.2)] hover:bg-white/8 hover:text-[#F9FAFB]',
        className,
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}