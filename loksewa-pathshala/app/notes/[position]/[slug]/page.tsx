import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteReader } from '@/components/notes/NoteReader';
import { UploadedNoteDetail } from '@/components/notes/UploadedNoteDetail';
import { getExamBySlug } from '@/data/exams';
import { getNoteByPositionAndSlug, notes } from '@/data/notes';

export function generateStaticParams(): Array<{ position: string; slug: string }> {
  return notes.flatMap((note) =>
    note.applicableExams.map((position) => ({
      position,
      slug: note.slug,
    })),
  );
}

export function generateMetadata({ params }: { params: { position: string; slug: string } }): Metadata {
  const note = getNoteByPositionAndSlug(params.position, params.slug);
  const exam = getExamBySlug(params.position);
  const pageUrl = `https://loksewa.qzz.io/notes/${params.position}/${params.slug}`;

  if (!note) {
    return {
      title: 'Note | LokSewa Pathshala',
      description: 'Loksewa note page.',
      alternates: {
        canonical: pageUrl,
      },
    };
  }

  const positionLabel = exam?.nameNepali ?? params.position;
  const title = `${note.titleNepali} | ${positionLabel} Notes | LokSewa Pathshala`;
  const description = `${note.summary} Read the note details and embedded PDF viewer for ${positionLabel}.`;

  return {
    title,
    description,
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

export default function NotePage({ params }: { params: { position: string; slug: string } }): JSX.Element {
  const note = getNoteByPositionAndSlug(params.position, params.slug);

  if (note) {
    const exam = getExamBySlug(params.position);

    return (
      <NoteReader
        note={{
          title: note.titleNepali,
          subtitle: note.titleEnglish,
          description: note.summary,
          category: note.category,
          position: params.position,
          positionLabel: exam?.nameNepali ?? params.position,
          readingTime: note.readingTime,
          updatedAt: note.updatedAt,
          pdfUrl: null,
        }}
      />
    );
  }

  if (!params.position || !params.slug) {
    notFound();
  }

  return <UploadedNoteDetail position={params.position} slug={params.slug} />;
}