"use client";

import { useEffect, useMemo, useState } from 'react';
import { getExamBySlug } from '@/data/exams';
import { getUploadedNotes, type UploadedNoteRecord } from '@/lib/content-storage';
import { NoteReader, type NoteReaderModel } from './NoteReader';
import { slugifySegment } from '@/data/notes';

function buildViewModel(note: UploadedNoteRecord, position: string): NoteReaderModel {
  const exam = getExamBySlug(position);

  return {
    title: note.title,
    subtitle: note.categoryLabel ?? note.category,
    description: note.description,
    category: note.categoryLabel ?? note.category,
    position,
    positionLabel: exam?.nameNepali ?? position,
    readingTime: note.fileName ? `File: ${note.fileName}` : 'Uploaded note',
    updatedAt: note.uploadedAt,
    pdfUrl: note.fileUrl,
  };
}

export function UploadedNoteDetail({ position, slug }: { position: string; slug: string }): JSX.Element {
  const [uploadedNotes, setUploadedNotes] = useState<UploadedNoteRecord[]>([]);

  useEffect(() => {
    const syncNotes = (): void => {
      setUploadedNotes(getUploadedNotes());
    };

    syncNotes();
    window.addEventListener('storage', syncNotes);

    return () => window.removeEventListener('storage', syncNotes);
  }, []);

  const note = useMemo(
    () =>
      uploadedNotes.find((item) => {
        const noteSlug = slugifySegment(item.title);
        const examSlugs = item.examSlugs ?? item.applicableExams ?? [];
        const matchesPosition = examSlugs.some((examSlug) => slugifySegment(examSlug) === slugifySegment(position));

        return noteSlug === slug && matchesPosition;
      }) ?? null,
    [position, slug, uploadedNotes],
  );

  if (!note) {
    return <div className="rounded-3xl border border-border bg-surface/80 p-6 text-muted">Uploaded note not found.</div>;
  }

  return <NoteReader note={buildViewModel(note, position)} />;
}