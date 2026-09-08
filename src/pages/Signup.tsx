import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Star,
  Headphones,
  Sparkles
} from 'lucide-react';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!isLogin && !consent) {
      setError('Please authorize website scan and competitor audit consent to proceed');
      return;
    }

    setLoading(true);
    setError('');

    // Simulated auth latency
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] bg-[radial-gradient(circle_at_top_right,rgba(254,236,220,0.6)_0%,rgba(255,247,240,1)_100%)] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans antialiased text-slate-800 select-none">
      
      {/* ========================================================
          OUTER MAIN BORDERED CONTAINER (Matches Mockup Frame)
          ======================================================== */}
      <div className="w-full max-w-[1100px] bg-[#FDE6D8] rounded-[32px] sm:rounded-[42px] border border-[#F2D0B8] shadow-[0_24px_70px_rgba(234,88,12,0.07)] p-4 sm:p-6 lg:p-7 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 lg:gap-8 my-auto">
        
        {/* ========================================================
            LEFT COLUMN: WHITE SIGNUP/LOGIN FORM CARD
            ======================================================== */}
        <div className="w-full lg:w-[420px] xl:w-[440px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 lg:p-8 border border-[#F3DEC8] shadow-[0_12px_40px_rgba(234,88,12,0.05)] flex flex-col justify-between shrink-0">
          
          {/* Top Brand Header */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2D0B38] to-[#4A154B] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4 text-[#FDBA74]" />
                </div>
                <span className="text-[21px] font-black tracking-tight text-[#1E122C]">
                  webo<span className="text-[#EA580C]">buzz</span>
                </span>
              </Link>

              {/* Toggle Mode Button */}
              <div className="flex items-center bg-[#FAF5F0] p-0.5 rounded-full border border-[#F3DEC8]">
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(''); }}
                  className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    !isLogin ? 'bg-[#D94A2A] text-white shadow-3xs' : 'text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError(''); }}
                  className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    isLogin ? 'bg-[#D94A2A] text-white shadow-3xs' : 'text-[#6B5E77] hover:text-[#1E122C]'
                  }`}
                >
                  Login
                </button>
              </div>
            </div>

            {/* AI Platform Pill */}
            <div className="mb-3 text-left">
              <span className="inline-block bg-[#FFF0E6] text-[#EA580C] text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-3xs">
                AI Platform
              </span>
            </div>

            {/* Headline & Subtitle */}
            <div className="text-left mb-4">
              <h1 className="text-[22px] sm:text-[24px] font-black text-[#1E122C] tracking-tight leading-[1.12]">
                {isLogin ? (
                  <>
                    Welcome back to<br />
                    <span className="text-[#EA580C] font-serif italic">Your Marketing</span> Workspace
                  </>
                ) : (
                  <>
                    Create your<br />
                    <span className="text-[#EA580C] font-serif italic">Digital Marketing</span> Account
                  </>
                )}
              </h1>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">
                {isLogin 
                  ? 'Sign in to access your campaigns, AI agents & analytics.'
                  : 'Register in under a minute to start automating templates.'}
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-3 text-left flex-1 flex flex-col justify-center my-1">
            
            {/* Error Message */}
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl animate-shake">
                {error}
              </div>
            )}

            {/* Email Address Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#5A5265] uppercase tracking-wider block pl-0.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="name@company.com"
                  className="w-full bg-[#FAFAFA] border border-[#E8DCD0] focus:border-[#EA580C] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#5A5265] uppercase tracking-wider block pl-0.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  className="w-full bg-[#FAFAFA] border border-[#E8DCD0] focus:border-[#EA580C] focus:bg-white rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2 pt-0.5">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => { setConsent(e.target.checked); setError(''); }}
                className="w-3.5 h-3.5 rounded border-[#D8C7B8] text-[#EA580C] focus:ring-[#EA580C] mt-0.5 cursor-pointer accent-[#EA580C]"
              />
              <label htmlFor="consent" className="text-[10.5px] text-[#5A5265] font-medium leading-tight cursor-pointer select-none">
                I authorize webobuzz to scan my website, identify SEO issues, and audit competitors.
              </label>
            </div>

            {/* Security Callout Banner */}
            <div className="bg-[#FFF6EE] border border-[#FDE6D2] rounded-xl p-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#2D0B38] text-white flex items-center justify-center shrink-0 shadow-3xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-[#1E122C] block leading-none">
                    Your data is safe with us.
                  </span>
                  <span className="text-[9.5px] text-slate-500 font-medium leading-tight block mt-0.5">
                    All credentials are encrypted and your workspace is secured.
                  </span>
                </div>
              </div>
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>

            {/* Submit Button */}
            <div className="pt-0.5">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2D0B38] hover:bg-[#3E114D] text-white font-bold py-2.5 sm:py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(45,11,56,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-75"
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center py-0.5">
              <div className="w-full border-t border-slate-100" />
              <span className="bg-white px-2.5 text-[9.5px] font-bold text-slate-400 uppercase tracking-widest absolute">
                OR
              </span>
            </div>

            {/* Bypass Button */}
            <div>
              <button
                type="button"
                onClick={() => navigate('/onboarding')}
                className="w-full bg-white hover:bg-[#FFF7ED] border border-[#EA580C]/40 hover:border-[#EA580C] text-[#EA580C] font-bold py-2.5 px-6 rounded-xl text-[11px] flex items-center justify-center gap-2 transition-all duration-200 shadow-3xs cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Or bypass signup to demo onboarding</span>
              </button>
            </div>

          </form>

          {/* Footer Privacy Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium pt-2.5 mt-1 border-t border-slate-100">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Secure & private. Your data is protected.</span>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: HEADLINE, 3D ARTWORK & BOTTOM STATS BAR
            ======================================================== */}
        <div className="flex-1 flex flex-col justify-between py-2 sm:py-3 text-left">
          
          {/* Top Headline & Subtitle */}
          <div className="space-y-1.5 pl-2 sm:pl-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1E122C] tracking-tight leading-[1.06]">
              AI-Powered.<br />
              <span className="text-[#EA580C]">Results Driven.</span>
            </h2>
            <p className="text-xs sm:text-[13px] text-[#5A5265] font-medium leading-relaxed max-w-md pt-0.5">
              Automate smarter, market faster, and grow your business effortlessly.
            </p>
            <div className="w-7 h-[3px] bg-[#EA580C] rounded-full mt-2" />
          </div>

          {/* 3D Journey Artwork Graphic (Seamlessly integrated) */}
          <div className="w-full flex items-center justify-center my-1 select-none pointer-events-none">
            <img
              src="/signup-artwork.jpg"
              alt="webobuzz AI Marketing automation flow"
              className="w-full max-w-[560px] h-auto object-contain"
            />
          </div>

          {/* Bottom 4-Metric Stats Bar (White Card Container) */}
          <div className="bg-white rounded-2xl border border-[#F3DEC8] shadow-[0_6px_25px_rgba(234,88,12,0.04)] p-3 sm:p-3.5">
            <div className="grid grid-cols-4 divide-x divide-slate-100 text-center">
              
              {/* Metric 1 */}
              <div className="px-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-[#EA580C] mx-auto mb-0.5 stroke-[2.2]" />
                <span className="text-sm font-black text-[#1E122C] block leading-tight">
                  100%
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-black text-slate-400 tracking-wider uppercase block mt-0.5">
                  SECURE
                </span>
              </div>

              {/* Metric 2 */}
              <div className="px-1.5">
                <TrendingUp className="w-4.5 h-4.5 text-[#EA580C] mx-auto mb-0.5 stroke-[2.2]" />
                <span className="text-sm font-black text-[#1E122C] block leading-tight">
                  5,000+
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-black text-slate-400 tracking-wider uppercase block mt-0.5">
                  BUSINESSES GROW
                </span>
              </div>

              {/* Metric 3 */}
              <div className="px-1.5">
                <Star className="w-4.5 h-4.5 text-[#EA580C] mx-auto mb-0.5 stroke-[2.2]" />
                <span className="text-sm font-black text-[#1E122C] block leading-tight">
                  4.9/5
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-black text-slate-400 tracking-wider uppercase block mt-0.5">
                  CLIENT RATING
                </span>
              </div>

              {/* Metric 4 */}
              <div className="px-1.5">
                <Headphones className="w-4.5 h-4.5 text-[#EA580C] mx-auto mb-0.5 stroke-[2.2]" />
                <span className="text-sm font-black text-[#1E122C] block leading-tight">
                  24/7
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-black text-slate-400 tracking-wider uppercase block mt-0.5">
                  SUPPORT
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;
