import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
// import Header from '../components/Header';
import ExamList from '../components/ExamList';
import { exams, notes } from '../data';
import { openPdfInNewTab } from '../lib/pdf';

export default function HomePage() {
  const handleViewPDF = (fileUrl) => {
    void openPdfInNewTab(fileUrl);
  };

  const handleDownloadPDF = (fileUrl, title) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Header - TODO: Fix Vite React preamble error */}
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="hero-bg relative pt-32 pb-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-300">Nepal's Loksewa Preparation Hub</span>
          </div>

          <h1 className="mb-4 text-5xl font-black text-white sm:text-6xl">
            Clear Notes. Brilliant{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Structure
            </span>
            . Pass Loksewa.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Master Kharidar, Nayab Subba, Section Officer, and technical positions with expertly organized study materials and a focused, exam-first approach.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary">Explore Exams</button>
            <button className="btn-secondary">View All Notes</button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { number: '6', label: 'Exam Positions' },
              { number: '3', label: 'Service Levels' },
              { number: '8+', label: 'Study Topics' },
              { number: '∞', label: 'Your Potential' },
            ].map((stat, idx) => (
              <div key={idx} className="stats-item">
                <div className="stats-number" style={{ color: '#DC143C' }}>
                  {stat.number}
                </div>
                <div className="stats-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <ExamList />

      {/* Notes Section */}
      <section id="notes" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="section-title">Study Materials</h2>
          <p className="section-subtitle">Comprehensive notes organized by topic and difficulty</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <span className={`note-tag ${note.category.toLowerCase().replace(/\s+/g, '')}`}>
                {note.category}
              </span>
              <h4 className="note-card h4">{note.title}</h4>
              <p className="note-card p">{note.description}</p>
              <div className="mt-3 flex gap-2 text-xs text-gray-400">
                <span>{note.pages} pages</span>
                <span>•</span>
                <span>Level {note.difficulty}</span>
              </div>

              {/* PDF Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', flexDirection: 'column' }} className="sm:flex-row">
                {note.file_url ? (
                  <>
                    <button
                      onClick={() => handleViewPDF(note.file_url)}
                      style={{
                        background: 'rgba(220,20,60,0.1)',
                        border: '1px solid rgba(220,20,60,0.3)',
                        color: '#DC143C',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(220,20,60,0.2)';
                        e.target.style.borderColor = '#DC143C';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(220,20,60,0.1)';
                        e.target.style.borderColor = 'rgba(220,20,60,0.3)';
                      }}
                    >
                      <ExternalLink size={16} />
                      View PDF
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(note.file_url, note.title)}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#9CA3AF',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#F9FAFB';
                        e.target.style.borderColor = 'rgba(255,255,255,0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#9CA3AF';
                        e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </>
                ) : (
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      color: '#4B5563',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '13px',
                      cursor: 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    PDF Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold text-white">LokSewa Pathshala</h3>
              <p className="mt-2 text-sm text-gray-400">Nepal's premium Loksewa preparation platform</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li><a href="#exams" className="hover:text-white transition">Exams</a></li>
                <li><a href="#notes" className="hover:text-white transition">Notes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Study Guide</a></li>
                <li><a href="#" className="hover:text-white transition">Results</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2082 LokSewa Pathshala. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
