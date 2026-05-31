import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExamBySlug, exams } from '@/data/exams';
import { ExamDetailView } from '@/components/exam/ExamDetailView';

export function generateStaticParams(): Array<{ slug: string }> {
  return exams.map((exam) => ({ slug: exam.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const exam = getExamBySlug(params.slug);
  const baseUrl = 'https://loksewa.qzz.io';
  const pageUrl = `${baseUrl}/exams/${params.slug}`;

  if (!exam) {
    return {
      title: 'Exam | LokSewa Pathshala',
      description: 'Loksewa exam detail page.',
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  const title = `${exam.nameNepali} (${exam.nameEnglish}) | LokSewa Exam`;
  const description = `${exam.passingCriteria} Complete syllabus, paper structure, and preparation details for ${exam.nameEnglish}.`;
  const keywords = [
    'loksewa exam',
    'nepal psc exam',
    `${exam.nameEnglish} syllabus`,
    `${exam.nameNepali} loksewa`,
    'loksewa preparation nepal',
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'article',
      siteName: 'LokSewa Pathshala',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ExamPage({ params, searchParams }: { params: { slug: string }; searchParams?: { tab?: string } }): JSX.Element {
  const exam = getExamBySlug(params.slug);

  if (!exam) {
    notFound();
  }

  return <ExamDetailView exam={exam} initialTab={searchParams?.tab} />;
}