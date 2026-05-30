import { CheckCircle2, CircleDashed, School2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  { label: 'Paper 1', icon: CircleDashed },
  { label: 'Paper 2', icon: CircleDashed },
  { label: 'Paper 3 / Service Paper', icon: CircleDashed },
  { label: 'Interview', icon: CheckCircle2 },
];

export function PaperTimeline({ className }: { className?: string }): JSX.Element {
  return (
    <div className={cn('grid gap-3', className)}>
      {stages.map((stage, index) => (
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/5 px-4 py-3" key={stage.label}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-text">
            <stage.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text">{stage.label}</p>
            <p className="text-xs text-muted">Step {index + 1}</p>
          </div>
          {index < stages.length - 1 ? <School2 className="h-4 w-4 text-muted" /> : null}
        </div>
      ))}
    </div>
  );
}