import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SyllabusPage from './pages/SyllabusPage';
import NotesPage from './pages/NotesPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/syllabus/:examSlug" element={<SyllabusPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:examSlug" element={<NotesPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
