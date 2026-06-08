import Link from 'next/link';
import { BookOpen, Clock3, Sparkles } from 'lucide-react';
import { NoteItem } from '@/data/notes';
import { getSampleNoteRoute } from '@/lib/note-routing';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const difficultyClass: Record<NoteItem['difficulty'], string> = {
  easy: 'bg-emerald-500/15 text-emerald-200',
  medium: 'bg-amber-500/15 text-amber-200',
  advanced: 'bg-rose-500/15 text-rose-200',
};

export function NoteCard({ note, isSample = false, position }: { note: NoteItem; isSample?: boolean; position?: string }): JSX.Element {
  const noteHref = getSampleNoteRoute(note, position);

  return (
    <Card className="group h-full rounded-[14px] transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <CardHeader className="space-y-4 p-6 pb-0">
        <div className="flex items-center justify-between gap-3">
          <Badge className="rounded-[6px] border-none bg-white/10 px-[10px] py-1 text-[11px] font-bold tracking-[1.5px] text-text">{note.category}</Badge>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyClass[note.difficulty]}`}>{note.difficulty}</span>
        </div>
        <div>
          <CardTitle className="text-[17px] font-bold leading-[1.4] text-[#F9FAFB]">
            <Link className="transition hover:text-accent" href={noteHref}>
              {note.titleNepali}
            </Link>
          </CardTitle>
          <CardDescription className="mt-2 text-[13px] leading-6 text-[#6B7280]">{note.titleEnglish}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        <p className="text-[13px] leading-6 text-[#6B7280]">{note.summary}</p>

        <div className="flex flex-wrap gap-2">
          {note.applicableExams.slice(0, 3).map((exam) => (
            <Badge className="border-none bg-white/10 text-text" key={exam}>
              {exam}
            </Badge>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[rgba(255,255,255,0.05)] pt-3 text-[12px] text-[#4B5563]">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-white/5 p-3">
            <Clock3 className="h-4 w-4" />
            {note.readingTime}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-white/5 p-3">
            <Sparkles className="h-4 w-4" />
            {note.updatedAt}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-text transition hover:bg-white/12" href={noteHref}>
            <BookOpen className="h-4 w-4" />
            Read
          </Link>
          {isSample ? (
            <div className="block w-full cursor-not-allowed rounded-[8px] border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-2.5 text-center text-[13px] text-[#4B5563]">
              Coming Soon
            </div>
          ) : (
            <div className="block w-full cursor-not-allowed rounded-[8px] border border-dashed border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-2.5 text-center text-[13px] text-[#4B5563]">
              PDF unavailable
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}