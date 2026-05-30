import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { exams } from '@/data/exams';
import { SyllabusAccordion } from '@/components/exam/SyllabusAccordion';

export default function SyllabusPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Syllabus' }]} />
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Syllabus hub</p>
        <h1 className="font-display text-4xl font-semibold text-text">Every syllabus in one place</h1>
        <p className="max-w-3xl text-base leading-8 text-muted">Clean paper-by-paper views with update badges for the newest rules.</p>
      </section>

      <div className="space-y-6">
        {exams.map((exam) => (
          <Card key={exam.slug}>
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-none bg-white/10 text-text">{exam.grade}</Badge>
                {exam.slug.includes('sakha-adhikrit') || exam.lastUpdated === '2082' ? (
                  <Badge className="border-none bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white">New 2082</Badge>
                ) : null}
              </div>
              <CardTitle>{exam.nameNepali}</CardTitle>
              <CardDescription>{exam.nameEnglish}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <SyllabusAccordion exam={exam} />
              <div className="flex flex-wrap items-center gap-3">
                <Link className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] px-4 py-2 text-sm font-semibold text-white" href={`/exams/${exam.slug}`}>
                  View full exam page
                </Link>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/3 px-4 py-2 text-sm font-semibold text-gray-500">
                  PDF Coming Soon
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}