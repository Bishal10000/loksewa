"use client";

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FileText, Search, X } from 'lucide-react';
import { FilterChip } from '@/components/ui/filter-chip';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NoteCard } from './NoteCard';
import { getUploadedNotes, type UploadedNoteRecord } from '@/lib/content-storage';
import { notes as defaultSampleNotes, type NoteItem } from '@/data/notes';
import { getUploadedNoteRoute } from '@/lib/note-routing';

type SampleNote = NoteItem & { categorySlug: string };

const categoryFilters = [
  { value: 'gk', label: 'GK' },
  { value: 'constitution', label: 'Constitution' },
  { value: 'governance', label: 'Governance' },
  { value: 'contemporary', label: 'Current Affairs' },
  { value: 'aptitude', label: 'Math / Aptitude' },
  { value: 'office', label: 'Office Management' },
  { value: 'law', label: 'Law & Acts' },
  { value: 'english', label: 'English' },
  { value: 'other', label: 'Other' },
];

const examFilters = [
  { value: 'kharidar', label: 'Kharidar' },
  { value: 'nasu', label: 'NaSu' },
  { value: 'sakha-adhikrit', label: 'Section Officer' },
  { value: 'upa-sachib', label: 'Upa Sachib' },
  { value: 'computer-operator', label: 'Computer Operator' },
  { value: 'prabidhik-sahayak', label: 'Technical Assistant' },
];

const sampleCategoryMap: Record<string, string> = {
  GK: 'gk',
  Samwidhan: 'constitution',
  'Shasan Pranali': 'governance',
  Samsamayik: 'contemporary',
  English: 'english',
  'Math/Aptitude': 'aptitude',
  'Office Management': 'office',
  'Laws & Acts': 'law',
};

const sampleCategoryLabelMap: Record<string, string> = {
  gk: 'GK',
  constitution: 'Constitution',
  governance: 'Governance',
  contemporary: 'Current Affairs',
  aptitude: 'Math / Aptitude',
  office: 'Office Management',
  law: 'Law & Acts',
  english: 'English',
  other: 'Other',
};

const adminCategoryLabelMap: Record<string, string> = {
  gk: 'General Knowledge',
  constitution: 'Constitution',
  governance: 'Governance',
  contemporary: 'Current Affairs',
  aptitude: 'Math / Aptitude',
  office: 'Office Management',
  law: 'Law & Acts',
  english: 'English',
  other: 'Other',
};

const difficultyLabelMap: Record<UploadedNoteRecord['difficulty'], string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

function normalizeSampleNotes(sampleNotes: NoteItem[]): SampleNote[] {
  return sampleNotes.map((note) => ({
    ...note,
    categorySlug: sampleCategoryMap[note.category] ?? 'other',
  }));
}

function formatExamLabel(slug: string): string {
  const labels: Record<string, string> = {
    kharidar: 'Kharidar',
    nasu: 'NaSu',
    'sakha-adhikrit': 'Section Officer',
    'upa-sachib': 'Upa Sachib',
    'computer-operator': 'Computer Operator',
    'prabidhik-sahayak': 'Technical Assistant',
  };

  return labels[slug] ?? slug;
}

function UploadedNoteCard({ note }: { note: UploadedNoteRecord }): JSX.Element {
  const exams = note.examSlugs ?? note.applicableExams ?? [];
  const noteHref = getUploadedNoteRoute(note);

  return (
    <Card className="h-full rounded-[14px] border-white/10 bg-surface/90 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <CardHeader className="space-y-4 p-6 pb-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-none bg-emerald-500/15 text-emerald-200">NEW</Badge>
          <Badge className="border-none bg-white/10 text-text">{adminCategoryLabelMap[note.category] ?? note.categoryLabel ?? note.category}</Badge>
          <Badge className="border-none bg-white/10 text-muted">{difficultyLabelMap[note.difficulty]}</Badge>
        </div>
        <div>
          <CardTitle className="text-[17px] font-bold leading-[1.4] text-[#F9FAFB]">
            <Link className="transition hover:text-accent" href={noteHref}>
              {note.title}
            </Link>
          </CardTitle>
          <CardDescription className="mt-2 text-[13px] leading-6 text-[#6B7280]">{note.description || 'Uploaded study note'}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {exams.slice(0, 4).map((examSlug) => (
            <Badge className="border-none bg-white/10 text-text" key={examSlug}>
              {formatExamLabel(examSlug)}
            </Badge>
          ))}
        </div>

        <Link
          className="mt-4 block w-full rounded-[8px] border border-[rgba(220,20,60,0.3)] bg-[rgba(220,20,60,0.1)] p-[11px] text-[13px] font-semibold text-[#DC143C] transition hover:bg-[rgba(220,20,60,0.2)]"
          href={noteHref}
        >
          <FileText className="h-4 w-4" />
          View PDF
        </Link>
      </CardContent>
    </Card>
  );
}

export function NotesExplorer({ sampleNotes = defaultSampleNotes }: { sampleNotes?: NoteItem[] }): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [uploadedNotes, setUploadedNotes] = useState<UploadedNoteRecord[]>([]);

  const category = searchParams.get('category') ?? 'all';
  const query = searchParams.get('q') ?? '';
  const exam = searchParams.get('exam') ?? 'all';

  const normalizedSampleNotes = useMemo(() => normalizeSampleNotes(sampleNotes), [sampleNotes]);

  useEffect(() => {
    const syncNotes = (): void => {
      setUploadedNotes(getUploadedNotes());
    };

    syncNotes();
    window.addEventListener('storage', syncNotes);

    return () => window.removeEventListener('storage', syncNotes);
  }, []);

  const filteredUploadedNotes = useMemo(
    () =>
      uploadedNotes.filter((note) => {
        const exams = note.examSlugs ?? note.applicableExams ?? [];
        const matchesCategory = category === 'all' || note.category === category || note.categoryLabel === category;
        const matchesExam = exam === 'all' || exams.includes(exam);
        const matchesQuery = !query || `${note.title} ${note.description} ${note.categoryLabel ?? note.category}`.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesExam && matchesQuery;
      }),
    [uploadedNotes, category, exam, query],
  );

  const filteredSampleNotes = useMemo(
    () =>
      normalizedSampleNotes.filter((note) => {
        const matchesCategory = category === 'all' || note.categorySlug === category;
        const matchesExam = exam === 'all' || note.applicableExams.includes(exam);
        const matchesQuery = !query || `${note.titleNepali} ${note.titleEnglish} ${note.summary}`.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesExam && matchesQuery;
      }),
    [normalizedSampleNotes, category, exam, query],
  );

  const updateParams = (updates: Record<string, string>): void => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel sticky top-24 z-10 space-y-4 rounded-3xl p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input className="pl-11" onChange={(event) => updateParams({ q: event.target.value })} placeholder="Search notes, topics, or exam use" value={query} />
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          <Badge className="border-none bg-white/10 text-text">Category</Badge>
          <FilterChip active={category === 'all'} onClick={() => updateParams({ category: 'all' })}>
            All
          </FilterChip>
          {categoryFilters.map((item) => (
            <FilterChip active={category === item.value} key={item.value} onClick={() => updateParams({ category: item.value })}>
              {item.label}
            </FilterChip>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          <Badge className="border-none bg-white/10 text-text">Exam</Badge>
          <FilterChip active={exam === 'all'} onClick={() => updateParams({ exam: 'all' })}>
            All exams
          </FilterChip>
          {examFilters.map((item) => (
            <FilterChip active={exam === item.value} key={item.value} onClick={() => updateParams({ exam: item.value })}>
              {item.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge className="border-none bg-emerald-500/15 text-emerald-200">Uploaded</Badge>
          <h2 className="text-lg font-semibold text-text">Admin-uploaded notes</h2>
        </div>
        {filteredUploadedNotes.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface/80 p-6 text-muted">No uploaded notes match the current filters yet.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredUploadedNotes.map((note) => (
              <UploadedNoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge className="border-none bg-white/10 text-text">Sample Notes</Badge>
          <h2 className="text-lg font-semibold text-text">Coming Soon</h2>
        </div>
        {filteredSampleNotes.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface/80 p-6 text-muted">No sample notes match the current filters.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {filteredSampleNotes.map((note) => (
              <NoteCard isSample key={note.slug} note={note} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}