export const NOTE_STORAGE_KEY = 'loksewa_notes';
export const SYLLABUS_STORAGE_KEY = 'loksewa_syllabi';

export type UploadedNoteRecord = {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  examSlugs?: string[];
  applicableExams?: string[];
  description: string;
  fileUrl: string;
  fileName?: string;
  uploadedAt: string;
  uploadedBy: string;
};

export type UploadedSyllabusChapter = {
  id: number;
  title: string;
};

export type UploadedSyllabusRecord = {
  id: string;
  exam: string;
  examName: string;
  paper: number;
  paperName: string;
  service: string;
  fileUrl: string;
  chapters: UploadedSyllabusChapter[];
  uploadedAt: string;
  uploadedBy: string;
};

function readStoredArray<T>(key: string): T[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function getUploadedNotes(): UploadedNoteRecord[] {
  return readStoredArray<UploadedNoteRecord>(NOTE_STORAGE_KEY);
}

export function getUploadedSyllabi(): UploadedSyllabusRecord[] {
  return readStoredArray<UploadedSyllabusRecord>(SYLLABUS_STORAGE_KEY);
}