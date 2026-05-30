import { notFound } from 'next/navigation';
import { getExamBySlug, exams } from '@/data/exams';
import { ExamDetailView } from '@/components/exam/ExamDetailView';

export function generateStaticParams(): Array<{ slug: string }> {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const exam = getExamBySlug(params.slug);

  return {
    title: exam ? `${exam.nameNepali} (${exam.nameEnglish})` : 'Exam',
    description: exam?.passingCriteria ?? 'Loksewa exam detail page.',
  };
}

export default function ExamPage({ params, searchParams }: { params: { slug: string }; searchParams?: { tab?: string } }): JSX.Element {
  const exam = getExamBySlug(params.slug);

  if (!exam) {
    notFound();
  }

  return <ExamDetailView exam={exam} initialTab={searchParams?.tab} />;
}