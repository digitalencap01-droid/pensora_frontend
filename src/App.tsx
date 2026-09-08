import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketingProvider } from './context/MarketingContext';
import AppLayout from './components/layout/AppLayout';

// Public Pages
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';

// Authenticated Pages
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Plan from './pages/Plan';
import Actions from './pages/Actions';
import Content from './pages/Content';
import Website from './pages/Website';
import Ads from './pages/Ads';
import Results from './pages/Results';
import Recommendations from './pages/Recommendations';
import Settings from './pages/Settings';
import Contacts from './pages/Contacts';

export const App: React.FC = () => {
  return (
    <MarketingProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Onboarding Sub-Routes mapping directly to Onboarding page */}
          <Route path="/onboarding/website" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding/business" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding/goal" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding/connect" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding/analyzing" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding/plan" element={<Navigate to="/onboarding" replace />} />

          {/* Authenticated Dashboard Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/content" element={<Content />} />
            <Route path="/website" element={<Website />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/results" element={<Results />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MarketingProvider>
  );
};
export default App;
