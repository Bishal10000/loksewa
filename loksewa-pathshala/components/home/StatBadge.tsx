import { cn } from '@/lib/utils';

export function StatBadge({
  label,
  value,
  className,
  valueClassName,
  labelClassName,
}: {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}): JSX.Element {
  return (
    <div className={cn('rounded-3xl border border-border bg-white/6 px-5 py-4 shadow-card backdrop-blur-xl', className)}>
      <div className={cn('text-3xl font-semibold text-text', valueClassName)}>{value}</div>
      <div className={cn('mt-1 text-sm text-muted', labelClassName)}>{label}</div>
    </div>
  );
}