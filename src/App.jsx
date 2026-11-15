import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { IssueDetailModal } from './components/common/IssueDetailModal';
import { HomePage } from './pages/HomePage';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { TrackIssuesPage } from './pages/TrackIssuesPage';
import { Logo } from './components/common/Logo';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-[#F5F5F5]">
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-xs font-semibold shadow-2xl rounded-xl border border-[#333333]',
          style: {
            background: '#181818',
            color: '#FFFFFF',
            border: '1px solid #333333',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#F97316',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1 bg-[#000000]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportIssuePage />} />
          <Route path="/track" element={<TrackIssuesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Interactive Issue Detail Modal */}
      <IssueDetailModal />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Sleek Dark Minimal Footer */}
      <footer className="hidden md:block bg-[#000000] border-t border-[#262626] py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-[#737373]">
          <div className="flex items-center gap-2">
            <Logo size="sm" showText={false} />
            <span className="font-semibold text-[#A8A8A8]">CivicSense</span>
            <span>· Delhi NCR Civic Grid</span>
          </div>
          <span>Ghaziabad · Noida · New Delhi</span>
        </div>
      </footer>
    </div>
  );
};
