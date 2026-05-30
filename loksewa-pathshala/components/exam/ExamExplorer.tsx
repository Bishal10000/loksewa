"use client";

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Exam } from '@/data/exams';
import { serviceOrder, serviceMeta } from '@/data/services';
import { ExamCard } from './ExamCard';
import { Input } from '@/components/ui/input';
import { FilterChip } from '@/components/ui/filter-chip';
import { Badge } from '@/components/ui/badge';

const levels: Array<'all' | Exam['level']> = ['all', 'officer', 'assistant', 'technical'];

export function ExamExplorer({ exams }: { exams: Exam[] }): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const level = searchParams.get('level') ?? 'all';
  const service = searchParams.get('service') ?? 'all';
  const papers = searchParams.get('papers') ?? 'all';
  const query = searchParams.get('q') ?? '';

  const filteredExams = useMemo(
    () =>
      exams.filter((exam) => {
        const matchesLevel = level === 'all' || exam.level === level;
        const matchesService = service === 'all' || exam.services.some((item) => item.slug === service);
        const matchesPaper = papers === 'all' || String(exam.papers.length) === papers;
        const haystack = `${exam.nameNepali} ${exam.nameEnglish} ${exam.grade} ${exam.qualification}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query.toLowerCase());

        return matchesLevel && matchesService && matchesPaper && matchesQuery;
      }),
    [exams, level, service, papers, query],
  );

  const updateParams = (updates: Record<string, string>): void => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel sticky top-24 z-10 space-y-4 rounded-3xl p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            className="pl-11"
            onChange={(event) => updateParams({ q: event.target.value })}
            placeholder="Search by exam, service, or qualification"
            value={query}
          />
        </div>

        <div className="space-y-3">
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            <Badge className="border-none bg-white/10 text-text">Level</Badge>
            {levels.map((item) => (
              <FilterChip active={level === item} key={item} onClick={() => updateParams({ level: item })}>
                {item === 'all' ? 'All' : item[0].toUpperCase() + item.slice(1)}
              </FilterChip>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            <Badge className="border-none bg-white/10 text-text">Sewa</Badge>
            <FilterChip active={service === 'all'} onClick={() => updateParams({ service: 'all' })}>
              All
            </FilterChip>
            {serviceOrder.map((slug) => (
              <FilterChip active={service === slug} key={slug} onClick={() => updateParams({ service: slug })}>
                {serviceMeta[slug].nameNepali}
              </FilterChip>
            ))}
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            <Badge className="border-none bg-white/10 text-text">Papers</Badge>
            {['all', '1', '2', '3', '4'].map((item) => (
              <FilterChip active={papers === item} key={item} onClick={() => updateParams({ papers: item })}>
                {item === 'all' ? 'Any' : `${item} paper${item === '1' ? '' : 's'}`}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredExams.map((exam) => (
          <ExamCard exam={exam} key={exam.slug} />
        ))}
      </div>
    </div>
  );
}