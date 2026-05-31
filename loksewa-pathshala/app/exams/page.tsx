import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ExamExplorer } from '@/components/exam/ExamExplorer';
import { exams } from '@/data/exams';

export const metadata = {
  title: 'Loksewa Exam Questions | Past Papers Nepal',
  description: 'Loksewa past exam questions and answers for Nepal PSC preparation.',
  keywords: 'loksewa exam questions, PSC past papers, loksewa questions Nepal',
};

export default function ExamsPage(): JSX.Element {
  return (
    <div className="space-y-8 py-20">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exams' }]} />
      <section className="space-y-3 text-center">
        <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold leading-tight text-[#F9FAFB]">Browse every major Loksewa category</h1>
        <div className="mx-auto h-[3px] w-[60px] rounded-[2px] bg-[linear-gradient(90deg,#DC143C,#9B1C1C)]" />
        <p className="mx-auto max-w-3xl text-[15px] text-[#6B7280]">Filter by level, service group, or paper count to jump straight to the exam track you want.</p>
      </section>
      <Suspense fallback={<div className="rounded-3xl border border-border bg-white/5 p-6 text-muted">Loading exam explorer...</div>}>
        <ExamExplorer exams={exams} />
      </Suspense>
    </div>
  );
}