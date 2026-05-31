import type { MetadataRoute } from 'next';
import { exams } from '@/data/exams';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loksewa.qzz.io';

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/exams`, lastModified: new Date() },
    { url: `${baseUrl}/notes`, lastModified: new Date() },
    { url: `${baseUrl}/syllabus`, lastModified: new Date() },
    { url: `${baseUrl}/results`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    ...exams.map((exam) => ({ url: `${baseUrl}/exams/${exam.slug}`, lastModified: new Date() })),
  ];
}

