import { Hero } from '@/components/home/Hero';
import { StatsBar } from '@/components/home/StatsBar';
import { ExamGrid } from '@/components/home/ExamGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { exams } from '@/data/exams';
import Link from 'next/link';
import { ArrowRight, BookMarked, Layers3, Sparkles } from 'lucide-react';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-20">
      <Hero />
      <StatsBar />

      <section className="space-y-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-[#F9FAFB]">Available Exam Positions</h2>
          <div className="mx-auto mt-3 h-[3px] w-[60px] rounded-[2px] bg-[linear-gradient(90deg,#DC143C,#9B1C1C)]" />
          <p className="mt-5 text-[15px] text-[#6B7280]">Browse the most important Loksewa positions, grouped by level and service so you can jump directly to the track you need.</p>
        </div>
        <ExamGrid />
      </section>

      <section className="grid gap-6 py-20 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <BookMarked className="h-5 w-5 text-accent" />
            <CardTitle>Organized notes</CardTitle>
            <CardDescription>GK, constitution, governance, math, English, and service laws in one clean library.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="/notes">
              Open notes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Layers3 className="h-5 w-5 text-accent" />
            <CardTitle>Paper-wise syllabus</CardTitle>
            <CardDescription>Every major exam and service group mapped into readable paper-by-paper structure.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="/syllabus">
              View syllabus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="h-5 w-5 text-accent" />
            <CardTitle>Built for serious aspirants</CardTitle>
            <CardDescription>Premium UI, mobile-first navigation, and data-driven exam discovery.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="/about">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-[#F9FAFB]">Study Materials</h2>
          <div className="mx-auto mt-3 h-[3px] w-[60px] rounded-[2px] bg-[linear-gradient(90deg,#DC143C,#9B1C1C)]" />
          <p className="mt-5 text-[15px] text-[#6B7280]">Open the syllabus, exam notes, and guided study paths for the most searched preparation tracks.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {exams.slice(0, 3).map((exam) => (
            <Link className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent" href={`/exams/${exam.slug}`} key={exam.slug}>
              <Card className="border border-border bg-white/6 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-glow">
                <CardHeader>
                  <BadgeRow examSlug={exam.slug} />
                  <CardTitle>{exam.nameNepali}</CardTitle>
                  <CardDescription>{exam.nameEnglish}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted">{exam.passingCriteria}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:gap-3">
                    Open exam
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function BadgeRow({ examSlug }: { examSlug: string }): JSX.Element {
  return <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-muted">{examSlug}</span>;
}