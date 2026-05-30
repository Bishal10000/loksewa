import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NotesExplorer } from '@/components/notes/NotesExplorer';
import { notes } from '@/data/notes';

export default function NotesPage(): JSX.Element {
  return (
    <div className="space-y-8 py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Notes' }]} />
      <section className="space-y-3 text-center">
        <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-[#F9FAFB]">Study notes curated for PSC success</h1>
        <div className="mx-auto h-[3px] w-[60px] rounded-[2px] bg-[linear-gradient(90deg,#DC143C,#9B1C1C)]" />
        <p className="mx-auto max-w-3xl text-[15px] text-[#6B7280]">Browse by topic, search by keyword, and keep the shareable filter state in the URL.</p>
      </section>
      <Suspense fallback={<div className="rounded-3xl border border-border bg-white/5 p-6 text-muted">Loading notes library...</div>}>
        <NotesExplorer sampleNotes={notes} />
      </Suspense>
    </div>
  );
}