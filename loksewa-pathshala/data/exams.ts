import { serviceMeta, type ServiceSlug } from './services';

export interface Topic {
  title: string;
  subtopics: string[];
}

export interface Paper {
  number: number;
  name: string;
  type: 'objective' | 'subjective';
  totalMarks: number;
  duration: string;
  topics: Topic[];
}

export interface Service {
  slug: ServiceSlug;
  nameNepali: string;
  nameEnglish: string;
}

export interface FinalStage {
  hasComputerTest: boolean;
  interviewMarks: string;
  computerMarks?: string;
  description: string;
}

export interface Exam {
  slug: string;
  nameNepali: string;
  nameEnglish: string;
  level: 'officer' | 'assistant' | 'technical';
  grade: string;
  civilServiceLevel: string;
  qualification: string;
  services: Service[];
  papers: Paper[];
  finalStage: FinalStage;
  passingCriteria: string;
  approxVacancies: string;
  competitionLevel: 'extreme' | 'high' | 'moderate';
  lastUpdated: string;
  syllabusFileUrl?: string | null;
}

const generalAptitudeTopics: Topic[] = [
  { title: 'Logical reasoning and analytical ability', subtopics: ['Series', 'Coding-decoding', 'Direction sense', 'Puzzles'] },
  { title: 'Quantitative aptitude', subtopics: ['Ratio', 'Percentage', 'Average', 'Time and work'] },
  { title: 'General awareness', subtopics: ['Current affairs', 'Nepal geography', 'Constitution basics', 'Government structure'] },
];

const governanceTopics: Topic[] = [
  { title: 'Governance system', subtopics: ['Federal structure', 'Constitutional organs', 'Public administration', 'Policy cycle'] },
  { title: 'Administration and ethics', subtopics: ['Civil service values', 'Transparency', 'Accountability', 'Citizen service'] },
  { title: 'Development and public finance', subtopics: ['Planning', 'Budgeting', 'Monitoring', 'Service delivery'] },
];

const contemporaryTopics: Topic[] = [
  { title: 'Current national issues', subtopics: ['Economy', 'Social inclusion', 'Infrastructure', 'Digital Nepal'] },
  { title: 'International context', subtopics: ['Diplomacy', 'Global organizations', 'Regional cooperation', 'Migration'] },
  { title: 'Essay and analytical writing', subtopics: ['Structure', 'Evidence', 'Argumentation', 'Presentation'] },
];

const serviceAdministrationTopics: Topic[] = [
  { title: 'Public administration in Nepal', subtopics: ['Ministries', 'District administration', 'Local governance', 'Service flow'] },
  { title: 'Relevant laws and procedures', subtopics: ['Public Service Act', 'Rules and regulations', 'Office procedure', 'Records management'] },
  { title: 'Service ethics and case studies', subtopics: ['Decision-making', 'Conflicts of interest', 'Grievance handling', 'Citizen charter'] },
];

const accountsTopics: Topic[] = [
  { title: 'Accounting fundamentals', subtopics: ['Journal', 'Ledger', 'Trial balance', 'Final accounts'] },
  { title: 'Audit and public finance', subtopics: ['Internal control', 'Audit process', 'Budget execution', 'Financial reporting'] },
  { title: 'Rules and compliance', subtopics: ['Financial administration', 'Procurement', 'Treasury', 'Liability'] },
];

const foreignAffairsTopics: Topic[] = [
  { title: 'Diplomacy and protocol', subtopics: ['Courtesy practices', 'Treaties', 'International law', 'State protocol'] },
  { title: 'Foreign policy of Nepal', subtopics: ['Neighborhood policy', 'Multilateral relations', 'Economic diplomacy', 'Diaspora'] },
  { title: 'Global issues', subtopics: ['UN system', 'Climate diplomacy', 'Trade blocs', 'Peacekeeping'] },
];

const judicialTopics: Topic[] = [
  { title: 'Legal system and jurisprudence', subtopics: ['Court hierarchy', 'Procedural law', 'Evidence', 'Interpretation'] },
  { title: 'Constitutional and criminal law', subtopics: ['Fundamental rights', 'Criminal justice', 'Remedies', 'Judicial independence'] },
  { title: 'Judicial ethics', subtopics: ['Impartiality', 'Confidentiality', 'Case management', 'Decision drafting'] },
];

const parliamentaryTopics: Topic[] = [
  { title: 'Parliamentary procedure', subtopics: ['Sessions', 'Agenda', 'Rules of debate', 'Voting'] },
  { title: 'Legislative drafting', subtopics: ['Bill structure', 'Committee process', 'Amendments', 'Briefing notes'] },
  { title: 'Research and records', subtopics: ['Archives', 'Reference management', 'Question hour', 'Committee support'] },
];

const technicalTopics: Topic[] = [
  { title: 'Subject fundamentals', subtopics: ['Core theory', 'Standards', 'Terminology', 'Applied concepts'] },
  { title: 'Practical applications', subtopics: ['Field methods', 'Tools', 'Reports', 'Troubleshooting'] },
  { title: 'Service-specific regulations', subtopics: ['Codes', 'Safety', 'Ethics', 'Quality assurance'] },
];

const computerTopics: Topic[] = [
  { title: 'Basic computer operations', subtopics: ['File management', 'Shortcut keys', 'Typing practice', 'Windows basics'] },
  { title: 'Office suite and data entry', subtopics: ['Word processing', 'Spreadsheet basics', 'Presentation', 'Form filling'] },
  { title: 'Practical speed test', subtopics: ['Accuracy', '15-minute format', 'Nepali/English typing', 'Keyboard familiarity'] },
];

const objectivePaper: Paper = {
  number: 1,
  name: 'Paper 1: Objective Aptitude + GK',
  type: 'objective',
  totalMarks: 100,
  duration: '1 hr 30 min',
  topics: generalAptitudeTopics,
};

const governancePaper: Paper = {
  number: 2,
  name: 'Paper 2: Governance System',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: governanceTopics,
};

const contemporaryPaper: Paper = {
  number: 3,
  name: 'Paper 3: Contemporary Issues',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: contemporaryTopics,
};

const servicePaperPrasasan: Paper = {
  number: 4,
  name: 'Paper 4: Service Group - Administration',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: serviceAdministrationTopics,
};

const servicePaperLekha: Paper = {
  number: 4,
  name: 'Paper 4: Service Group - Accounts / Audit',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: accountsTopics,
};

const servicePaperPararastra: Paper = {
  number: 4,
  name: 'Paper 4: Service Group - Foreign Affairs',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: foreignAffairsTopics,
};

const servicePaperNyaya: Paper = {
  number: 4,
  name: 'Paper 4: Service Group - Judicial Studies',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: judicialTopics,
};

const servicePaperSansad: Paper = {
  number: 4,
  name: 'Paper 4: Service Group - Parliamentary Studies',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: parliamentaryTopics,
};

const naSuObjective: Paper = {
  number: 1,
  name: 'Paper 1: Objective Prelim',
  type: 'objective',
  totalMarks: 100,
  duration: '1 hr 30 min',
  topics: generalAptitudeTopics,
};

const naSuSubjective: Paper = {
  number: 2,
  name: 'Paper 2: Governance and Service Laws',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: [
    ...governanceTopics,
    { title: 'Service delivery systems', subtopics: ['Case handling', 'Office communication', 'Public interface', 'File movement'] },
  ],
};

const naSuServicePaper: Paper = {
  number: 3,
  name: 'Paper 3: Service Group - Unified Subject',
  type: 'subjective',
  totalMarks: 100,
  duration: '3 hr',
  topics: [
    { title: 'Administration / law / finance', subtopics: ['Service-specific theory', 'Legal provisions', 'Practical cases', 'Reports'] },
    { title: 'Office operations', subtopics: ['Correspondence', 'Registers', 'Archives', 'Meetings'] },
    { title: 'Interview-facing preparation', subtopics: ['Presentation', 'Reasoning', 'Personal experience', 'Current issues'] },
  ],
};

const kharidarPapers: Paper[] = [
  {
    number: 1,
    name: 'Paper 1: Prelim Objective - GK & Office Skills',
    type: 'objective',
    totalMarks: 100,
    duration: '1 hr 30 min',
    topics: [
      { title: 'General knowledge', subtopics: ['Nepal polity', 'Geography', 'History', 'Current affairs'] },
      { title: 'Basic office work', subtopics: ['Letter drafting', 'File handling', 'Record keeping', 'Typing familiarity'] },
      { title: 'Arithmetic basics', subtopics: ['Percentages', 'Ratios', 'Simple interest', 'Averages'] },
    ],
  },
  {
    number: 2,
    name: 'Paper 2: Governance and Service Awareness',
    type: 'subjective',
    totalMarks: 100,
    duration: '3 hr',
    topics: governanceTopics,
  },
  {
    number: 3,
    name: 'Paper 3: Office Management and Service Group Subject',
    type: 'subjective',
    totalMarks: 100,
    duration: '3 hr',
    topics: serviceAdministrationTopics,
  },
];

export const exams: Exam[] = [
  {
    slug: 'kharidar',
    nameNepali: 'खरिदार',
    nameEnglish: 'Kharidar',
    level: 'assistant',
    grade: 'Non-Gazetted 2nd Class',
    civilServiceLevel: 'Level 4',
    qualification: 'SEE/SLC or +2 equivalent with service-specific minimum requirements',
    services: [
      { slug: 'nyaya', nameNepali: 'न्याय', nameEnglish: 'Judicial' },
      { slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'Administration' },
      { slug: 'lekha', nameNepali: 'लेखा', nameEnglish: 'Accounts' },
      { slug: 'sansad', nameNepali: 'संसद', nameEnglish: 'Parliamentary' },
    ],
    papers: kharidarPapers,
    finalStage: {
      hasComputerTest: true,
      computerMarks: '10 marks / 15 min',
      interviewMarks: '30 marks',
      description: 'Practical computer test plus interview for shortlisted candidates.',
    },
    passingCriteria: 'Paper 1 is qualifying; final selection depends on combined written, computer skill, and interview performance.',
    approxVacancies: '100,000–150,000 applicants per cycle',
    competitionLevel: 'extreme',
    lastUpdated: '2082',
  },
  {
    slug: 'nasu',
    nameNepali: 'नायब सुब्बा',
    nameEnglish: 'NaSu / Nayab Subba',
    level: 'assistant',
    grade: 'Non-Gazetted 1st Class',
    civilServiceLevel: 'Level 5',
    qualification: 'Bachelor or equivalent depending on service and vacancy notice',
    services: [
      { slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'Administration' },
      { slug: 'lekha', nameNepali: 'लेखा', nameEnglish: 'Accounts' },
      { slug: 'nyaya', nameNepali: 'न्याय', nameEnglish: 'Judicial' },
      { slug: 'sansad', nameNepali: 'संसद', nameEnglish: 'Parliamentary' },
    ],
    papers: [naSuObjective, naSuSubjective, naSuServicePaper],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Written exam followed by interview for the unified and integrated exam system.',
    },
    passingCriteria: 'Paper 1 is qualifying in the integrated exam structure; service-specific merit follows the written and interview stages.',
    approxVacancies: 'Highly competitive with limited annual openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'sakha-adhikrit',
    nameNepali: 'शाखा अधिकृत',
    nameEnglish: 'Section Officer',
    level: 'officer',
    grade: 'Gazetted 3rd Class',
    civilServiceLevel: 'Level 7/8',
    qualification: 'Bachelor degree or equivalent with service-specific eligibility',
    services: [
      { slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'General Administration' },
      { slug: 'lekha', nameNepali: 'लेखा', nameEnglish: 'Audit / Accounts' },
      { slug: 'pararastra', nameNepali: 'परराष्ट्र', nameEnglish: 'Foreign Affairs' },
      { slug: 'sansad', nameNepali: 'संसद', nameEnglish: 'Parliamentary' },
    ],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperPrasasan],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Service-wise interview and document verification stage.',
    },
    passingCriteria: 'New 2081/82 rule: Paper 1 passing score is 45/100 and Paper 1 marks are not merged into the Paper 2 total.',
    approxVacancies: 'Moderate openings, very high merit pressure',
    competitionLevel: 'extreme',
    lastUpdated: '2082',
  },
  {
    slug: 'sakha-adhikrit-lekha',
    nameNepali: 'शाखा अधिकृत',
    nameEnglish: 'Section Officer - Accounts / Audit',
    level: 'officer',
    grade: 'Gazetted 3rd Class',
    civilServiceLevel: 'Level 7/8',
    qualification: 'Bachelor degree or equivalent with accounts-related background preferred',
    services: [{ slug: 'lekha', nameNepali: 'लेखा', nameEnglish: 'Audit / Accounts' }],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperLekha],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Written exam plus interview focused on financial administration and control.',
    },
    passingCriteria: 'Paper 1 minimum 45/100 under the latest rule, with separate treatment of Paper 1 from Paper 2 total.',
    approxVacancies: 'Service-specific annual openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'sakha-adhikrit-pararastra',
    nameNepali: 'शाखा अधिकृत',
    nameEnglish: 'Section Officer - Foreign Affairs',
    level: 'officer',
    grade: 'Gazetted 3rd Class',
    civilServiceLevel: 'Level 7/8',
    qualification: 'Bachelor degree or equivalent with strong language and policy readiness',
    services: [{ slug: 'pararastra', nameNepali: 'परराष्ट्र', nameEnglish: 'Foreign Affairs' }],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperPararastra],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Written exam plus interview with emphasis on diplomacy and international issues.',
    },
    passingCriteria: 'Paper 1 minimum 45/100 under the 2081/82 update; service paper and interview are decisive.',
    approxVacancies: 'Very limited openings',
    competitionLevel: 'extreme',
    lastUpdated: '2082',
  },
  {
    slug: 'sakha-adhikrit-prasasan',
    nameNepali: 'शाखा अधिकृत',
    nameEnglish: 'Section Officer - Administration',
    level: 'officer',
    grade: 'Gazetted 3rd Class',
    civilServiceLevel: 'Level 7/8',
    qualification: 'Bachelor degree or equivalent',
    services: [{ slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'General Administration' }],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperPrasasan],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Interview and document verification for administrative service placement.',
    },
    passingCriteria: 'Paper 1 qualifies at 45/100; Paper 2 is scored separately under the updated rule.',
    approxVacancies: 'Service-specific annual openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'upa-sachib',
    nameNepali: 'उपसचिव',
    nameEnglish: 'Under Secretary',
    level: 'officer',
    grade: 'Gazetted 2nd Class',
    civilServiceLevel: 'Level 9',
    qualification: 'Bachelor or Master degree depending on service and vacancy notice',
    services: [
      { slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'Administration' },
      { slug: 'lekha', nameNepali: 'लेखा', nameEnglish: 'Accounts' },
      { slug: 'nyaya', nameNepali: 'न्याय', nameEnglish: 'Judicial' },
    ],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperNyaya],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '30 marks',
      description: 'Advanced written and oral assessment for leadership and policy execution.',
    },
    passingCriteria: 'Service-wise written merit plus interview determine final ranking.',
    approxVacancies: 'Very limited openings',
    competitionLevel: 'extreme',
    lastUpdated: '2082',
  },
  {
    slug: 'saha-sachib',
    nameNepali: 'सहसचिव',
    nameEnglish: 'Joint Secretary',
    level: 'officer',
    grade: 'Gazetted 1st Class',
    civilServiceLevel: 'Level 10/11',
    qualification: 'Advanced degree plus service experience and eligibility as per vacancy',
    services: [
      { slug: 'prasasan', nameNepali: 'प्रशासन', nameEnglish: 'Administration' },
      { slug: 'pararastra', nameNepali: 'परराष्ट्र', nameEnglish: 'Foreign Affairs' },
    ],
    papers: [objectivePaper, governancePaper, contemporaryPaper, servicePaperSansad],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '40 marks',
      description: 'Leadership-focused interview and strategic evaluation stage.',
    },
    passingCriteria: 'Highly selective written and interview-based promotion/entry path.',
    approxVacancies: 'Rare openings',
    competitionLevel: 'extreme',
    lastUpdated: '2082',
  },
  {
    slug: 'prabidhik-sahayak',
    nameNepali: 'प्राविधिक सहायक',
    nameEnglish: 'Technical Assistant',
    level: 'technical',
    grade: 'Non-Gazetted / Technical',
    civilServiceLevel: 'Level 4/5',
    qualification: 'Relevant diploma, certificate, or technical training',
    services: [{ slug: 'technical', nameNepali: 'प्राविधिक', nameEnglish: 'Technical' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Technical Aptitude', topics: technicalTopics },
      { ...governancePaper, name: 'Paper 2: Service Administration', topics: serviceAdministrationTopics },
    ],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Technical interview and practical demonstration may be added by notice.',
    },
    passingCriteria: 'Service-specific technical merit plus interview or practical check where required.',
    approxVacancies: 'Varies by ministry and department',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'computer-operator',
    nameNepali: 'कम्प्युटर अपरेटर',
    nameEnglish: 'Computer Operator',
    level: 'technical',
    grade: 'Technical Non-Gazetted',
    civilServiceLevel: 'Level 5',
    qualification: '+2 or equivalent with computer proficiency',
    services: [{ slug: 'technical', nameNepali: 'प्राविधिक', nameEnglish: 'Technical' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Computer and GK Objective', topics: computerTopics },
      { ...governancePaper, name: 'Paper 2: Office Procedures and Service Delivery', topics: serviceAdministrationTopics },
    ],
    finalStage: {
      hasComputerTest: true,
      computerMarks: 'Practical speed test as per notice',
      interviewMarks: '20 marks',
      description: 'Practical typing and office automation assessment is common.',
    },
    passingCriteria: 'Written exam plus practical computer performance and interview.',
    approxVacancies: 'Service-specific annual openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'bidyalaya-nirikshak',
    nameNepali: 'विद्यालय निरीक्षक',
    nameEnglish: 'School Inspector',
    level: 'technical',
    grade: 'Technical Officer',
    civilServiceLevel: 'Level 7',
    qualification: 'Education-related degree with regulatory familiarity',
    services: [{ slug: 'technical', nameNepali: 'शिक्षा', nameEnglish: 'Education' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Education and Policy Objective', topics: governanceTopics },
      { ...contemporaryPaper, name: 'Paper 2: School Quality and Contemporary Education Issues', topics: contemporaryTopics },
      { ...servicePaperPrasasan, name: 'Paper 3: Inspection Practice and Service Administration', topics: serviceAdministrationTopics },
    ],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Interview and field-oriented performance evaluation.',
    },
    passingCriteria: 'Education-service merit with field-sensitive interview performance.',
    approxVacancies: 'Limited openings',
    competitionLevel: 'moderate',
    lastUpdated: '2082',
  },
  {
    slug: 'tathyanka-adhikrit',
    nameNepali: 'तथ्याङ्क अधिकृत',
    nameEnglish: 'Statistics Officer',
    level: 'technical',
    grade: 'Technical Officer',
    civilServiceLevel: 'Level 7',
    qualification: 'Statistics, economics, math, or relevant degree',
    services: [{ slug: 'technical', nameNepali: 'तथ्याङ्क', nameEnglish: 'Statistics' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Statistics Aptitude and GK', topics: technicalTopics },
      { ...governancePaper, name: 'Paper 2: Data Governance and Public Systems', topics: governanceTopics },
      { ...contemporaryPaper, name: 'Paper 3: Contemporary Data and Development Issues', topics: contemporaryTopics },
    ],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Statistics and analytical reasoning focused interview.',
    },
    passingCriteria: 'Strong quantitative and analytical performance across written papers.',
    approxVacancies: 'Limited openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
  {
    slug: 'naapi',
    nameNepali: 'नापी',
    nameEnglish: 'Survey / Napi',
    level: 'technical',
    grade: 'Technical Officer',
    civilServiceLevel: 'Level 5/7',
    qualification: 'Surveying, geomatics, or related technical qualification',
    services: [{ slug: 'technical', nameNepali: 'नापी', nameEnglish: 'Surveying' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Survey Basics and GK', topics: technicalTopics },
      { ...servicePaperPrasasan, name: 'Paper 2: Land Administration and Service Procedures', topics: serviceAdministrationTopics },
    ],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Practical and field-oriented interview stage.',
    },
    passingCriteria: 'Technical understanding and practical familiarity carry strong weight.',
    approxVacancies: 'Departmental openings',
    competitionLevel: 'moderate',
    lastUpdated: '2082',
  },
  {
    slug: 'engineer-sub-engineer',
    nameNepali: 'इन्जिनियर / सब-इन्जिनियर',
    nameEnglish: 'Engineer / Sub-Engineer',
    level: 'technical',
    grade: 'Technical Officer',
    civilServiceLevel: 'Level 5/7',
    qualification: 'Civil, electrical, or related engineering qualification',
    services: [{ slug: 'technical', nameNepali: 'प्राविधिक', nameEnglish: 'Engineering' }],
    papers: [
      { ...objectivePaper, name: 'Paper 1: Engineering Aptitude', topics: technicalTopics },
      { ...governancePaper, name: 'Paper 2: Public Works and Project Governance', topics: governanceTopics },
      { ...servicePaperPrasasan, name: 'Paper 3: Service Delivery and Field Execution', topics: serviceAdministrationTopics },
    ],
    finalStage: {
      hasComputerTest: false,
      interviewMarks: '20 marks',
      description: 'Technical interview and project-case discussion.',
    },
    passingCriteria: 'Technical and applied problem-solving across written and oral rounds.',
    approxVacancies: 'Project and department based openings',
    competitionLevel: 'high',
    lastUpdated: '2082',
  },
];

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((exam) => exam.slug === slug);
}

export function getExamsByLevel(level: Exam['level']): Exam[] {
  return exams.filter((exam) => exam.level === level);
}

export function getServiceLabel(slug: ServiceSlug): string {
  return `${serviceMeta[slug].nameNepali} / ${serviceMeta[slug].nameEnglish}`;
}