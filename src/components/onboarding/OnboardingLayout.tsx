import React from 'react';
import { Sparkles, HelpCircle, ShieldCheck, Check } from 'lucide-react';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  children
}) => {
  const [transparentRobot, setTransparentRobot] = React.useState<string>('/onboarding-robot.jpg');

  // Breadth-First Search (BFS) Flood Fill background removal for the robot image.
  // This removes ONLY the outer black background pixels connected to the borders,
  // leaving the robot's black face screen and inner shadows 100% intact and high-quality!
  React.useEffect(() => {
    const img = new Image();
    img.src = '/onboarding-robot.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      // A pixel is considered background black if RGB values are low
      const isBlack = (x: number, y: number) => {
        const idx = (y * w + x) * 4;
        return data[idx] < 38 && data[idx + 1] < 38 && data[idx + 2] < 38;
      };

      // Add all outer border pixels to the queue if they are black background
      for (let x = 0; x < w; x++) {
        if (isBlack(x, 0)) { queue.push(x, 0); visited[0 * w + x] = 1; }
        if (isBlack(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
      }
      for (let y = 1; y < h - 1; y++) {
        if (isBlack(0, y)) { queue.push(0, y); visited[y * w + 0] = 1; }
        if (isBlack(w - 1, y)) { queue.push(w - 1, y); visited[y * w + (w - 1)] = 1; }
      }

      // Perform BFS traversal to find all contiguous outer black pixels
      let head = 0;
      const dx = [0, 0, 1, -1];
      const dy = [1, -1, 0, 0];

      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];

        for (let i = 0; i < 4; i++) {
          const nx = cx + dx[i];
          const ny = cy + dy[i];

          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nIdx = ny * w + nx;
            if (!visited[nIdx] && isBlack(nx, ny)) {
              visited[nIdx] = 1;
              queue.push(nx, ny);
            }
          }
        }
      }

      // Convert contiguous outer black pixels to alpha=0 transparent pixels
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (visited[y * w + x]) {
            const idx = (y * w + x) * 4;
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTransparentRobot(canvas.toDataURL('image/png'));
    };
  }, []);

  // Map our 1 to 7 steps to the new 5-step stepper layout:
  // Step 1: Workspace Intro (1 - Workspace Info)
  // Step 2: Website Analysis (2 - Website Analysis)
  // Step 3: Products Goal (3 - Business Goals)
  // Step 4: Market Audience (4 - Preferences)
  // Step 5: Channels Tone (4 - Preferences)
  // Step 6: AI Summary (5 - Ready to Launch)
  // Step 7: Plan Ready (5 - Ready to Launch)
  const getStepperIndex = (step: number) => {
    if (step === 1) return 1;
    if (step === 2) return 2;
    if (step === 3) return 3;
    if (step === 4 || step === 5) return 4;
    return 5;
  };

  const activeStepperIndex = getStepperIndex(currentStep);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden antialiased font-sans bg-slate-50"
      style={{
        backgroundImage: 'url(/onboarding-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 760px Card height (exact perfect layout height matching mockup without empty bottom spacing) */}
      <div className="w-full max-w-[1240px] bg-white border border-slate-100 rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.045)] flex flex-col lg:flex-row lg:h-[760px] lg:max-h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Column (Purple brand side panel with robot illustration) */}
        <div className="hidden lg:flex flex-col justify-between w-[310px] p-8 bg-gradient-to-b from-[#EAEEF6] to-[#E2E8F3] border-r border-slate-200/50 shrink-0">
          
          {/* GrowWise AI Logo */}
          <div className="flex items-center">
            <img 
              src="/growwise-logo.png" 
              alt="GrowWise AI" 
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Center Brand Text & Illustration */}
          <div className="space-y-6 flex-1 flex flex-col justify-center py-6">
            <div className="space-y-2 text-left">
              <h3 className="text-[25px] font-extrabold text-[#151A1F] leading-tight">
                Let's set up <br />
                your <span className="italic font-serif bg-gradient-to-r from-[#5C4DF7] to-[#C8FF55] bg-clip-text text-transparent">workspace</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Tell us a few details about your business and let GrowWise AI tailor your AI workspace for smarter marketing.
              </p>
            </div>

            {/* Robot Graphic Container (larger size with completely transparent outer background) */}
            <div className="relative flex justify-center py-2 shrink-0">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-[45px] pointer-events-none" />
              <img 
                src={transparentRobot} 
                alt="GrowWise AI Assistant Robot Illustration" 
                className="w-[210px] h-[210px] object-contain relative z-10 hover:-translate-y-1.5 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Security Assurance Badge */}
          <div className="bg-white/95 border border-slate-200/50 p-4 rounded-[20px] flex items-start gap-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5C4DF7] shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="text-left space-y-0.5">
              <h4 className="text-[11px] font-bold text-slate-800">Your data is safe with us</h4>
              <p className="text-[9px] text-slate-400 font-semibold leading-normal">We use enterprise-grade security to protect your information.</p>
            </div>
          </div>

        </div>

        {/* Right Column (Stepper header, Forms, and Live Workspace Preview) */}
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Top Header Row */}
          <div className="h-[68px] border-b border-slate-100 px-8 flex items-center justify-between shrink-0">
            {/* Center GrowWise AI Logo badge */}
            <div className="flex items-center">
              <img 
                src="/growwise-logo.png" 
                alt="GrowWise AI" 
                className="h-8 w-auto object-contain"
              />
            </div>
            
            {/* Support link */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold cursor-pointer hover:text-[#5C4DF7] transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Need help?</span>
            </div>
          </div>

          {/* Stepper Indicators Grid */}
          <div className="bg-[#FAFBFD]/50 border-b border-slate-100 py-5 px-8 shrink-0">
            <div className="max-w-[720px] mx-auto flex items-center justify-between relative">
              
              {/* Stepper connector lines */}
              <div className="absolute top-[14px] left-6 right-6 h-[2.5px] bg-slate-100 z-0" />
              <div 
                className="absolute top-[14px] left-6 h-[2.5px] bg-[#5C4DF7] z-0 transition-all duration-500 ease-out" 
                style={{
                  width: `${((activeStepperIndex - 1) / 4) * 100}%`
                }}
              />

              {[
                { index: 1, label: 'Workspace Info' },
                { index: 2, label: 'Website Analysis' },
                { index: 3, label: 'Business Goals' },
                { index: 4, label: 'Preferences' },
                { index: 5, label: 'Ready to Launch' }
              ].map((step) => {
                const isActive = step.index === activeStepperIndex;
                const isCompleted = step.index < activeStepperIndex;
                return (
                  <div key={step.index} className="flex flex-col items-center z-10 relative">
                    <div 
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#5C4DF7] text-white border-[3px] border-[#5C4DF7] shadow-sm'
                          : isCompleted
                            ? 'bg-white text-[#5C4DF7] border-2 border-[#5C4DF7]'
                            : 'bg-white text-slate-400 border-2 border-slate-200'
                      }`}
                    >
                      {isCompleted ? '✓' : step.index}
                    </div>
                    
                    <span 
                      className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider block mt-1.5 transition-colors ${
                        isActive ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side-by-side main content wrapper */}
          <div className="flex-1 flex flex-col xl:flex-row overflow-y-auto p-6 md:p-8 gap-8 min-h-0">
            
            {/* Form Content body container */}
            <div className="flex-1 min-w-0 flex flex-col">
              {children}
              {/* Physical spacer element to force scroll engine to render bottom space below navigation buttons */}
              <div className="h-16 w-full shrink-0 pointer-events-none" />
            </div>

            {/* Right Preview Card (Hides on loading and final steps for cleanliness) */}
            {currentStep !== 2 && currentStep !== 8 && (
              <div className="w-full xl:w-[280px] shrink-0 hidden xl:block">
                <div className="bg-[#FAFBFD] border border-slate-200/50 rounded-[24px] p-5 shadow-xs space-y-5 text-left sticky top-0">
                  
                  {/* Title */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5C4DF7]/10 flex items-center justify-center text-[#5C4DF7]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-800">Your AI Workspace Preview</h4>
                  </div>

                  {/* Bullet checklist with mockup-perfect solid checkmarks for active and plain checks for inactive */}
                  <ul className="space-y-3">
                    {[
                      { label: 'AI Marketing Assistant (GrowWise AI)', checked: true },
                      { label: 'Campaign Insights & Analytics', checked: activeStepperIndex >= 2 },
                      { label: 'Content Strategy Generator', checked: activeStepperIndex >= 3 },
                      { label: 'Audience Insights & Targeting', checked: activeStepperIndex >= 4 }
                    ].map((item, idx) => (
                      <li key={idx} className={`flex items-center gap-2.5 text-[10px] font-bold transition-colors ${
                        item.checked ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        {item.checked ? (
                          <span className="w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 bg-[#5C4DF7] text-white">
                            <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                          </span>
                        ) : (
                          <span className="w-4.5 h-4.5 flex items-center justify-center shrink-0 text-slate-300">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        )}
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Small Live Graphic Mockup Card */}
                  <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">GROWWISE AI DASHBOARD</span>
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF55]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C4DF7]" />
                      </div>
                    </div>
                    
                    {/* Visual Graphics Mockup */}
                    <div className="flex items-center justify-between gap-4">
                      {/* Pie chart */}
                      <div className="w-9 h-9 rounded-full border-2 border-slate-50 flex items-center justify-center shrink-0 shadow-xs" 
                        style={{
                          background: 'conic-gradient(#5C4DF7 0% 65%, #10B981 65% 85%, #F59E0B 85% 100%)'
                        }}
                      />
                      {/* Bar chart mockup */}
                      <div className="flex-1 flex items-end gap-1.5 h-10 justify-end">
                        <div className="w-1.5 h-6 bg-[#5C4DF7] rounded-full" />
                        <div className="w-1.5 h-8 bg-[#5C4DF7] rounded-full opacity-60" />
                        <div className="w-1.5 h-10 bg-[#5C4DF7] rounded-full opacity-30" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OnboardingLayout;
