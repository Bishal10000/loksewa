import React, { useState } from 'react';
import ExamCard from './ExamCard';
import { exams } from '../data';

export default function ExamList() {
  const [filter, setFilter] = useState('all');

  const filteredExams = filter === 'all' ? exams : exams.filter((e) => e.levelCode === filter);

  return (
    <section id="exams" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-12 text-center">
        <h2 className="section-title">Available Exam Positions</h2>
        <p className="section-subtitle">Choose your path through Nepal's Loksewa system</p>
      </div>

      {/* Filter Chips */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {['all', 'assistant', 'officer', 'technical'].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`filter-chip capitalize ${filter === level ? 'active' : ''}`}
          >
            {level === 'all' ? 'All Positions' : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Exam Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>
    </section>
  );
}
