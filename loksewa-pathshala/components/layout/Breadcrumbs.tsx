import Link from 'next/link';

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }): JSX.Element {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
          {item.href ? (
            <Link className="transition hover:text-text" href={item.href}>
              {item.label}
            </Link>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}