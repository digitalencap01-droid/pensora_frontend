import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, ShieldCheck, TrendingUp, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!consent) {
      setError('Please agree to website analysis consent to proceed');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulated signup latency
    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding');
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#ECEFFB] bg-[radial-gradient(circle_at_top_right,rgba(236,220,251,1)_0%,rgba(236,239,251,1)_100%)] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto antialiased font-sans">
      {/* Combined Single Container (Mockup Style: Left form and right image are joined seamlessly) */}
      <div className="w-full max-w-[1020px] bg-white rounded-[40px] shadow-[0_30px_70px_rgba(112,101,245,0.08)] border border-white/85 flex flex-col lg:flex-row overflow-hidden lg:h-[620px] my-auto">
        
        {/* Left Column: Form (44% width) */}
        <div className="w-full lg:w-[46%] xl:w-[44%] bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between shrink-0 lg:h-full">
          {/* Brand Header: Rebranded from Aura to webobuzz */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C8FF55] to-[#5C4DF7] flex items-center justify-center text-[#151A1F] font-black text-sm shadow-sm shadow-[#5C4DF7]/25">
                W
              </div>
              <div>
                <span className="font-extrabold text-[#151A1F] text-base tracking-tight leading-none block">webobuzz</span>
                <span className="text-[8px] text-[#5C4DF7] font-bold bg-[#5C4DF7]/10 px-1.5 py-0.5 rounded mt-0.5 inline-block uppercase">AI Platform</span>
              </div>
            </div>

            <span className="text-[9px] font-extrabold text-[#5C4DF7] uppercase tracking-widest bg-brand-50 border border-brand-100/60 px-2.5 py-1 rounded-xl">
              Register
            </span>
          </div>

          {/* Form Body Container */}
          <div className="flex-1 flex flex-col justify-center py-4 w-full text-left">
            {/* Heading Block - webobuzz branding: "Smart Digital Marketing For Real Business Growth" color scheme */}
            <div className="space-y-1.5 mb-5">
              <h2 className="text-2.5xl font-black text-[#151A1F] tracking-tight leading-tight">
                Create your <br />
                <span className="text-[#5C4DF7] font-serif italic">Digital Marketing</span> Account
              </h2>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Register in under a minute to start automating templates.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-3.5">
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-750 text-[10px] font-bold rounded-2xl animate-pulse">
                  ⚠️ {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block pl-1">
                  Email Address
                </label>
                <div className="relative rounded-2xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-405">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="w-full border border-slate-200 rounded-2xl pl-10 pr-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-bold transition-all duration-200 placeholder:text-slate-300"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label htmlFor="password" className="text-[10px] font-bold text-slate-455 uppercase tracking-widest block pl-1">
                  Password
                </label>
                <div className="relative rounded-2xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-405">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full border border-slate-200 rounded-2xl pl-10 pr-4 py-3.5 text-xs focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-[#5C4DF7] bg-white text-slate-800 font-bold transition-all duration-200 placeholder:text-slate-350"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-0.5 text-[9.5px] text-slate-455 leading-snug font-bold">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => { setConsent(e.target.checked); setError(''); }}
                  className="h-4 w-4 rounded border-slate-200 text-[#5C4DF7] focus:ring-brand-500 cursor-pointer mt-0.5 shrink-0"
                />
                <label htmlFor="consent" className="cursor-pointer select-none">
                  I authorize webobuzz to scan my website, identify SEO issues, and audit competitors.
                </label>
              </div>

              {/* Info Security Banner */}
              <div className="bg-[#5C4DF7]/5 border border-[#5C4DF7]/10 rounded-2.5xl p-3.5 flex gap-3.5 items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-[#5C4DF7]/15 shrink-0 text-xs shadow-xs">
                  🤖
                </div>
                <p className="text-[10px] text-slate-700 font-bold leading-tight flex-1">
                  Credentials are encrypted. Workspace configurations are sandboxed.
                </p>
                <Sparkles className="w-3.5 h-3.5 text-[#5C4DF7] shrink-0 animate-pulse" />
              </div>

              {/* Submit Button - Lime Green matching landing page */}
              <div className="pt-1.5">
                <Button 
                  type="submit" 
                  className="w-full justify-center rounded-2xl bg-[#C8FF55] hover:bg-[#bceb4c] text-[#151A1F] font-extrabold hover:-translate-y-[2px] active:translate-y-0 transition-all shadow-xs py-4.5 text-xs border-0"
                  isLoading={loading}
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                </Button>
              </div>
            </form>

            {/* Bypass Link */}
            <div className="mt-3 text-center">
              <button
                onClick={() => navigate('/onboarding')}
                className="text-xs text-[#5C4DF7] hover:text-[#C8FF55] font-extrabold transition-colors"
              >
                Or bypass signup to demo onboarding
              </button>
            </div>
          </div>

          {/* Centered Lock Footer */}
          <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 pt-3 border-t border-slate-100/60 font-bold">
            <span>🔒</span>
            <span>Secure & private. Your data is protected.</span>
          </div>
        </div>

        {/* Right Column: Visual Showcase (Combined layout, using object-contain to prevent zoom cropping) */}
        <div className="hidden lg:block flex-1 relative overflow-hidden lg:h-full bg-[#E0D8FF]">
          {/* Cover image of the unified layout - object-contain and padding prevents any zoomed-in cropping */}
          <img
            src="/robot-hero-full.jpg"
            alt="webobuzz AI illustration"
            className="absolute inset-0 w-full h-full object-contain p-6 select-none pointer-events-none"
          />

          {/* Sparkly text overlays in hand-drawn serif style */}
          <div className="absolute top-12 left-12 z-20 text-left font-serif italic text-3xl text-brand-700/80 leading-tight">
            AI-Powered.<br />
            Results Driven.
          </div>

          {/* Bottom stats banner inside right visual panel */}
          <div className="absolute bottom-8 left-8 right-8 z-20 bg-white/80 backdrop-blur-xl border border-white/45 shadow-xl rounded-3xl py-5 px-6 flex justify-between items-center text-slate-800">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#5C4DF7] shrink-0" />
              <div className="text-left leading-none">
                <span className="text-sm font-black text-slate-800 block">100%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Secure</span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-300/40" />

            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-[#5C4DF7] shrink-0" />
              <div className="text-left leading-none">
                <span className="text-sm font-black text-slate-800 block">5,000+</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Businesses Grow</span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-300/40" />

            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 text-[#5C4DF7] shrink-0" />
              <div className="text-left leading-none">
                <span className="text-sm font-black text-slate-800 block">4.9/5</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
