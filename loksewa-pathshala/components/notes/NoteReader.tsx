import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { BookOpenText, Sparkles } from 'lucide-react';

export type NoteReaderModel = {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  position: string;
  positionLabel: string;
  readingTime?: string;
  updatedAt?: string;
  pdfUrl?: string | null;
};

const outline = [
  'High-yield definitions and concepts',
  'Common mistakes to avoid in MCQs and short answers',
  'Revision cues for the final 72 hours',
];

export function NoteReader({ note }: { note: NoteReaderModel }): JSX.Element {
  const viewerUrl = note.pdfUrl ? `${note.pdfUrl}#page=1&toolbar=0&navpanes=0` : null;

  return (
    <div className="space-y-8 select-none" onContextMenu={(event) => event.preventDefault()}>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Notes', href: '/notes' }, { label: note.positionLabel, href: `/exams/${note.position}` }, { label: note.title }]} />

      <Card className="overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-none bg-white/10 text-text">{note.category}</Badge>
            <Badge className="border-none bg-white/10 text-muted">{note.positionLabel}</Badge>
            {note.readingTime ? <Badge className="border-none bg-white/10 text-muted">{note.readingTime}</Badge> : null}
            {note.updatedAt ? <Badge className="border-none bg-white/10 text-muted">{note.updatedAt}</Badge> : null}
          </div>
          <CardTitle className="text-4xl leading-tight">
            <Link className="transition hover:text-accent" href={`/exams/${note.position}`}>
              {note.title}
            </Link>
          </CardTitle>
          <CardDescription className="text-base">{note.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 rounded-3xl border border-border bg-white/5 p-5">
            <p className="text-sm leading-7 text-muted">{note.description}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-gray-500">
              {viewerUrl ? 'Viewing the embedded note PDF. No download controls are shown here.' : 'PDF viewer will appear here when a file is attached.'}
            </div>

            {viewerUrl ? (
              <div className="overflow-hidden rounded-[18px] border border-white/8 bg-[#0F1624] p-2" style={{ userSelect: 'none' }}>
                <iframe
                  className="h-[720px] w-full rounded-[12px] border-none"
                  onContextMenu={(event) => event.preventDefault()}
                  src={viewerUrl}
                  title={note.title}
                />
              </div>
            ) : (
              <div className="rounded-[18px] border border-dashed border-white/10 bg-[#0F1624] p-6 text-sm text-muted">
                This note has a full detail page and indexed description, but the PDF file is not attached yet.
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-3xl border border-border bg-white/5 p-5">
            <div className="flex items-center gap-2 text-text">
              <BookOpenText className="h-4 w-4 text-accent" />
              Reading outline
            </div>
            <div className="space-y-3 text-sm leading-7 text-muted">
              {outline.map((item) => (
                <div className="flex gap-3" key={item}>
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <style>{`@media print { body { display: none !important; } }`}</style>
    </div>
  );
}