import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, FileText, Home } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Syllabus', icon: BookOpen, path: '/syllabus' },
    { label: 'Notes', icon: FileText, path: '/notes' },
  ];

  return (
    <header style={{ backgroundColor: '#0F1624', borderBottomColor: 'rgba(255,255,255,0.08)' }} className="sticky top-0 z-50 border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen size={28} style={{ color: '#DC143C' }} />
            <span style={{ color: '#F9FAFB' }} className="font-bold text-xl">LokSewa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                style={{ color: '#9CA3AF' }}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <a
              href="/admin/login"
              className="px-4 py-2 rounded-lg font-medium"
              style={{ backgroundColor: 'rgba(220,20,60,0.1)', color: '#DC143C' }}
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            style={{ color: '#9CA3AF' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t" style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}>
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/10 transition text-left"
                style={{ color: '#9CA3AF' }}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <a
              href="/admin/login"
              className="block px-4 py-3 rounded-lg font-medium text-center"
              style={{ backgroundColor: 'rgba(220,20,60,0.1)', color: '#DC143C' }}
            >
              Admin Login
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
