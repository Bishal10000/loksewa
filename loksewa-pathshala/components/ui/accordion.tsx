import { cn } from '@/lib/utils';

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn('space-y-3', className)} {...props} />;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
}: React.PropsWithChildren<{ title: string; defaultOpen?: boolean; className?: string }>): JSX.Element {
  return (
    <details className={cn('group rounded-2xl border border-border bg-surface/80 p-4', className)} open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-text">
        <span>{title}</span>
        <span className="text-muted transition group-open:rotate-45">+</span>
      </summary>
      <div className="mt-4 text-sm leading-7 text-muted">{children}</div>
    </details>
  );
}