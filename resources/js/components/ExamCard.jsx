import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Award, FileText } from 'lucide-react';

export default function ExamCard({ exam }) {
  const navigate = useNavigate();

  const getLevelColor = (level) => {
    const colors = {
      assistant: '#DC143C',
      officer: '#1E40AF',
      technical: '#0891B2',
    };
    return colors[level] || '#F9FAFB';
  };

  return (
    <div className="exam-card group relative">
      {/* Colored Top Bar */}
      <div
        className="exam-card-topbar absolute top-0 left-0 h-1"
        style={{ background: getLevelColor(exam.levelCode), width: '100%', borderRadius: '16px 16px 0 0' }}
      ></div>

      {/* Header */}
      <div className="exam-card-header mt-3">
        <div className="flex-1">
          <h3 className="exam-card h3 font-bold">{exam.name}</h3>
          <p className="text-sm text-gray-400">{exam.en}</p>
        </div>
        <span className="badge-level" style={{ background: getLevelColor(exam.levelCode) }}>
          {exam.level}
        </span>
      </div>

      {/* Description */}
      <p className="exam-card p my-3">{exam.description}</p>

      {/* Meta Information */}
      <div className="exam-meta">
        <div className="exam-meta-item">
          <BookOpen size={14} className="inline mr-1 opacity-60" />
          <strong>{exam.papers}</strong>
        </div>
        <div className="exam-meta-item">
          <Users size={14} className="inline mr-1 opacity-60" />
          <strong>{exam.vacancy}</strong>
        </div>
        <div className="exam-meta-item">
          <Award size={14} className="inline mr-1 opacity-60" />
          <strong>{exam.salary}</strong>
        </div>
      </div>

      {/* Service Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {exam.service.split(' / ').map((service, idx) => (
          <span key={idx} className="service-tag text-xs">
            {service}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => navigate(`/syllabus/${exam.slug}`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition"
          style={{
            backgroundColor: 'rgba(220,20,60,0.1)',
            color: '#DC143C',
            border: '1px solid rgba(220,20,60,0.3)'
          }}
        >
          <BookOpen size={18} />
          Syllabus
        </button>
        <button
          onClick={() => navigate(`/notes/${exam.slug}`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition"
          style={{
            backgroundColor: 'rgba(59,130,246,0.1)',
            color: '#3B82F6',
            border: '1px solid rgba(59,130,246,0.3)'
          }}
        >
          <FileText size={18} />
          Notes
        </button>
      </div>
    </div>
  );
}
