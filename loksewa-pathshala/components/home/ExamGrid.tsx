"use client";

import { motion } from 'framer-motion';
import { exams } from '@/data/exams';
import { ExamCard } from '@/components/exam/ExamCard';

export function ExamGrid(): JSX.Element {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {exams.slice(0, 6).map((exam, index) => (
        <motion.div
          key={exam.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ExamCard exam={exam} />
        </motion.div>
      ))}
    </div>
  );
}