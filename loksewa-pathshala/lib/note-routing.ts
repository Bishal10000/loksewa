import { type NoteItem } from '@/data/notes';
import { type UploadedNoteRecord } from '@/lib/content-storage';

export function getPrimaryPositionSlug(examSlugs: readonly string[] | undefined): string {
  return (examSlugs?.[0] ?? 'general').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function slugifySegment(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function getNoteRoute(position: string, slug: string): string {
  return `/notes/${slugifySegment(position)}/${slugifySegment(slug)}`;
}

export function getSampleNoteRoute(note: Pick<NoteItem, 'slug' | 'applicableExams'>, position?: string): string {
  return getNoteRoute(position ?? note.applicableExams[0] ?? 'general', note.slug);
}

export function getUploadedNoteRoute(note: Pick<UploadedNoteRecord, 'title' | 'examSlugs' | 'applicableExams'>, position?: string): string {
  return getNoteRoute(position ?? note.examSlugs?.[0] ?? note.applicableExams?.[0] ?? 'general', note.title);
}

export function matchesNotePosition(position: string, examSlugs: readonly string[]): boolean {
  const normalizedPosition = slugifySegment(position);

  return examSlugs.some((slug) => slugifySegment(slug) === normalizedPosition);
}