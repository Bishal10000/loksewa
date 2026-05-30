import { serviceMeta, type ServiceSlug } from '@/data/services';
import { cn } from '@/lib/utils';

export function ServiceBadge({ slug, className }: { slug: ServiceSlug; className?: string }): JSX.Element {
  const service = serviceMeta[slug];

  return (
    <span
      className={cn('inline-flex items-center rounded-[6px] border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs font-medium text-[#9CA3AF]', className)}
      style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#9CA3AF' }}
    >
      <span className="mr-2 h-2 w-2 rounded-full" style={{ backgroundColor: service.accent }} />
      {service.nameNepali}
    </span>
  );
}