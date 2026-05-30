import { cn } from '@/lib/utils';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-full border border-border bg-white/6 px-4 text-sm text-text placeholder:text-muted shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30',
        className,
      )}
      {...props}
    />
  );
}