"use client";

import { motion } from 'framer-motion';
import { StatBadge } from './StatBadge';

const stats = [
  { value: '5+', label: 'EXAM POSITIONS', color: '#DC143C' },
  { value: '10+', label: 'SERVICE GROUPS', color: '#F59E0B' },
  { value: '500+', label: 'STUDY NOTES', color: '#10B981' },
  { value: 'Free', label: 'STARTER ACCESS', color: '#7C3AED' },
];

export function StatsBar(): JSX.Element {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
        >
          <StatBadge
            className="text-center"
            label={stat.label}
            labelClassName="text-[11px] font-semibold tracking-[2.5px] text-[#6B7280]"
            value={stat.value}
            valueClassName="text-[52px] font-black leading-none"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}