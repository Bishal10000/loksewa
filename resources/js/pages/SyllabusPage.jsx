import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, FileText } from 'lucide-react';
import { exams } from '../data/exams';
import { openPdfInNewTab } from '../lib/pdf';

export default function SyllabusPage() {
  const { examSlug } = useParams();
  const navigate = useNavigate();
  const [syllabi, setSyllabi] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);

  const syllabusStorageKey = 'loksewa_syllabi';

  useEffect(() => {
    // Load syllabi from localStorage
    const stored = localStorage.getItem(syllabusStorageKey);
    const allSyllabi = stored ? JSON.parse(stored) : [];
    
    if (examSlug) {
      // Filter by exam slug
      const filtered = allSyllabi.filter(s => s.exam === examSlug);
      setSyllabi(filtered);
      
      // Set selected exam
      const exam = exams.find(e => e.slug === examSlug);
      setSelectedExam(exam);
    }
  }, [examSlug]);

  const handleViewPDF = (fileUrl) => {
    void openPdfInNewTab(fileUrl);
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
                onClick={() => navigate('/syllabus')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition mb-4"
                style={{ color: '#DC143C' }}
              >
                <ArrowLeft size={20} />
                Back to Exams
              </button>
              <h1 className="text-4xl font-bold mb-2">{selectedExam.nameEnglish}</h1>
              <p style={{ color: '#9CA3AF' }} className="text-lg">Syllabus Materials</p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-2">Syllabus Materials</h1>
              <p style={{ color: '#9CA3AF' }} className="text-lg">Select an exam to view syllabi</p>
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
                  onClick={() => navigate(`/syllabus/${exam.slug}`)}
                  style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }}
                  className="border rounded-xl p-6 text-left hover:border-red-500/50 transition"
                >
                  <h3 style={{ color: '#F9FAFB' }} className="font-bold text-lg mb-2">{exam.nameEnglish}</h3>
                  <p style={{ color: '#9CA3AF' }} className="text-sm mb-4">{exam.nameNepali}</p>
                  <p style={{ color: '#6B7280' }} className="text-xs">Click to view syllabi</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Show syllabi for selected exam
          <div>
            {syllabi.length === 0 ? (
              <div style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-xl p-12 text-center">
                <FileText size={48} style={{ color: 'rgba(255,255,255,0.2)' }} className="mx-auto mb-4" />
                <p style={{ color: '#6B7280' }} className="text-lg">No syllabi available for this exam yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {syllabi.map((syllabus) => (
                  <div
                    key={syllabus.id}
                    style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }}
                    className="border rounded-xl p-6"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ backgroundColor: '#DC143C', color: '#FFFFFF' }} className="px-3 py-1 rounded-full text-xs font-semibold">
                          Paper {syllabus.paper}
                        </span>
                        <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#9CA3AF' }} className="px-3 py-1 rounded-full text-xs font-medium">
                          {new Date(syllabus.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 style={{ color: '#F9FAFB' }} className="text-lg font-bold mb-2">{syllabus.paperName}</h3>
                      {syllabus.description && (
                        <p style={{ color: '#D1D5DB' }} className="text-sm mb-3">{syllabus.description}</p>
                      )}
                      {syllabus.chapters && syllabus.chapters.length > 0 && (
                        <div className="mb-4">
                          <p style={{ color: '#9CA3AF' }} className="text-xs font-semibold mb-2">CHAPTERS ({syllabus.chapters.length})</p>
                          <ul style={{ color: '#D1D5DB' }} className="text-sm space-y-1">
                            {syllabus.chapters.slice(0, 5).map((chapter, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-xs opacity-50">•</span>
                                {chapter.title}
                              </li>
                            ))}
                            {syllabus.chapters.length > 5 && (
                              <li style={{ color: '#9CA3AF' }} className="text-xs italic">+{syllabus.chapters.length - 5} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleViewPDF(syllabus.fileUrl)}
                      className="w-full px-4 py-3 rounded-lg font-semibold transition"
                      style={{
                        backgroundColor: 'rgba(220,20,60,0.1)',
                        color: '#DC143C',
                        border: '1px solid rgba(220,20,60,0.3)'
                      }}
                    >
                      View PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
