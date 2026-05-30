import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, BookOpen } from 'lucide-react';
import { exams } from '../data/exams';
import { openPdfInNewTab } from '../lib/pdf';

export default function NotesPage() {
  const { examSlug } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  const notesStorageKey = 'loksewa_notes';

  useEffect(() => {
    // Load notes from localStorage
    const stored = localStorage.getItem(notesStorageKey);
    const allNotes = stored ? JSON.parse(stored) : [];
    
    if (examSlug) {
      // Filter by exam slug
      const filtered = allNotes.filter(n => n.examSlugs && n.examSlugs.includes(examSlug));
      setNotes(filtered);
      
      // Set selected exam
      const exam = exams.find(e => e.slug === examSlug);
      setSelectedExam(exam);
    }
  }, [examSlug]);

  const handleViewPDF = (fileUrl) => {
    void openPdfInNewTab(fileUrl);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: { bg: 'rgba(16,185,129,0.1)', text: '#10B981' },
      medium: { bg: 'rgba(245,158,11,0.1)', text: '#F59E0B' },
      hard: { bg: 'rgba(239,68,68,0.1)', text: '#EF4444' }
    };
    return colors[difficulty] || colors.medium;
  };

  if (examSlug && !selectedExam) {
    return (
      <div style={{ backgroundColor: '#0A0E1A', color: '#F9FAFB' }} className="min-h-screen py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0E1A', color: '#F9FAFB' }} className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          {examSlug && selectedExam ? (
            <>
              <button
                onClick={() => navigate('/notes')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition mb-4"
                style={{ color: '#DC143C' }}
              >
                <ArrowLeft size={20} />
                Back to Exams
              </button>
              <h1 className="text-4xl font-bold mb-2">{selectedExam.nameEnglish}</h1>
              <p style={{ color: '#9CA3AF' }} className="text-lg">Study Notes</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-2">Study Notes</h1>
              <p style={{ color: '#9CA3AF' }} className="text-lg">Select an exam to view notes</p>
            </>
          )}
        </div>

        {/* Content */}
        {!examSlug ? (
          // Show all exams
          <div>
            <h2 style={{ color: '#F9FAFB' }} className="text-2xl font-bold mb-8">Choose an Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <button
                  key={exam.slug}
                  onClick={() => navigate(`/notes/${exam.slug}`)}
                  style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }}
                  className="border rounded-xl p-6 text-left hover:border-blue-500/50 transition"
                >
                  <h3 style={{ color: '#F9FAFB' }} className="font-bold text-lg mb-2">{exam.nameEnglish}</h3>
                  <p style={{ color: '#9CA3AF' }} className="text-sm mb-4">{exam.nameNepali}</p>
                  <p style={{ color: '#6B7280' }} className="text-xs">Click to view notes</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Show notes for selected exam
          <div>
            {notes.length === 0 ? (
              <div style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-xl p-12 text-center">
                <FileText size={48} style={{ color: 'rgba(255,255,255,0.2)' }} className="mx-auto mb-4" />
                <p style={{ color: '#6B7280' }} className="text-lg">No study notes available for this exam yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => {
                  const diffColor = getDifficultyColor(note.difficulty);
                  return (
                    <div
                      key={note.id}
                      style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }}
                      className="border rounded-xl p-6"
                    >
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {note.categoryLabel && (
                            <span style={{ backgroundColor: 'rgba(220,20,60,0.2)', color: '#DC143C' }} className="px-3 py-1 rounded-full text-xs font-semibold">
                              {note.categoryLabel}
                            </span>
                          )}
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: diffColor.bg, color: diffColor.text }}
                          >
                            {note.difficulty.charAt(0).toUpperCase() + note.difficulty.slice(1)}
                          </span>
                        </div>
                        <h3 style={{ color: '#F9FAFB' }} className="text-lg font-bold mb-2">{note.title}</h3>
                        {note.description && (
                          <p style={{ color: '#D1D5DB' }} className="text-sm mb-3">{note.description}</p>
                        )}
                        {note.chapters && note.chapters.length > 0 && (
                          <div className="mb-4">
                            <p style={{ color: '#9CA3AF' }} className="text-xs font-semibold mb-2">COVERS ({note.chapters.length}) CHAPTERS</p>
                            <ul style={{ color: '#D1D5DB' }} className="text-sm space-y-1">
                              {note.chapters.slice(0, 4).map((chapter, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="text-xs opacity-50">•</span>
                                  {chapter.title}
                                </li>
                              ))}
                              {note.chapters.length > 4 && (
                                <li style={{ color: '#9CA3AF' }} className="text-xs italic">+{note.chapters.length - 4} more</li>
                              )}
                            </ul>
                          </div>
                        )}
                        <p style={{ color: '#6B7280' }} className="text-xs">{new Date(note.uploadedAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => handleViewPDF(note.fileUrl)}
                        className="w-full px-4 py-3 rounded-lg font-semibold transition"
                        style={{
                          backgroundColor: 'rgba(59,130,246,0.1)',
                          color: '#3B82F6',
                          border: '1px solid rgba(59,130,246,0.3)'
                        }}
                      >
                        View PDF
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
