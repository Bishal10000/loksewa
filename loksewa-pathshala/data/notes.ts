export type NoteCategory =
  | 'GK'
  | 'Samwidhan'
  | 'Shasan Pranali'
  | 'Samsamayik'
  | 'English'
  | 'Math/Aptitude'
  | 'Office Management'
  | 'Laws & Acts';

export interface NoteItem {
  slug: string;
  titleNepali: string;
  titleEnglish: string;
  category: NoteCategory;
  summary: string;
  applicableExams: string[];
  updatedAt: string;
  readingTime: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  downloadHref: string;
}

export const noteCategories: NoteCategory[] = [
  'GK',
  'Samwidhan',
  'Shasan Pranali',
  'Samsamayik',
  'English',
  'Math/Aptitude',
  'Office Management',
  'Laws & Acts',
];

export const notes: NoteItem[] = [
  {
    slug: 'nepal-gk-rapid-revision',
    titleNepali: 'नेपाल सामान्य ज्ञान द्रुत पुनरावृत्ति',
    titleEnglish: 'Nepal GK Rapid Revision',
    category: 'GK',
    summary: 'High-yield facts on geography, history, provinces, districts, and constitutional basics.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'computer-operator'],
    updatedAt: '2082 Ashadh 20',
    readingTime: '12 min',
    difficulty: 'easy',
    downloadHref: '#',
  },
  {
    slug: 'constitution-core-points',
    titleNepali: 'संविधानका मुख्य बुँदा',
    titleEnglish: 'Constitution Core Points',
    category: 'Samwidhan',
    summary: 'Federal structure, state organs, fundamental rights, and amendment pathway in exam-ready form.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'upa-sachib', 'saha-sachib'],
    updatedAt: '2082 Ashadh 20',
    readingTime: '18 min',
    difficulty: 'medium',
    downloadHref: '#',
  },
  {
    slug: 'governance-system-notes',
    titleNepali: 'शासन प्रणाली नोट्स',
    titleEnglish: 'Governance System Notes',
    category: 'Shasan Pranali',
    summary: 'Federalism, coordination, service delivery, transparency, and accountability in one clean package.',
    applicableExams: ['nasu', 'sakha-adhikrit', 'upa-sachib', 'saha-sachib', 'bidyalaya-nirikshak'],
    updatedAt: '2082',
    readingTime: '16 min',
    difficulty: 'medium',
    downloadHref: '#',
  },
  {
    slug: 'current-affairs-dashboard',
    titleNepali: 'समसामयिक विषय ड्यासबोर्ड',
    titleEnglish: 'Current Affairs Dashboard',
    category: 'Samsamayik',
    summary: 'Latest national developments, policy changes, economy headlines, and international relations.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'upa-sachib', 'tathyanka-adhikrit'],
    updatedAt: '2082',
    readingTime: '14 min',
    difficulty: 'medium',
    downloadHref: '#',
  },
  {
    slug: 'english-grammar-for-psc',
    titleNepali: 'PSC का लागि अंग्रेजी व्याकरण',
    titleEnglish: 'English Grammar for PSC',
    category: 'English',
    summary: 'Sentence structure, tenses, voice, narration, articles, prepositions, and error spotting.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'computer-operator'],
    updatedAt: '2082',
    readingTime: '20 min',
    difficulty: 'easy',
    downloadHref: '#',
  },
  {
    slug: 'aptitude-formulas-sheet',
    titleNepali: 'अभिक्षमता सूत्र शीट',
    titleEnglish: 'Aptitude Formula Sheet',
    category: 'Math/Aptitude',
    summary: 'Percentages, ratios, averages, time-work, profit-loss, and speed-distance shortcuts.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'prabidhik-sahayak', 'computer-operator'],
    updatedAt: '2082',
    readingTime: '10 min',
    difficulty: 'easy',
    downloadHref: '#',
  },
  {
    slug: 'office-management-handbook',
    titleNepali: 'कार्यालय व्यवस्थापन ह्यान्डबुक',
    titleEnglish: 'Office Management Handbook',
    category: 'Office Management',
    summary: 'File movement, registry, minute writing, dispatch, meeting protocol, and office workflow basics.',
    applicableExams: ['kharidar', 'nasu', 'sakha-adhikrit', 'prabidhik-sahayak', 'computer-operator'],
    updatedAt: '2082 Ashadh 20',
    readingTime: '15 min',
    difficulty: 'medium',
    downloadHref: '#',
  },
  {
    slug: 'public-service-laws',
    titleNepali: 'लोकसेवा सम्बन्धी ऐनहरू',
    titleEnglish: 'Public Service Laws & Acts',
    category: 'Laws & Acts',
    summary: 'Key acts, rules, and procedural checkpoints repeatedly tested across officer and assistant level exams.',
    applicableExams: ['nasu', 'sakha-adhikrit', 'upa-sachib', 'saha-sachib', 'naapi'],
    updatedAt: '2082',
    readingTime: '22 min',
    difficulty: 'advanced',
    downloadHref: '#',
  },
  {
    slug: 'accounts-audit-primer',
    titleNepali: 'लेखा तथा लेखापरीक्षण परिचय',
    titleEnglish: 'Accounts and Audit Primer',
    category: 'Laws & Acts',
    summary: 'Accounting flow, audit checkpoints, internal controls, and public finance language for Lekha service.',
    applicableExams: ['sakha-adhikrit-lekha', 'upa-sachib', 'saha-sachib'],
    updatedAt: '2082',
    readingTime: '18 min',
    difficulty: 'advanced',
    downloadHref: '#',
  },
];

export function getNotesByCategory(category?: string): NoteItem[] {
  return category ? notes.filter((note) => note.category === category) : notes;
}

export function getNoteBySlug(slug: string): NoteItem | undefined {
  return notes.find((note) => note.slug === slug);
}