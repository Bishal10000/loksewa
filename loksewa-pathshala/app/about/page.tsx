import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const pillars = [
  'Clear paper-by-paper learning paths',
  'Bilingual display for Nepali and English learners',
  'Service-group color language for fast recognition',
  'Mobile-first access with premium visual polish',
];

export default function AboutPage(): JSX.Element {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <Badge className="border-none bg-white/10 text-text">Mission</Badge>
            <CardTitle className="text-4xl">A better way to prepare for Loksewa</CardTitle>
            <CardDescription className="text-base leading-8">
              LokSewa Pathshala is designed to feel like a premium study platform, not a generic template. The focus is clarity, confidence, and speed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pillars.map((pillar) => (
              <div className="rounded-2xl border border-border bg-white/5 px-4 py-3 text-sm text-text" key={pillar}>
                {pillar}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="relative min-h-[28rem]">
            <Image alt="Kathmandu study atmosphere" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 40vw" src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1400&q=80" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
          </div>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Why this platform exists</CardTitle>
          <CardDescription>To help aspirants prepare with confidence, structure, and a beautiful interface that reduces friction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}