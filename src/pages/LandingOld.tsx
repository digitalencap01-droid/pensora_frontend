import React from 'react';
import SmoothScroll from '../components/landing/SmoothScroll';
import LandingNavbar from '../components/landing/LandingNavbar';
import LandingHero from '../components/landing/LandingHero';
import LandingIntro from '../components/landing/LandingIntro';
import LandingBenefits from '../components/landing/LandingBenefits';
import LandingImageBanner from '../components/landing/LandingImageBanner';
import LandingServices from '../components/landing/LandingServices';
import LandingOneStop from '../components/landing/LandingOneStop';
import LandingMetrics from '../components/landing/LandingMetrics';
import LandingDataBanner from '../components/landing/LandingDataBanner';
import LandingShowcase from '../components/landing/LandingShowcase';
import LandingVideoSection from '../components/landing/LandingVideoSection';
import LandingPricing from '../components/landing/LandingPricing';
import LandingTestimonials from '../components/landing/LandingTestimonials';
import LandingInsights from '../components/landing/LandingInsights';
import LandingFinalCTA from '../components/landing/LandingFinalCTA';
import LandingFooter from '../components/landing/LandingFooter';

export const LandingOld: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-theme-textDark font-sans selection:bg-theme-lime selection:text-theme-textDark antialiased overflow-x-hidden">
      {/* Lenis Smooth Scroll Engine */}
      <SmoothScroll />
      
      {/* 72px Navigation header bar */}
      <LandingNavbar />
      
      {/* Hero Section (Asymmetric columns with overlapping stats) */}
      <LandingHero />
      
      {/* About/Workspace section with translucent count badge */}
      <LandingIntro />
      
      {/* Open whitespace benefits block */}
      <LandingBenefits />
      
      {/* Full width photographic banner with glass card layout */}
      <LandingImageBanner />
      
      {/* Services Editorial list grid (6 cards) */}
      <LandingServices />
      
      {/* One Stop team indicator (asymmetric columns with 01-04 labels) */}
      <LandingOneStop />
      
      {/* Horizontally aligned large metric stats */}
      <LandingMetrics />
      
      {/* Photographic landscape banner with text alignments on right */}
      <LandingDataBanner />
      
      {/* Case studies asymmetric portfolio container */}
      <LandingShowcase />
      
      {/* Play video placeholder preview and bottom gradient CTA */}
      <LandingVideoSection />
      
      {/* Pricing plans Starter, Growth, Enterprise */}
      <LandingPricing />
      
      {/* Client testimonies slide deck and metrics display */}
      <LandingTestimonials />
      
      {/* Editorial ideas & blogs feed */}
      <LandingInsights />
      
      {/* Final premium gradient CTA strip */}
      <LandingFinalCTA />
      
      {/* 4-Column Footer layout and email form */}
      <LandingFooter />
    </div>
  );
};

export default LandingOld;
