import { exams } from '../data/exams';

const API_BASE = '/api';

const examSlugs = exams.map((exam) => exam.slug);

function parseArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fall through to comma-separated parsing.
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseChapters(value) {
  return parseArray(value)
    .map((chapter, index) => {
      if (chapter && typeof chapter === 'object' && 'title' in chapter) {
        return {
          id: Number(chapter.id ?? index + 1),
          title: String(chapter.title ?? '').trim(),
        };
      }

      return {
        id: index + 1,
        title: String(chapter ?? '').trim(),
      };
    })
    .filter((chapter) => chapter.title);
}

function normalizeDifficulty(value) {
  if (typeof value === 'string') {
    const normalized = value.toLowerCase();

    if (['easy', 'medium', 'hard'].includes(normalized)) {
      return normalized;
    }
  }

  if (value === 1 || value === '1') {
    return 'easy';
  }

  if (value === 3 || value === '3') {
    return 'hard';
  }

  return 'medium';
}

function formatUploadedAt(record) {
  return record.created_at || record.updated_at || new Date().toISOString();
}

function getFallbackSyllabusChapters(record) {
  const exam = exams.find((item) => item.slug === record.exam_id);
  const paper = exam?.papers?.find((item) => Number(item.number) === Number(record.paper));

  if (!paper) {
    return [];
  }

  return paper.topics.map((topic, index) => ({
    id: index + 1,
    title: topic.title,
  }));
}

export function mapNoteRecord(record) {
  const parsedExamIds = parseArray(record.exam_ids);
  const normalizedExamSlugs = parsedExamIds.length === 0 || parsedExamIds.includes('all') ? examSlugs : parsedExamIds;

  return {
    id: String(record.id),
    title: record.title,
    category: record.category,
    categoryLabel: record.category,
    difficulty: normalizeDifficulty(record.difficulty),
    examSlugs: normalizedExamSlugs,
    applicableExams: normalizedExamSlugs,
    chapters: parseChapters(record.chapters),
    fileUrl: record.file_url,
    fileName: record.file_path ? String(record.file_path).split('/').pop() : 'note.pdf',
    description: record.description || '',
    uploadedAt: formatUploadedAt(record),
    uploadedBy: 'admin',
    color: record.color || '#DC143C',
  };
}

export function mapSyllabusRecord(record) {
  const chapters = parseChapters(record.chapters);

  return {
    id: String(record.id),
    exam: record.exam_id,
    examName: record.exam_name,
    paper: Number(record.paper || 1),
    paperName: record.paper_name || record.title,
    service: record.service || 'all',
    fileUrl: record.file_url,
    chapters: chapters.length > 0 ? chapters : getFallbackSyllabusChapters(record),
    uploadedAt: formatUploadedAt(record),
    uploadedBy: 'admin',
    description: record.description || '',
  };
}

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchNotesFromApi() {
  const records = await fetchJson('/notes');
  return Array.isArray(records) ? records.map(mapNoteRecord) : [];
}

export async function fetchSyllabiFromApi() {
  const records = await fetchJson('/syllabus');
  return Array.isArray(records) ? records.map(mapSyllabusRecord) : [];
}
