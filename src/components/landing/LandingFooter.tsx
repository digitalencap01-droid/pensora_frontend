import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Sparkles,
  Linkedin,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#FEF9F5] pt-14 sm:pt-20 md:pt-24 pb-0 relative overflow-hidden select-none">
      
      {/* ========================================================
          MAIN WHITE FOOTER CARD (ONE UNIFIED SLEEK CONTAINER)
          ======================================================== */}
      <div className="w-full bg-white rounded-t-[36px] sm:rounded-t-[48px] border-t border-x border-[#F3DEC8] shadow-[0_-10px_35px_rgba(75,29,107,0.03)] pt-12 sm:pt-14 pb-8 sm:pb-10 relative overflow-hidden text-left z-10">
        
        {/* Foreground Content (Z-Index 10) */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Main 6-Column Navigation Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 pb-10 sm:pb-12">
            
            {/* Col 1: Brand & Socials */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-3.5 pr-0 lg:pr-6">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D94A2A] to-[#F2A65A] flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <span className="text-xl font-black tracking-tight text-[#1E122C]">
                  webo<span className="text-[#8C1F3D]">buzz</span>
                </span>
              </a>

              <p className="text-xs sm:text-[13px] text-[#6B5E77] font-medium leading-relaxed max-w-sm">
                AI-powered digital marketing solutions that help brands grow, engage, and achieve measurable success.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full border border-[#F3DEC8] bg-white text-[#554E60] flex items-center justify-center hover:bg-[#D94A2A] hover:text-white hover:border-[#D94A2A] transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-[#F3DEC8] bg-white text-[#554E60] flex items-center justify-center hover:bg-[#D94A2A] hover:text-white hover:border-[#D94A2A] transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter / X"
                  className="w-8 h-8 rounded-full border border-[#F3DEC8] bg-white text-[#554E60] flex items-center justify-center hover:bg-[#D94A2A] hover:text-white hover:border-[#D94A2A] transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full border border-[#F3DEC8] bg-white text-[#554E60] flex items-center justify-center hover:bg-[#D94A2A] hover:text-white hover:border-[#D94A2A] transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Col 2: Solutions */}
            <div className="col-span-1 lg:col-span-2 space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1E122C] border-b-2 border-[#D94A2A] pb-1 inline-block">
                SOLUTIONS
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-semibold text-[#6B5E77]">
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">Digital Marketing</a></li>
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">SEO Optimization</a></li>
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">Social Media Marketing</a></li>
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">Content Marketing</a></li>
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">PPC Advertising</a></li>
                <li><a href="#services" className="hover:text-[#D94A2A] transition-colors">Analytics & Reporting</a></li>
              </ul>
            </div>

            {/* Col 3: Services */}
            <div className="col-span-1 lg:col-span-2 space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8C1F3D] border-b-2 border-[#8C1F3D] pb-1 inline-block">
                SERVICES
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-semibold text-[#6B5E77]">
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">AI-Powered Campaigns</a></li>
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">Brand Strategy</a></li>
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">Audience Targeting</a></li>
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">Marketing Automation</a></li>
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">Performance Marketing</a></li>
                <li><a href="#features" className="hover:text-[#8C1F3D] transition-colors">Conversion Optimization</a></li>
              </ul>
            </div>

            {/* Col 4: Company */}
            <div className="col-span-1 lg:col-span-1.5 space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#D94A2A] border-b-2 border-[#D94A2A] pb-1 inline-block">
                COMPANY
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-semibold text-[#6B5E77]">
                <li><a href="/onboarding" className="hover:text-[#D94A2A] transition-colors">About Us</a></li>
                <li><a href="#strategy" className="hover:text-[#D94A2A] transition-colors">Our Approach</a></li>
                <li><a href="#testimonials" className="hover:text-[#D94A2A] transition-colors">Case Studies</a></li>
                <li><a href="#insights" className="hover:text-[#D94A2A] transition-colors">Blog & Insights</a></li>
                <li><a href="/signup" className="hover:text-[#D94A2A] transition-colors">Careers</a></li>
                <li><a href="/signup" className="hover:text-[#D94A2A] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 5: Resources */}
            <div className="col-span-1 lg:col-span-1.5 space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8C1F3D] border-b-2 border-[#8C1F3D] pb-1 inline-block">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] font-semibold text-[#6B5E77]">
                <li><a href="#insights" className="hover:text-[#8C1F3D] transition-colors">Guides & Ebooks</a></li>
                <li><a href="#insights" className="hover:text-[#8C1F3D] transition-colors">Industry Insights</a></li>
                <li><a href="#insights" className="hover:text-[#8C1F3D] transition-colors">Webinars</a></li>
                <li><a href="/signup" className="hover:text-[#8C1F3D] transition-colors">Help Center</a></li>
                <li><a href="/signup" className="hover:text-[#8C1F3D] transition-colors">FAQs</a></li>
                <li><a href="/signup" className="hover:text-[#8C1F3D] transition-colors">Support</a></li>
              </ul>
            </div>

            {/* Col 6: Contact Us */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-1 space-y-3 min-w-[170px]">
              <h4 className="text-[11px] font-black uppercase tracking-[0.14em] text-[#4B1D6B] border-b-2 border-[#4B1D6B] pb-1 inline-block">
                CONTACT US
              </h4>
              <div className="space-y-2 text-xs sm:text-[13px] font-semibold text-[#6B5E77]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D94A2A] shrink-0" />
                  <span className="whitespace-nowrap">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8C1F3D] shrink-0" />
                  <a href="mailto:hello@webobuzz.com" className="hover:text-[#8C1F3D] transition-colors whitespace-nowrap">
                    hello@webobuzz.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#4B1D6B] shrink-0" />
                  <span className="whitespace-nowrap">+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#D94A2A] shrink-0" />
                  <span className="whitespace-nowrap">Mon - Fri: 9am - 6pm</span>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================
              3. COPYRIGHT & LEGAL ROW (HIGH CONTRAST & FROSTED CAPSULES)
              ======================================================== */}
          <div className="border-t border-[#F3DEC8] pt-6 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs relative z-30">
            {/* Left Copyright Badge */}
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#F3DEC8] shadow-2xs text-[#1E122C] font-bold">
              &copy; {new Date().getFullYear()} Webobuzz. All rights reserved.
            </div>

            {/* Right Legal Policy Links Pill */}
            <div className="flex items-center gap-3 sm:gap-5 text-xs font-bold text-[#1E122C] bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#F3DEC8] shadow-[0_4px_12px_rgba(75,29,107,0.06)]">
              <a href="/signup" className="hover:text-[#D94A2A] transition-colors">Privacy Policy</a>
              <span className="text-[#D94A2A]/40">•</span>
              <a href="/signup" className="hover:text-[#D94A2A] transition-colors">Terms of Service</a>
              <span className="text-[#D94A2A]/40">•</span>
              <a href="/signup" className="hover:text-[#D94A2A] transition-colors">Cookie Policy</a>
            </div>
          </div>

        </div>

        {/* ========================================================
            4. BACKGROUND DECORATIVE WAVE ARTWORK (ANCHORED TO BOTTOM RIGHT)
            ======================================================== */}
        <div className="absolute bottom-0 right-0 w-full pointer-events-none select-none z-0 overflow-hidden leading-none flex justify-end">
          <img
            src="/footer-land.png"
            alt="Decorative Wave Base"
            className="w-full sm:w-auto h-auto max-h-[220px] sm:max-h-[300px] md:max-h-[396px] object-contain object-right-bottom block opacity-95 pointer-events-none"
          />
        </div>

      </div>

    </footer>
  );
};

export default LandingFooter;
