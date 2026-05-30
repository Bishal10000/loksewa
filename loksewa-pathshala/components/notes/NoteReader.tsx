import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NoteItem } from '@/data/notes';
import { BookOpenText, Sparkles } from 'lucide-react';

export function NoteReader({ note }: { note: NoteItem }): JSX.Element {
  const outline = [
    'High-yield definitions and concepts',
    'Common mistakes to avoid in MCQs and short answers',
    'Revision cues for the final 72 hours',
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Notes', href: '/notes' }, { label: note.titleNepali }]} />
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-none bg-white/10 text-text">{note.category}</Badge>
            <Badge className="border-none bg-white/10 text-muted">{note.readingTime}</Badge>
            <Badge className="border-none bg-white/10 text-muted">{note.updatedAt}</Badge>
          </div>
          <CardTitle className="text-4xl">{note.titleNepali}</CardTitle>
          <CardDescription className="text-base">{note.titleEnglish}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 rounded-3xl border border-border bg-white/5 p-5">
            <p className="text-sm leading-7 text-muted">{note.summary}</p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm font-semibold text-gray-500">
              PDF view is available from the notes library cards
            </div>
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
    </div>
  );
}