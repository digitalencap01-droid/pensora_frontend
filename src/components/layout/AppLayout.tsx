import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';
import AIAssistant from '../ai/AIAssistant';
import { useMarketing } from '../../context/MarketingContext';

export const AppLayout: React.FC = () => {
  const { isOnboarded } = useMarketing();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user has not completed onboarding, force redirect to landing or onboarding wizard
  if (!isOnboarded) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAF5F0] flex selection:bg-[#D94A2A]/20">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen">
        {/* Header */}
        <Header onMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Mobile Navigation Drawer */}
        <MobileNav 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        {/* Dynamic Page Outlet */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Widget & drawer */}
      <AIAssistant />
    </div>
  );
};
export default AppLayout;
