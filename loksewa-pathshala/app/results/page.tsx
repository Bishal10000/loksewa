import Link from 'next/link';
import { ArrowUpRight, BellRing, Link2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Loksewa Results | PSC Exam Results Nepal',
  description: 'Latest Loksewa and PSC exam results in Nepal.',
  keywords: 'loksewa results, PSC results Nepal, loksewa exam results',
};

const notices = [
  { title: 'PSC Results', href: 'https://psc.gov.np' },
  { title: 'Vacancy Notices', href: 'https://psc.gov.np' },
  { title: 'Interview Schedule', href: 'https://psc.gov.np' },
  { title: 'Written Exam Notice', href: 'https://psc.gov.np' },
];

export default function ResultsPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Results & Notices' }]} />
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">Official updates</p>
        <h1 className="font-display text-4xl font-semibold text-text">Exam results and PSC notices</h1>
        <p className="max-w-3xl text-base leading-8 text-muted">Quick links to the official PSC website for results, notices, and new vacancy announcements.</p>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {notices.map((notice) => (
          <Card key={notice.title}>
            <CardHeader>
              <BellRing className="h-5 w-5 text-accent" />
              <CardTitle>{notice.title}</CardTitle>
              <CardDescription>psc.gov.np</CardDescription>
            </CardHeader>
            <CardContent>
              <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href={notice.href} rel="noreferrer" target="_blank">
                Open official link
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Link2 className="h-5 w-5 text-accent" />
          <CardTitle>Always verify on the official site</CardTitle>
          <CardDescription>PSC notices can change quickly. Use the official site as the source of truth.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}