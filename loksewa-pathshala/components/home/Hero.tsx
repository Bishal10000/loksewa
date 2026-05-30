"use client";

import Link from 'next/link';
import { ArrowRight, BookOpenText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatBadge } from './StatBadge';
import { motion } from 'framer-motion';

const heroCards = [
  { label: 'Section Officer', meta: 'Level 7/8', tone: 'from-primary/30 to-secondary/20' },
  { label: 'Kharidar', meta: 'Most applied role', tone: 'from-accent/30 to-primary/10' },
  { label: 'NaSu', meta: 'Unified exam', tone: 'from-secondary/30 to-success/20' },
];

export function Hero(): JSX.Element {
  return (
    <section
      className="relative overflow-hidden rounded-[2rem] border border-border px-6 py-10 shadow-glow sm:px-8 lg:px-10 lg:py-14"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 10% 50%, rgba(220,20,60,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 60%, rgba(30,64,175,0.15) 0%, transparent 60%), #080C14',
      }}
    >
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <svg aria-hidden="true" className="map-outline absolute right-[-2rem] top-6 hidden w-[32rem] lg:block" fill="none" viewBox="0 0 800 800">
        <path
          d="M274 95l92 18 48 34 57 6 25 35 36 23 11 41-17 35-10 53-36 29-16 54-46 25-12 43-43 20-43-15-37 12-41-24-42-2-27-36-41-21-18-54 16-36-6-47 30-34 15-48 53-22 19-43 55-11Z"
          stroke="currentColor"
          strokeWidth="4"
        />
      </svg>

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-text">
            <Sparkles className="h-4 w-4 text-accent" />
            Nepal’s premium Loksewa prep platform
          </div>

          <div className="space-y-4">
            <p className="font-devanagari text-2xl text-muted">लोकसेवाको सपना, हाम्रो मञ्च</p>
            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              <span className="block text-[#F9FAFB]">Clear Notes.</span>
              <span className="block text-[#F9FAFB]">Brilliant</span>
              <span className="block text-[#DC143C]">Structure.</span>
              <span className="block text-[#F9FAFB]">Pass Loksewa.</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Organized syllabus, polished notes, and exam intelligence for aspirants preparing for Kharidar, NaSu, Section Officer, and technical PSC posts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/exams" size="lg">
              Start Preparing
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/syllabus" size="lg" variant="secondary">
              Browse Syllabus
              <BookOpenText className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatBadge className="bg-white/8 text-center" label="EXAM POSITIONS" labelClassName="text-[11px] font-semibold tracking-[2.5px] text-[#6B7280]" value="5+" valueClassName="text-[52px] font-black leading-none text-[#DC143C]" />
            <StatBadge className="bg-white/8 text-center" label="SERVICE GROUPS" labelClassName="text-[11px] font-semibold tracking-[2.5px] text-[#6B7280]" value="10+" valueClassName="text-[52px] font-black leading-none text-[#F59E0B]" />
            <StatBadge className="bg-white/8 text-center" label="STUDY NOTES" labelClassName="text-[11px] font-semibold tracking-[2.5px] text-[#6B7280]" value="500+" valueClassName="text-[52px] font-black leading-none text-[#10B981]" />
            <StatBadge className="bg-white/8 text-center" label="STARTER ACCESS" labelClassName="text-[11px] font-semibold tracking-[2.5px] text-[#6B7280]" value="Free" valueClassName="text-[52px] font-black leading-none text-[#7C3AED]" />
          </div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(181,23,43,0.24),transparent_34%),radial-gradient(circle_at_70%_0%,rgba(0,53,128,0.3),transparent_32%)]" />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {heroCards.map((card, index) => (
              <motion.div
                animate={{ y: [0, -8, 0] }}
                className="glass-panel animate-floaty rounded-3xl border border-white/10 p-5"
                key={card.label}
                transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.18 }}
              >
                <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${card.tone}`} />
                <div className="text-lg font-semibold text-text">{card.label}</div>
                <div className="mt-1 text-sm text-muted">{card.meta}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}