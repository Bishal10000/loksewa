"use client";

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, MoonStar, PanelLeftClose, PanelLeftOpen, SunMedium, Languages, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/providers';
import { cn } from '@/lib/utils';
import { getExamsByLevel, exams } from '@/data/exams';
import { serviceOrder, serviceMeta } from '@/data/services';
import { useTheme } from 'next-themes';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/exams', label: 'Exams' },
  { href: '/notes', label: 'Notes' },
  { href: '/syllabus', label: 'Syllabus' },
  { href: '/results', label: 'Results' },
  { href: '/about', label: 'About' },
];

export function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();

  const groupedExams = useMemo(
    () => ({
      officer: getExamsByLevel('officer'),
      assistant: getExamsByLevel('assistant'),
      technical: getExamsByLevel('technical'),
    }),
    [],
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(220,20,60,0.2)] bg-[#080C14]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex flex-col leading-none">
              <span className="text-[22px] font-extrabold tracking-tight text-[#F9FAFB]">
                Lok<span className="text-[#DC143C]">Sewa</span>
              </span>
              <span className="text-[11px] text-muted">लोकसेवाको सपना, हाम्रो मञ्च</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  className={cn(
                    'rounded-full px-4 py-2 text-[15px] font-medium transition',
                    active ? 'bg-white/10 text-text' : 'text-muted hover:bg-white/8 hover:text-text',
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              aria-label="Toggle language"
              className="rounded-full"
              onClick={() => setLocale(locale === 'both' ? 'ne' : locale === 'ne' ? 'en' : 'both')}
              size="icon"
              variant="ghost"
            >
              <Languages className="h-4 w-4" />
            </Button>
            <Button
              aria-label="Toggle theme"
              className="rounded-full"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              size="icon"
              variant="ghost"
            >
              {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </Button>
            <Button href="/exams" size="sm">
              Start Preparing
            </Button>
          </div>

          <button
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/6 text-text transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen(true)}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] bg-slate-950/96 backdrop-blur-2xl lg:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ x: 0 }}
              className="flex h-full flex-col gap-6 overflow-y-auto px-5 py-5"
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 30 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <Button aria-label="Close menu" className="rounded-full" onClick={() => setMobileOpen(false)} size="icon" variant="ghost">
                  <PanelLeftClose className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base font-medium"
                    href={item.href}
                    key={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-muted" />
                  </Link>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {(['officer', 'assistant', 'technical'] as const).map((level) => (
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4" key={level}>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">{level}</p>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-muted">{groupedExams[level].length}</span>
                    </div>
                    <div className="space-y-2">
                      {groupedExams[level].slice(0, 3).map((exam) => (
                        <Link
                          className="block rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-3 text-sm text-text transition hover:border-accent/40 hover:bg-white/10"
                          href={`/exams/${exam.slug}`}
                          key={exam.slug}
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{exam.nameNepali}</span>
                            <span className="text-xs text-muted">{exam.civilServiceLevel}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted">{exam.nameEnglish}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 p-5">
                <p className="font-display text-xl font-semibold">Services</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceOrder.map((slug) => (
                    <span
                      className="rounded-full border border-white/10 px-3 py-1 text-xs"
                      key={slug}
                      style={{ backgroundColor: serviceMeta[slug].softAccent, color: 'var(--color-text)' }}
                    >
                      {serviceMeta[slug].nameNepali}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  className="flex-1"
                  onClick={() => setLocale(locale === 'both' ? 'ne' : locale === 'ne' ? 'en' : 'both')}
                  variant="secondary"
                >
                  <Languages className="h-4 w-4" />
                  Language
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  variant="secondary"
                >
                  {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                  Theme
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}