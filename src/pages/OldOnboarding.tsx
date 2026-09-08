import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketing } from '../context/MarketingContext';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { WorkspaceIntroStep } from '../components/onboarding/WorkspaceIntroStep';
import { MarketAudienceStep } from '../components/onboarding/MarketAudienceStep';
import { ProductsGoalStep } from '../components/onboarding/ProductsGoalStep';
import { ChannelsToneStep } from '../components/onboarding/ChannelsToneStep';
import { AISummaryStep } from '../components/onboarding/AISummaryStep';
import { AnalysisProgress } from '../components/onboarding/AnalysisProgress';
import { PlanReady } from '../components/onboarding/PlanReady';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const {
    onboardingStep,
    setOnboardingStep,
    websiteUrl,
    setWebsiteUrl,
    business,
    setSelectedGoals,
    analysisProgress,
    startAnalysis,
    completeOnboarding,
    updateWorkspace,
    resetOnboarding
  } = useMarketing();

  useEffect(() => {
    // Initialize onboarding state with a clean temp workspace draft
    resetOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIntroSubmit = async (
    name: string, 
    url: string, 
    description: string, 
    category: string, 
    teamSize: string
  ) => {
    setWebsiteUrl(url);
    if (business?.id) {
      updateWorkspace(business.id, {
        name,
        website: url,
        description: description || 'A growing business seeking digital marketing growth.',
        industry: category,
        stage: 'growing' // Set default stage
      });
    }

    if (url) {
      setOnboardingStep(2); // Go to Step 2 (Website Analysis Loading)
      await startAnalysis(); // Trigger analysis (AnalysisProgress component will show results once complete)
    } else {
      setOnboardingStep(3); // Skip loading screen directly to Business Goals (Step 3)
    }
  };

  const handleAnalysisContinue = () => {
    setOnboardingStep(3); // Go to Step 3 (Business Goals)
  };

  const handleProductsSubmit = (data: { productsServices: string[]; growthGoal: 'leads' | 'sales' | 'awareness' | 'retention' | 're-engagement' | 'launch' }) => {
    if (business?.id) {
      updateWorkspace(business.id, data);
      // Sync legacy marketing goals context
      const legacyGoal = data.growthGoal === 'sales' ? 'sales' : data.growthGoal === 'leads' ? 'leads' : 'brand';
      setSelectedGoals([legacyGoal as any]);
    }
    setOnboardingStep(4); // Go to Step 4 (Market & Audience)
  };

  const handleMarketSubmit = (data: { location: string; targetAudienceType: 'B2B' | 'B2C' | 'Both'; targetAudienceDesc: string }) => {
    if (business?.id) {
      updateWorkspace(business.id, {
        location: data.location,
        targetMarket: data.location,
        targetAudienceType: data.targetAudienceType,
        targetAudienceDesc: data.targetAudienceDesc
      });
    }
    setOnboardingStep(5); // Go to Step 5 (Channels & Tone)
  };

  const handleChannelsSubmit = (data: { channels: string[]; toneOfVoice: 'friendly' | 'professional' | 'casual' | 'premium' | 'trustworthy' }) => {
    if (business?.id) {
      updateWorkspace(business.id, data);
    }
    setOnboardingStep(6); // Go to Step 6 (AI Strategy Summary)
  };

  const handleSummaryConfirm = (data: { aiSummary: string; recommendedFirstAction: string }) => {
    if (business?.id) {
      updateWorkspace(business.id, data);
    }
    setOnboardingStep(7); // Go to Step 7 (PlanReady Complete)
  };

  const handleFinishOnboarding = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  // Back step navigator helper
  const handleBack = () => {
    if (onboardingStep > 1) {
      // If going back from Business Goals (3) when they skipped website, go to 1
      if (onboardingStep === 3 && !websiteUrl) {
        setOnboardingStep(1);
      } else {
        setOnboardingStep(onboardingStep - 1);
      }
    }
  };

  if (!business) {
    return null;
  }

  return (
    <OnboardingLayout currentStep={onboardingStep} totalSteps={7}>
      {onboardingStep === 1 && (
        <WorkspaceIntroStep
          initialName={business.name}
          initialWebsite={websiteUrl}
          initialDescription={business.description}
          onContinue={handleIntroSubmit}
        />
      )}

      {onboardingStep === 2 && (
        <AnalysisProgress 
          progress={analysisProgress}
          businessName={business.name}
          websiteUrl={websiteUrl}
          industry={business.industry || ''}
          description={business.description}
          onContinue={handleAnalysisContinue}
          onBack={handleBack}
        />
      )}

      {onboardingStep === 3 && (
        <ProductsGoalStep
          initialProducts={business.productsServices || []}
          initialGoal={business.growthGoal || ''}
          onContinue={handleProductsSubmit}
          onBack={handleBack}
        />
      )}

      {onboardingStep === 4 && (
        <MarketAudienceStep
          initialLocation={business.location || ''}
          initialAudienceType={business.targetAudienceType || ''}
          initialAudienceDesc={business.targetAudienceDesc || ''}
          onContinue={handleMarketSubmit}
          onBack={handleBack}
        />
      )}

      {onboardingStep === 5 && (
        <ChannelsToneStep
          initialChannels={business.channels || []}
          initialTone={business.toneOfVoice || ''}
          onContinue={handleChannelsSubmit}
          onBack={handleBack}
        />
      )}

      {onboardingStep === 6 && (
        <AISummaryStep
          businessData={{
            name: business.name,
            industry: business.industry || '',
            stage: business.stage || '',
            productsServices: business.productsServices || [],
            targetAudienceDesc: business.targetAudienceDesc || '',
            channels: business.channels || [],
            growthGoal: business.growthGoal || ''
          }}
          onConfirm={handleSummaryConfirm}
          onBack={handleBack}
        />
      )}

      {onboardingStep === 7 && (
        <PlanReady onStart={handleFinishOnboarding} />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
