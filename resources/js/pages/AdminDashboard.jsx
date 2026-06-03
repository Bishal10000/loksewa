import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, FileText, Upload, Check, AlertCircle, Trash2 } from 'lucide-react';

// Import exams data
import { exams } from '../data/exams';
import { fetchNotesFromApi, fetchSyllabiFromApi } from '../lib/contentApi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('syllabus');
  const [syllabusList, setSyllabusList] = useState([]);
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Syllabus Form states
  const [syllabusForm, setSyllabusForm] = useState({
    exam_slug: '',
    paper_number: '',
    file: null,
    description: '',
  });

  // Study Notes Form states
  const [noteForm, setNoteForm] = useState({
    title: '',
    exam_slugs: [],
    category: '',
    difficulty: 'medium',
    file: null,
    description: '',
    chapters: [''],
  });

  // Note categories
  const noteCategories = [
    { value: 'gk', label: 'General Knowledge (GK)', icon: '🟡' },
    { value: 'constitution', label: 'Nepal Constitution (Samwidhan)', icon: '🟢' },
    { value: 'governance', label: 'Governance System (Shasan Pranali)', icon: '🔵' },
    { value: 'contemporary', label: 'Contemporary Issues (Samsamayik)', icon: '🟣' },
    { value: 'aptitude', label: 'Mathematics & Aptitude', icon: '🔴' },
    { value: 'office', label: 'Office Management', icon: '🩵' },
    { value: 'law', label: 'Law & Acts', icon: '🟢' },
    { value: 'english', label: 'English Language', icon: '🔵' },
    { value: 'other', label: 'Other', icon: '🟠' },
  ];

  const noteStorageKey = 'loksewa_notes';
  const syllabusStorageKey = 'loksewa_syllabi';

  const exampleKharidarChapters = [
    'General Information about the Universe',
    'Geography of World',
    'Geography of Nepal',
    'History of the World',
    'History of Nepal',
    'Social and Cultural Aspects of Nepal',
    'Economic Status of Nepal',
    'Health, Science and Technology',
    'Ecosystem and Environment',
    'International Affairs and Institutions',
    'Current Affairs',
  ];

  const readStoredCollection = (storageKey) => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const writeStoredCollection = (storageKey, items) => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  };

  // Convert file to base64 data URL for persistent storage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        if (!file) {
          reject(new Error('No file provided'));
          return;
        }
        
        if (!(file instanceof File)) {
          reject(new Error(`Invalid file type: ${typeof file}`));
          return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
          console.log('✅ FileReader.onload success, base64 length:', reader.result?.length);
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          console.error('❌ FileReader.onerror:', error);
          reject(error);
        };
        reader.onabort = () => {
          console.error('❌ FileReader.onabort');
          reject(new Error('File reading aborted'));
        };
        
        console.log('📖 Starting FileReader.readAsDataURL for:', file.name);
        reader.readAsDataURL(file);
      } catch (err) {
        console.error('❌ Exception in fileToBase64:', err);
        reject(err);
      }
    });
  };

  const resetSyllabusForm = () => {
    setSyllabusForm({
      exam_slug: '',
      paper_number: '',
      file: null,
      description: '',
    });
  };

  const resetNoteForm = () => {
    setNoteForm({
      title: '',
      exam_slugs: [],
      category: '',
      difficulty: 'medium',
      file: null,
      description: '',
      chapters: [''],
    });
  };

  // Get selected exam
  const selectedExam = exams.find((exam) => exam.slug === syllabusForm.exam_slug);
  const selectedPaper = selectedExam?.papers?.find((paper) => paper.number === parseInt(syllabusForm.paper_number, 10));

  // Get papers for selected exam
  const getPapersForExam = (examSlug) => {
    const exam = exams.find(e => e.slug === examSlug);
    if (!exam) return [];
    return exam.papers || [];
  };

  // Generate title from selections
  const generateSyllabusTitle = () => {
    return selectedPaper?.name || 'Uploaded syllabus';
  };

  // Validate form
  const validateSyllabusForm = () => {
    const newErrors = {};
    if (!syllabusForm.exam_slug) newErrors.exam_slug = 'Please select an exam';
    if (!syllabusForm.paper_number) newErrors.paper_number = 'Please select a paper';
    if (!syllabusForm.file) newErrors.file = 'Please upload a PDF file';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNoteForm = () => {
    const newErrors = {};
    if (!noteForm.title.trim()) newErrors.title = 'Please add a note title';
    if (noteForm.exam_slugs.length === 0) newErrors.exam_slugs = 'Please select at least one exam';
    if (!noteForm.category) newErrors.category = 'Please select a category';
    if (!noteForm.file) newErrors.file = 'Please upload a PDF file';
    if (!noteForm.description.trim()) newErrors.description = 'Please add a description';
    if (!noteForm.chapters.some((chapter) => chapter.trim())) newErrors.chapters = 'Please add at least one applicable chapter';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    checkAuth();
    loadContent();
  }, []);

  useEffect(() => {
    if (syllabusForm.exam_slug === 'kharidar' && syllabusForm.paper_number === '1') {
      setSyllabusForm((current) => {
        if (current.chapters.length === exampleKharidarChapters.length && current.chapters.every((chapter, index) => chapter === exampleKharidarChapters[index])) {
          return current;
        }

        if (current.chapters.length === 1 && !current.chapters[0].trim()) {
          return {
            ...current,
            chapters: exampleKharidarChapters,
          };
        }

        return current;
      });
    }
  }, [syllabusForm.exam_slug, syllabusForm.paper_number]);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    const userStr = localStorage.getItem('admin_user');

    if (!token || !userStr) {
      navigate('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(userStr));
    } catch (err) {
      navigate('/admin/login');
    }
  };

  const loadContent = () => {
    const loadFromApi = async () => {
      try {
        const [syllabi, notes] = await Promise.all([fetchSyllabiFromApi(), fetchNotesFromApi()]);
        setSyllabusList(syllabi);
        setNotesList(notes);
      } catch {
        setSyllabusList(readStoredCollection(syllabusStorageKey));
        setNotesList(readStoredCollection(noteStorageKey));
      }
    };

    void loadFromApi();
  };

  const getAdminHeaders = () => {
    const token = localStorage.getItem('admin_token');

    return {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const apiRequest = async (path, options = {}) => {
    const response = await fetch(path, {
      ...options,
      headers: {
        ...getAdminHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.message || `Request failed with status ${response.status}`);
    }

    return response.json().catch(() => ({}));
  };

  const handleAddSyllabus = async (e) => {
    e.preventDefault();
    setErrors({});
    
    console.log('🔄 handleAddSyllabus started, form state:', {
      exam_slug: syllabusForm.exam_slug,
      paper_number: syllabusForm.paper_number,
      file: syllabusForm.file?.name,
      hasFile: !!syllabusForm.file
    });
    
    if (!validateSyllabusForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      const chapterPayload = Array.isArray(syllabusForm.chapters)
        ? syllabusForm.chapters
            .map((chapter, index) => ({ id: index + 1, title: chapter.trim() }))
            .filter((chapter) => chapter.title)
        : [];

      payload.append('title', generateSyllabusTitle());
      payload.append('exam_slug', syllabusForm.exam_slug);
      payload.append('exam_name', selectedExam?.nameEnglish || '');
      payload.append('paper', syllabusForm.paper_number);
      payload.append('paper_name', selectedPaper?.name || generateSyllabusTitle());
      payload.append('description', syllabusForm.description.trim());
      payload.append('file', syllabusForm.file);
      payload.append('chapters', JSON.stringify(chapterPayload));

      await apiRequest('/api/syllabus', {
        method: 'POST',
        body: payload,
      });

      await loadContent();
      resetSyllabusForm();
      console.log('✅ handleAddSyllabus completed successfully');
    } catch (err) {
      console.error('❌ Error adding syllabus:', err);
      console.error('Stack:', err.stack);
      setErrors({ submit: 'Error uploading syllabus: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setErrors({});
    
    console.log('🔄 handleAddNote started, form state:', {
      title: noteForm.title,
      exam_slugs: noteForm.exam_slugs,
      category: noteForm.category,
      file: noteForm.file?.name,
      hasFile: !!noteForm.file
    });
    
    if (!validateNoteForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    setLoading(true);

    try {
      const selectedCategory = noteCategories.find((category) => category.value === noteForm.category);
      const chapters = noteForm.chapters
        .map((chapter, index) => ({ id: index + 1, title: chapter.trim() }))
        .filter((chapter) => chapter.title);

      const payload = new FormData();
      payload.append('title', noteForm.title.trim());
      payload.append('category', noteForm.category);
      payload.append('difficulty', noteForm.difficulty);
      payload.append('description', noteForm.description.trim());
      payload.append('file', noteForm.file);
      payload.append('exam_slugs', JSON.stringify(noteForm.exam_slugs));
      payload.append('chapters', JSON.stringify(chapters));

      if (selectedCategory) {
        payload.append('category_label', selectedCategory.label);
      }

      await apiRequest('/api/notes', {
        method: 'POST',
        body: payload,
      });

      await loadContent();
      resetNoteForm();
      console.log('✅ handleAddNote completed successfully');
    } catch (err) {
      console.error('❌ Error adding note:', err);
      console.error('Stack:', err.stack);
      setErrors({ submit: 'Error uploading note: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSyllabus = (id) => {
    if (!window.confirm('Delete this syllabus?')) return;

    apiRequest(`/api/syllabus/${id}`, {
      method: 'DELETE',
    })
      .then(() => loadContent())
      .catch((err) => {
      console.error('Error deleting syllabus:', err);
      });
  };

  const handleDeleteNote = (id) => {
    if (!window.confirm('Delete this note?')) return;

    apiRequest(`/api/notes/${id}`, {
      method: 'DELETE',
    })
      .then(() => loadContent())
      .catch((err) => {
      console.error('Error deleting note:', err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#080C14' }} className="min-h-screen">
      {/* Header */}
      <div style={{ borderBottomColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15,22,36,0.5)' }} className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span style={{ color: '#9CA3AF' }}>{user?.email}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(220,20,60,0.2)',
                borderColor: 'rgba(220,20,60,0.5)',
                color: '#FCA5A5'
              }}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:opacity-80 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }} className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('syllabus')}
            style={{
              color: activeTab === 'syllabus' ? '#DC143C' : '#4B5563',
              borderBottomColor: activeTab === 'syllabus' ? '#DC143C' : 'transparent',
              borderBottomWidth: activeTab === 'syllabus' ? '2px' : '2px'
            }}
            className="px-4 py-2 font-semibold transition"
          >
            <BookOpen className="inline mr-2" size={18} />
            Syllabus
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            style={{
              color: activeTab === 'notes' ? '#DC143C' : '#4B5563',
              borderBottomColor: activeTab === 'notes' ? '#DC143C' : 'transparent',
              borderBottomWidth: activeTab === 'notes' ? '2px' : '2px'
            }}
            className="px-4 py-2 font-semibold transition"
          >
            <FileText className="inline mr-2" size={18} />
            Study Notes
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div style={{ backgroundColor: 'rgba(220,20,60,0.1)', borderColor: 'rgba(220,20,60,0.3)' }} className="mb-6 p-4 border rounded-lg flex items-center gap-2">
            <AlertCircle size={20} style={{ color: '#F87171' }} />
            <p style={{ color: '#F87171' }}>{errors.submit}</p>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div className="space-y-8">
            {/* Add Syllabus Form */}
            <div style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-2xl p-8">
              <h2 style={{ color: '#F9FAFB' }} className="text-xl font-bold mb-6">Upload Syllabus PDF</h2>

              <form onSubmit={handleAddSyllabus} className="space-y-6">
                {/* Exam Dropdown */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Select Exam</label>
                  <select
                    value={syllabusForm.exam_slug}
                    onChange={(e) => {
                      setSyllabusForm({ ...syllabusForm, exam_slug: e.target.value, paper_number: '', chapters: [''] });
                      setErrors({});
                    }}
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: errors.exam_slug ? 'rgba(220,20,60,0.7)' : 'rgba(255,255,255,0.1)',
                      color: '#F9FAFB'
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition"
                  >
                    <option value="">Choose an exam...</option>
                    {exams.map((exam) => (
                      <option key={exam.slug} value={exam.slug}>
                        {exam.nameEnglish} ({exam.nameNepali})
                      </option>
                    ))}
                  </select>
                  {errors.exam_slug && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.exam_slug}</p>}
                </div>

                {/* Paper Dropdown */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Select Paper</label>
                  <select
                    value={syllabusForm.paper_number}
                    onChange={(e) => {
                      setSyllabusForm({
                        ...syllabusForm,
                        paper_number: e.target.value,
                        chapters:
                          syllabusForm.exam_slug === 'kharidar' && e.target.value === '1'
                            ? exampleKharidarChapters
                            : [''],
                      });
                      setErrors({});
                    }}
                    disabled={!syllabusForm.exam_slug}
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: errors.paper_number ? 'rgba(220,20,60,0.7)' : 'rgba(255,255,255,0.1)',
                      color: syllabusForm.exam_slug ? '#F9FAFB' : '#6B7280',
                      opacity: syllabusForm.exam_slug ? 1 : 0.5
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition disabled:cursor-not-allowed"
                  >
                    <option value="">Choose a paper...</option>
                    {getPapersForExam(syllabusForm.exam_slug).map((paper) => (
                      <option key={paper.number} value={paper.number}>
                        {paper.name} ({paper.totalMarks} marks)
                      </option>
                    ))}
                  </select>
                  {errors.paper_number && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.paper_number}</p>}
                </div>

                {/* PDF File Upload */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Upload PDF File</label>
                  <label
                    style={{
                      backgroundColor: syllabusForm.file ? 'rgba(16,185,129,0.05)' : 'rgba(220,20,60,0.05)',
                      borderColor: syllabusForm.file ? 'rgba(16,185,129,0.5)' : 'rgba(220,20,60,0.3)',
                      borderStyle: 'dashed',
                      borderWidth: '2px'
                    }}
                    className="block rounded-xl p-8 text-center cursor-pointer hover:opacity-80 transition"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        setSyllabusForm({ ...syllabusForm, file: e.target.files?.[0] || null });
                        setErrors({});
                      }}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      {syllabusForm.file ? (
                        <>
                          <Check size={24} style={{ color: '#10B981' }} />
                          <p style={{ color: '#10B981' }} className="text-sm font-medium">{syllabusForm.file.name}</p>
                        </>
                      ) : (
                        <>
                          <Upload size={24} style={{ color: '#9CA3AF' }} />
                          <p style={{ color: '#9CA3AF' }} className="text-sm">Click to upload or drag PDF here</p>
                        </>
                      )}
                    </div>
                  </label>
                  {errors.file && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.file}</p>}
                </div>

                {/* Description */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Additional Notes (Optional)</label>
                  <textarea
                    value={syllabusForm.description}
                    onChange={(e) => setSyllabusForm({ ...syllabusForm, description: e.target.value })}
                    placeholder="Any notes about this syllabus version, year, or updates..."
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#F9FAFB'
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition"
                    rows={3}
                  />
                </div>

                {/* Auto-generated Title Preview */}
                {selectedPaper && (
                  <div style={{ color: '#9CA3AF', backgroundColor: 'rgba(255,255,255,0.02)' }} className="text-sm p-3 rounded-lg">
                    <span className="font-medium">Will be saved as:</span> {generateSyllabusTitle()}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C 0%, #B22222 100%)',
                    color: '#FFFFFF'
                  }}
                  className="w-full py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Syllabus'}
                </button>
              </form>
            </div>

            {/* Syllabus List */}
            <div>
              <h3 style={{ color: '#F9FAFB' }} className="text-lg font-bold mb-4">Uploaded Syllabi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {syllabusList.length === 0 ? (
                  <p style={{ color: '#6B7280' }}>No syllabi uploaded yet.</p>
                ) : (
                  syllabusList.map((syl) => (
                    <div key={syl.id} style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-xl p-4">
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ backgroundColor: '#DC143C', color: '#FFFFFF' }} className="px-2 py-1 rounded-full text-xs font-semibold">
                            {syl.examName}
                          </span>
                          <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#9CA3AF' }} className="px-2 py-1 rounded-full text-xs font-medium">
                            {syl.chapters?.length || 0} chapters
                          </span>
                        </div>
                        <h4 style={{ color: '#F9FAFB' }} className="font-semibold">{syl.paperName}</h4>
                        <p style={{ color: '#9CA3AF' }} className="text-xs mt-1">Paper {syl.paper}</p>
                        {syl.description && <p style={{ color: '#D1D5DB' }} className="text-sm mt-2">{syl.description}</p>}
                      </div>
                      <div className="flex gap-2 pt-3" style={{ borderTopColor: 'rgba(255,255,255,0.08)', borderTopWidth: '1px' }}>
                        {syl.fileUrl && (
                          <a
                            href={syl.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-center hover:opacity-80 transition"
                            style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}
                          >
                            View PDF
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteSyllabus(syl.id)}
                          className="px-3 py-2 rounded-lg hover:opacity-80 transition"
                          style={{ backgroundColor: 'rgba(220,20,60,0.1)', color: '#F87171' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Study Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            {/* Add Note Form */}
            <div style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-2xl p-8">
              <h2 style={{ color: '#F9FAFB' }} className="text-xl font-bold mb-6">Upload Study Note</h2>

              <form onSubmit={handleAddNote} className="space-y-6">
                {/* Title */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Note Title</label>
                  <input
                    value={noteForm.title}
                    onChange={(e) => {
                      setNoteForm({ ...noteForm, title: e.target.value });
                      setErrors({});
                    }}
                    placeholder="e.g. Geography of Nepal"
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: errors.title ? 'rgba(220,20,60,0.7)' : 'rgba(255,255,255,0.1)',
                      color: '#F9FAFB'
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition"
                  />
                  {errors.title && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.title}</p>}
                </div>

                {/* Exams Multi-select */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Applicable Exams (Select All That Apply)</label>
                  <div style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.1)' }} className="border rounded-xl p-3 space-y-2">
                    {exams.map((exam) => (
                      <label key={exam.slug} className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                        <input
                          type="checkbox"
                          checked={noteForm.exam_slugs.includes(exam.slug)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNoteForm({ ...noteForm, exam_slugs: [...noteForm.exam_slugs, exam.slug] });
                            } else {
                              setNoteForm({ ...noteForm, exam_slugs: noteForm.exam_slugs.filter(s => s !== exam.slug) });
                            }
                            setErrors({});
                          }}
                          style={{ accentColor: '#DC143C' }}
                          className="w-4 h-4"
                        />
                        <span style={{ color: '#F9FAFB' }} className="text-sm">{exam.nameEnglish} ({exam.nameNepali})</span>
                      </label>
                    ))}
                  </div>
                  {errors.exam_slugs && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.exam_slugs}</p>}
                </div>

                {/* Category Dropdown */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Note Category</label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => {
                      setNoteForm({ ...noteForm, category: e.target.value });
                      setErrors({});
                    }}
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: errors.category ? 'rgba(220,20,60,0.7)' : 'rgba(255,255,255,0.1)',
                      color: '#F9FAFB'
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition"
                  >
                    <option value="">Select a category...</option>
                    {noteCategories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.category}</p>}
                </div>

                {/* Difficulty Level */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-3">Difficulty Level</label>
                  <div className="flex gap-3">
                    {['easy', 'medium', 'hard'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setNoteForm({ ...noteForm, difficulty: level })}
                        style={{
                          backgroundColor: noteForm.difficulty === level ? '#DC143C' : 'rgba(255,255,255,0.08)',
                          borderColor: noteForm.difficulty === level ? '#DC143C' : 'rgba(255,255,255,0.1)',
                          color: noteForm.difficulty === level ? '#FFFFFF' : '#9CA3AF'
                        }}
                        className="flex-1 px-4 py-2 rounded-xl border font-medium capitalize transition hover:opacity-80"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applicable Chapters/Units */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-xl p-5 space-y-4">
                  <div>
                    <h3 style={{ color: '#F9FAFB' }} className="text-base font-semibold">Applicable Chapters/Units</h3>
                    <p style={{ color: '#9CA3AF' }} className="text-sm mt-1">Which chapters does this note cover?</p>
                  </div>

                  <div className="space-y-3">
                    {noteForm.chapters.map((chapter, index) => (
                      <div key={`${index}-${chapter}`} className="flex items-center gap-3">
                        <span style={{ color: '#DC143C' }} className="w-6 shrink-0 text-sm font-bold">
                          {index + 1}
                        </span>
                        <input
                          value={chapter}
                          onChange={(e) => {
                            const nextChapters = [...noteForm.chapters];
                            nextChapters[index] = e.target.value;
                            setNoteForm({ ...noteForm, chapters: nextChapters });
                            setErrors({});
                          }}
                          placeholder="e.g. Geography of Nepal"
                          style={{
                            backgroundColor: '#080C14',
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: '#F9FAFB'
                          }}
                          className="w-[calc(100%-40px)] flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-red-500 transition"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const nextChapters = noteForm.chapters.filter((_, chapterIndex) => chapterIndex !== index);
                            setNoteForm({ ...noteForm, chapters: nextChapters.length ? nextChapters : [''] });
                          }}
                          style={{ backgroundColor: 'rgba(220,20,60,0.1)', color: '#DC143C' }}
                          className="w-8 h-8 rounded-md flex items-center justify-center hover:opacity-80 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setNoteForm({ ...noteForm, chapters: [...noteForm.chapters, ''] })}
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(220,20,60,0.3)',
                        color: '#DC143C'
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-[rgba(220,20,60,0.08)] transition"
                    >
                      <span className="text-base leading-none">+</span>
                      Add Chapter
                    </button>
                  </div>
                  {errors.chapters && <p style={{ color: '#F87171' }} className="text-xs">{errors.chapters}</p>}
                </div>

                {/* PDF File Upload */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Upload PDF File</label>
                  <label
                    style={{
                      backgroundColor: noteForm.file ? 'rgba(16,185,129,0.05)' : 'rgba(220,20,60,0.05)',
                      borderColor: noteForm.file ? 'rgba(16,185,129,0.5)' : 'rgba(220,20,60,0.3)',
                      borderStyle: 'dashed',
                      borderWidth: '2px'
                    }}
                    className="block rounded-xl p-8 text-center cursor-pointer hover:opacity-80 transition"
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        setNoteForm({ ...noteForm, file: e.target.files?.[0] || null });
                        setErrors({});
                      }}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      {noteForm.file ? (
                        <>
                          <Check size={24} style={{ color: '#10B981' }} />
                          <p style={{ color: '#10B981' }} className="text-sm font-medium">{noteForm.file.name}</p>
                        </>
                      ) : (
                        <>
                          <Upload size={24} style={{ color: '#9CA3AF' }} />
                          <p style={{ color: '#9CA3AF' }} className="text-sm">Click to upload or drag PDF here</p>
                        </>
                      )}
                    </div>
                  </label>
                  {errors.file && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.file}</p>}
                </div>

                {/* Description */}
                <div>
                  <label style={{ color: '#9CA3AF' }} className="text-xs font-semibold uppercase tracking-widest block mb-2">Description</label>
                  <textarea
                    value={noteForm.description}
                    onChange={(e) => {
                      setNoteForm({ ...noteForm, description: e.target.value });
                      setErrors({});
                    }}
                    placeholder="Brief description of what this note covers..."
                    style={{
                      backgroundColor: '#0F1624',
                      borderColor: errors.description ? 'rgba(220,20,60,0.7)' : 'rgba(255,255,255,0.1)',
                      color: '#F9FAFB'
                    }}
                    className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:border-red-500 transition"
                    rows={3}
                  />
                  {errors.description && <p style={{ color: '#F87171' }} className="text-xs mt-1">{errors.description}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C 0%, #B22222 100%)',
                    color: '#FFFFFF'
                  }}
                  className="w-full py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Study Note'}
                </button>
              </form>
            </div>

            {/* Notes List */}
            <div>
              <h3 style={{ color: '#F9FAFB' }} className="text-lg font-bold mb-4">Uploaded Study Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notesList.length === 0 ? (
                  <p style={{ color: '#6B7280' }}>No study notes uploaded yet.</p>
                ) : (
                  notesList.map((note) => (
                    <div key={note.id} style={{ backgroundColor: '#0F1624', borderColor: 'rgba(255,255,255,0.08)' }} className="border rounded-xl p-4">
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {note.category && (
                            <span style={{ backgroundColor: 'rgba(220,20,60,0.2)', color: '#DC143C' }} className="px-2 py-1 rounded-full text-xs font-semibold">
                              {note.categoryLabel || note.category}
                            </span>
                          )}
                          <span style={{ backgroundColor: 'rgba(156,163,175,0.1)', color: '#9CA3AF' }} className="px-2 py-1 rounded-full text-xs font-medium">
                            {note.difficulty === 'easy' ? 'Easy' : note.difficulty === 'medium' ? 'Medium' : 'Hard'}
                          </span>
                        </div>
                        <h4 style={{ color: '#F9FAFB' }} className="font-semibold">{note.title}</h4>
                        {note.description && (
                          <p style={{ color: '#D1D5DB' }} className="text-sm mt-2">{note.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2 pt-3" style={{ borderTopColor: 'rgba(255,255,255,0.08)', borderTopWidth: '1px' }}>
                        {note.fileUrl && (
                          <a
                            href={note.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-center hover:opacity-80 transition"
                            style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}
                          >
                            View PDF
                          </a>
                        )}
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="px-3 py-2 rounded-lg hover:opacity-80 transition"
                          style={{ backgroundColor: 'rgba(220,20,60,0.1)', color: '#F87171' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
