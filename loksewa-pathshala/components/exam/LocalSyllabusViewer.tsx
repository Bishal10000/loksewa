"use client";

import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Exam } from '@/data/exams';
import { getUploadedSyllabi, type UploadedSyllabusRecord } from '@/lib/content-storage';
import { cn } from '@/lib/utils';

type ActiveSelection = {
  paperId: string;
  chapterId: number;
};

function formatExamLabel(exam: Exam): string {
  return exam.nameEnglish;
}

export function LocalSyllabusViewer({ exam }: { exam: Exam }): JSX.Element {
  const [syllabi, setSyllabi] = useState<UploadedSyllabusRecord[]>([]);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);
  const [activeSelection, setActiveSelection] = useState<ActiveSelection | null>(null);

  useEffect(() => {
    const syncSyllabi = (): void => {
      setSyllabi(
        getUploadedSyllabi()
          .filter((item) => item.exam === exam.slug)
          .sort((left, right) => left.paper - right.paper),
      );
    };

    syncSyllabi();
    window.addEventListener('storage', syncSyllabi);

    return () => window.removeEventListener('storage', syncSyllabi);
  }, [exam.slug]);

  const activePaper = useMemo(() => {
    if (!activeSelection) {
      return null;
    }

    return syllabi.find((item) => item.id === activeSelection.paperId) ?? null;
  }, [activeSelection, syllabi]);

  const activeChapter = useMemo(() => {
    if (!activePaper || !activeSelection) {
      return null;
    }

    return activePaper.chapters.find((chapter) => chapter.id === activeSelection.chapterId) ?? null;
  }, [activePaper, activeSelection]);

  const activeChapterIndex = useMemo(() => {
    if (!activePaper || !activeSelection) {
      return -1;
    }

    return activePaper.chapters.findIndex((chapter) => chapter.id === activeSelection.chapterId);
  }, [activePaper, activeSelection]);

  const previousChapter = activePaper && activeChapterIndex > 0 ? activePaper.chapters[activeChapterIndex - 1] : null;
  const nextChapter = activePaper && activeChapterIndex >= 0 && activeChapterIndex < activePaper.chapters.length - 1 ? activePaper.chapters[activeChapterIndex + 1] : null;

  const handleSelectChapter = (paperId: string, chapterId: number): void => {
    setExpandedPaperId(paperId);
    setActiveSelection({ paperId, chapterId });
  };

  if (syllabi.length === 0) {
    return (
      <div className="rounded-[28px] border border-border bg-[#0F1624] p-6 md:p-8">
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-3xl border border-white/5 bg-black/10 p-8 text-center">
          <Upload className="h-12 w-12 text-muted" />
          <h3 className="text-2xl font-semibold text-text">Syllabus PDF Not Yet Available</h3>
          <p className="max-w-xl text-sm leading-7 text-muted">Check back soon — our team is uploading content regularly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-[#0F1624]">
      <div className="grid min-h-[760px] lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="border-b border-white/8 bg-[#0F1624] lg:border-b-0 lg:border-r lg:border-white/8">
          <div className="border-b border-white/8 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Uploaded syllabi</p>
            <h3 className="mt-2 text-lg font-semibold text-text">{formatExamLabel(exam)}</h3>
            <p className="mt-1 text-sm text-muted">Pick a paper, then choose a chapter to view the PDF.</p>
          </div>

          <div className="max-h-[760px] overflow-y-auto">
            {syllabi.map((paper) => {
              const isExpanded = expandedPaperId === paper.id;

              return (
                <div className="border-b border-white/8" key={paper.id}>
                  <button
                    className={cn(
                      'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition',
                      isExpanded ? 'bg-[rgba(220,20,60,0.08)]' : 'bg-transparent hover:bg-white/4',
                    )}
                    onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                    type="button"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text">{paper.paperName}</p>
                      <p className="mt-1 text-xs text-muted">Paper {paper.paper}</p>
                    </div>
                    <ChevronDown className={cn('h-4 w-4 text-muted transition', isExpanded ? 'rotate-180 text-text' : '')} />
                  </button>

                  {isExpanded ? (
                    <div className="bg-[#0B101A] pb-2">
                      {paper.chapters.map((chapter) => {
                        const isActive = activeSelection?.paperId === paper.id && activeSelection.chapterId === chapter.id;

                        return (
                          <button
                            className={cn(
                              'flex w-full border-l-[3px] border-transparent px-8 py-3 text-left text-sm transition',
                              isActive
                                ? 'border-l-[#DC143C] bg-[rgba(220,20,60,0.08)] font-semibold text-text'
                                : 'text-[#9CA3AF] hover:bg-white/4 hover:text-text',
                            )}
                            key={chapter.id}
                            onClick={() => handleSelectChapter(paper.id, chapter.id)}
                            type="button"
                          >
                            <span className="mr-3 font-bold text-[#DC143C]">{chapter.id}.</span>
                            <span className="leading-6">{chapter.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </aside>

        <section className="bg-[#080C14] p-5 md:p-8" onContextMenu={(event) => event.preventDefault()}>
          {!activePaper || !activeChapter ? (
            <div className="flex min-h-[700px] items-center justify-center rounded-[24px] border border-white/8 bg-[#0F1624] px-6 text-center">
              <div className="max-w-xl space-y-4">
                <BookOpen className="mx-auto h-16 w-16 text-[#DC143C]/30" />
                <p className="text-lg font-medium text-[#4B5563]">Select a chapter from the left to view the syllabus PDF</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6B7280]">{exam.nameNepali} &gt; {activePaper.paperName} &gt; {activeChapter.title}</p>
                <h3 className="mt-2 text-2xl font-semibold text-text">{activeChapter.title}</h3>
                <p className="mt-2 text-sm text-muted">Viewing the uploaded paper PDF. No download controls are shown here.</p>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-white/8 bg-[#0F1624] p-2" style={{ userSelect: 'none' }}>
                <iframe
                  className="h-[700px] w-full rounded-[12px] border-none"
                  onContextMenu={(event) => event.preventDefault()}
                  src={`${activePaper.fileUrl}#page=1`}
                  title={activeChapter.title}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-[#9CA3AF]">
                <button
                  className={cn('inline-flex items-center gap-2 transition hover:text-text', previousChapter ? 'text-[#9CA3AF]' : 'cursor-not-allowed opacity-40')}
                  disabled={!previousChapter}
                  onClick={() => previousChapter && handleSelectChapter(activePaper.id, previousChapter.id)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Chapter
                </button>

                <button
                  className={cn('inline-flex items-center gap-2 transition hover:text-text', nextChapter ? 'text-[#9CA3AF]' : 'cursor-not-allowed opacity-40')}
                  disabled={!nextChapter}
                  onClick={() => nextChapter && handleSelectChapter(activePaper.id, nextChapter.id)}
                  type="button"
                >
                  Next Chapter
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}