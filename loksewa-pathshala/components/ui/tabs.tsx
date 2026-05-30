"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type TabItem = {
  value: string;
  label: string;
  badge?: string;
  content: React.ReactNode;
};

export function Tabs({ items, defaultValue }: { items: TabItem[]; defaultValue?: string }): JSX.Element {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value ?? '');
  const current = items.find((item) => item.value === active) ?? items[0];

  return (
    <div className="space-y-5">
      <div className="glass-panel sticky top-4 z-10 flex flex-wrap gap-2 rounded-full p-2">
        {items.map((item) => {
          const selected = item.value === active;

          return (
            <button
              key={item.value}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
                selected ? 'bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white shadow-glow' : 'text-muted hover:text-text',
              )}
              onClick={() => setActive(item.value)}
              type="button"
            >
              {item.label}
              {item.badge ? <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">{item.badge}</span> : null}
            </button>
          );
        })}
      </div>
      <div>{current?.content}</div>
    </div>
  );
}