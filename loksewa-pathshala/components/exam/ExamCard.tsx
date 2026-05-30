"use client";

import { ArrowRight, BookOpenText, ShieldCheck, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Exam, getServiceLabel } from '@/data/exams';
import { serviceMeta } from '@/data/services';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceBadge } from './ServiceBadge';

const levelLabels: Record<Exam['level'], string> = {
  officer: 'Officer',
  assistant: 'Assistant',
  technical: 'Technical',
};

const levelBadgeClasses: Record<Exam['level'], string> = {
  assistant: 'border-[#DC143C]/30 bg-[rgba(220,20,60,0.15)] text-[#DC143C]',
  officer: 'border-[#1E40AF]/30 bg-[rgba(30,64,175,0.15)] text-[#60A5FA]',
  technical: 'border-[#0891B2]/30 bg-[rgba(8,145,178,0.15)] text-[#67E8F9]',
};

export function ExamCard({ exam }: { exam: Exam }): JSX.Element {
  const router = useRouter();
  const primaryService = exam.services[0];
  const accent = serviceMeta[primaryService.slug].accent;

  const openExam = (tab?: 'overview' | 'syllabus' | 'notes'): void => {
    router.push(tab ? `/exams/${exam.slug}?tab=${tab}` : `/exams/${exam.slug}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openExam();
    }
  };

  return (
    <Card
      aria-label={`Open ${exam.nameEnglish} exam details`}
      className="group h-full overflow-hidden border-t-[6px] transition duration-300 hover:-translate-y-1 hover:shadow-glow focus-within:-translate-y-1 focus-within:shadow-glow"
      onClick={() => openExam()}
      onKeyDown={handleKeyDown}
      role="link"
      style={{ borderTopColor: accent }}
      tabIndex={0}
    >
      <CardHeader className="relative space-y-4 p-7 pb-0">
        <Badge className={`absolute right-7 top-7 border px-[10px] py-[3px] text-[10px] font-bold uppercase tracking-[0.18em] ${levelBadgeClasses[exam.level]}`}>
          {levelLabels[exam.level]}
        </Badge>
        <div className="space-y-1 pr-20">
          <CardTitle className="text-[26px] font-extrabold leading-tight text-[#F9FAFB]">
            {exam.nameNepali}
          </CardTitle>
          <span className="block text-[14px] text-[#6B7280]">{exam.nameEnglish}</span>
          <p className="text-sm leading-6 text-[#6B7280]">
            {exam.grade} · {exam.civilServiceLevel}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-7 pt-0">
        <div className="rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-3.5 text-[13px] leading-6 text-[#6B7280]">
          {exam.finalStage.description}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {exam.services.map((service) => (
            <ServiceBadge key={service.slug} slug={service.slug} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 text-[13px] text-[#9CA3AF]">
          <div className="rounded-2xl border border-border bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <BookOpenText className="h-4 w-4 text-[#DC143C]" />
              Papers
            </div>
            <p className="mt-1 text-[13px] font-semibold text-[#F9FAFB]">{exam.papers.length}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white/5 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#DC143C]" />
              Competition
            </div>
            <p className="mt-1 text-[13px] font-semibold capitalize text-[#F9FAFB]">{exam.competitionLevel}</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-[#9CA3AF]">
          <span>{getServiceLabel(primaryService.slug)}</span>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#10B981]">
            <GraduationCap className="h-4 w-4" />
            {exam.approxVacancies}
          </span>
        </div>

        <div className="mt-4 flex gap-2.5 border-t border-[rgba(255,255,255,0.06)] pt-4">
          <button
            className="flex-1 rounded-[8px] border border-[rgba(220,20,60,0.25)] bg-[rgba(220,20,60,0.1)] py-[11px] text-[13px] font-semibold text-[#DC143C] transition hover:bg-[rgba(220,20,60,0.2)]"
            onClick={(event) => {
              event.stopPropagation();
              openExam();
            }}
            type="button"
          >
            Explore exam
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            className="flex-1 rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] py-[11px] text-[13px] font-semibold text-[#9CA3AF] transition hover:border-[rgba(255,255,255,0.2)] hover:text-[#F9FAFB]"
            onClick={(event) => {
              event.stopPropagation();
              openExam('syllabus');
            }}
            type="button"
          >
            Syllabus
          </button>
          <button
            className="flex-1 rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] py-[11px] text-[13px] font-semibold text-[#9CA3AF] transition hover:border-[rgba(255,255,255,0.2)] hover:text-[#F9FAFB]"
            onClick={(event) => {
              event.stopPropagation();
              openExam('notes');
            }}
            type="button"
          >
            Notes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}