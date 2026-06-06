import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, Layers3, PlayCircle, ShieldCheck, SquareStack, Trophy } from 'lucide-react';
import { Exam } from '@/data/exams';
import { notes } from '@/data/notes';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ServiceBadge } from './ServiceBadge';
import { PaperTimeline } from './PaperTimeline';
import { Tabs, type TabItem } from '@/components/ui/tabs';
import { NoteCard } from '@/components/notes/NoteCard';
import { LocalSyllabusViewer } from './LocalSyllabusViewer';

function getTips(exam: Exam): string[] {
  const tipsBySlug: Record<string, string[]> = {
    kharidar: [
      'Spend the first month on GK, basic arithmetic, and office procedures.',
      'Daily typing and computer drills matter for the final skill test.',
      'Practice old questions with a timer to build accuracy under pressure.',
    ],
    nasu: [
      'Build a strong base in governance and service law before moving to service-specific topics.',
      'Write concise answers with headings, examples, and process flow.',
      'Revise current affairs weekly and connect them to public administration.',
    ],
    'sakha-adhikrit': [
      'Paper 1 must clear 45/100, so do not treat objective preparation lightly.',
      'Keep governance, contemporary issues, and service paper in separate revision tracks.',
      'Use the new 2081/82 scoring rule to plan your score strategy deliberately.',
    ],
  };

  return tipsBySlug[exam.slug] ?? [
    'Learn the syllabus by paper, not by topic dump.',
    'Use answer frameworks: definition, analysis, example, conclusion.',
    'Keep one revision notebook for current affairs and one for service law.',
  ];
}

function getRelatedNotes(exam: Exam) {
  return notes.filter((note) => note.applicableExams.includes(exam.slug) || note.applicableExams.some((item) => exam.services.some((service) => service.slug === item)));
}

export function ExamDetailView({ exam, initialTab = 'overview' }: { exam: Exam; initialTab?: string }): JSX.Element {
  const relatedNotes = getRelatedNotes(exam);

  const tabs: TabItem[] = [
    {
      value: 'overview',
      label: 'Overview',
      content: (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit border-none bg-white/10 text-text">Exam snapshot</Badge>
                <CardTitle className="text-3xl">{exam.nameNepali}</CardTitle>
                <CardDescription>{exam.nameEnglish}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {exam.services.map((service) => (
                    <ServiceBadge key={service.slug} slug={service.slug} />
                  ))}
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted">{exam.passingCriteria}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paper flow</CardTitle>
                <CardDescription>Visual path from objective screening to final interview.</CardDescription>
              </CardHeader>
              <CardContent>
                <PaperTimeline />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Quick facts</CardTitle>
                <CardDescription>Exam structure at a glance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/5 px-4 py-3">
                  <span>Total papers</span>
                  <span className="font-semibold text-text">{exam.papers.length}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/5 px-4 py-3">
                  <span>Final interview</span>
                  <span className="font-semibold text-text">{exam.finalStage.interviewMarks}</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/5 px-4 py-3">
                  <span>Computer test</span>
                  <span className="font-semibold text-text">{exam.finalStage.hasComputerTest ? 'Yes' : 'No'}</span>
                </div>
                {exam.finalStage.computerMarks ? (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/5 px-4 py-3">
                    <span>Computer marks</span>
                    <span className="font-semibold text-text">{exam.finalStage.computerMarks}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-white/5 px-4 py-3">
                  <span>Competition</span>
                  <span className="font-semibold capitalize text-text">{exam.competitionLevel}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      value: 'syllabus',
      label: 'Syllabus',
      badge: exam.lastUpdated === '2082' ? 'New 2082' : undefined,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>Structured syllabus viewer</CardTitle>
                <CardDescription>{exam.nameEnglish} syllabus breakdown by paper and chapter.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <LocalSyllabusViewer exam={exam} />
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: 'notes',
      label: 'Notes',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended notes</CardTitle>
              <CardDescription>Curated reading set for this exam.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {relatedNotes.slice(0, 6).map((note) => (
                  <NoteCard isSample key={note.slug} note={note} position={exam.slug} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: 'questions',
      label: 'Old Questions',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Year-wise question papers</CardTitle>
            <CardDescription>Archive from 2072 to 2082 BS.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 11 }, (_, index) => 2072 + index).map((year) => (
                <div className="rounded-2xl border border-border bg-white/5 p-4" key={year}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold text-text">{year} BS</p>
                    <Badge className="border-none bg-white/10 text-muted">PDF</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">Old question paper, answer key, and revision notes.</p>
                  <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent" href="#">
                    Download paper
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      value: 'tips',
      label: 'Tips',
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Expert prep tips</CardTitle>
            <CardDescription>Specific advice tuned to this exam’s scoring pattern.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-border bg-white/5 p-5">
                {getTips(exam).map((tip) => (
                  <div className="flex gap-3" key={tip}>
                    <Trophy className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-7 text-muted">{tip}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 rounded-3xl border border-border bg-white/5 p-5 text-sm leading-7 text-muted">
                <div className="flex items-center gap-2 text-text">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  What top scorers do
                </div>
                <p>They keep paper-wise notebooks, revise old questions in cycles, and separate objective prep from subjective answer writing.</p>
                <p>For officer-level exams, they also maintain a current affairs log and a governance vocabulary sheet.</p>
                <p>For technical exams, they pair theory with practical problem-solving and service-specific rules.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exams', href: '/exams' }, { label: exam.nameNepali }]} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardHeader className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-none bg-white/10 text-text">{exam.grade}</Badge>
              <Badge className="border-none bg-white/10 text-muted">{exam.civilServiceLevel}</Badge>
              {exam.lastUpdated === '2082' ? <Badge className="border-none bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white">New 2082</Badge> : null}
            </div>
            <CardTitle className="text-4xl">{exam.nameNepali}</CardTitle>
            <CardDescription className="max-w-3xl text-base leading-8">{exam.nameEnglish} preparation hub with structured syllabus, notes, and question archives.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {exam.services.map((service) => (
                <ServiceBadge key={service.slug} slug={service.slug} />
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-muted">
                  <Layers3 className="h-4 w-4" />
                  Level
                </div>
                <p className="mt-2 text-lg font-semibold text-text capitalize">{exam.level}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-muted">
                  <CalendarDays className="h-4 w-4" />
                  Last updated
                </div>
                <p className="mt-2 text-lg font-semibold text-text">{exam.lastUpdated}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-muted">
                  <Clock3 className="h-4 w-4" />
                  Papers
                </div>
                <p className="mt-2 text-lg font-semibold text-text">{exam.papers.length}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <div className="flex items-center gap-2 text-muted">
                  <SquareStack className="h-4 w-4" />
                  Vacancies
                </div>
                <p className="mt-2 text-lg font-semibold text-text">{exam.approxVacancies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/10">
          <CardHeader>
            <CardTitle>Passing criteria</CardTitle>
            <CardDescription>Focus on the rule that matters most for this cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-text">{exam.passingCriteria}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <p className="text-sm text-muted">Written stage</p>
                <p className="mt-1 text-lg font-semibold text-text">{exam.papers.reduce((sum, paper) => sum + paper.totalMarks, 0)} marks</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/5 p-4">
                <p className="text-sm text-muted">Final stage</p>
                <p className="mt-1 text-lg font-semibold text-text">{exam.finalStage.interviewMarks}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-[linear-gradient(135deg,rgba(181,23,43,0.18),rgba(0,53,128,0.18))] p-4 text-sm leading-7 text-text">
              {exam.finalStage.description}
            </div>
          </CardContent>
        </Card>
      </section>

      <Tabs defaultValue={initialTab} items={tabs} />
    </div>
  );
}