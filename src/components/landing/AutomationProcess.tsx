import React from "react";
import {
  Search,
  Target,
  FileEdit,
  Send,
  TrendingUp,
} from "lucide-react";

interface StepItem {
  id: string;
  title: string;
  desc: string;
  badgeBg: string;
  color: string;
  Icon: React.ElementType;
}

const stepsData: StepItem[] = [
  {
    id: "01",
    title: "Discover",
    desc: "Audit site metrics and\ntag layouts.",
    badgeBg: "bg-[#EA580C]",
    color: "#EA580C",
    Icon: Search,
  },
  {
    id: "02",
    title: "Strategize",
    desc: "Set growth goals and\nchannels.",
    badgeBg: "bg-[#D94A2A]",
    color: "#D94A2A",
    Icon: Target,
  },
  {
    id: "03",
    title: "Create",
    desc: "Draft copies and dynamic\ntemplates.",
    badgeBg: "bg-[#BE185D]",
    color: "#BE185D",
    Icon: FileEdit,
  },
  {
    id: "04",
    title: "Launch",
    desc: "Deploy automated\ncampaigns.",
    badgeBg: "bg-[#4B1D6B]",
    color: "#4B1D6B",
    Icon: Send,
  },
  {
    id: "05",
    title: "Optimize",
    desc: "Shift budgets to protect\nROI.",
    badgeBg: "bg-[#EA580C]",
    color: "#EA580C",
    Icon: TrendingUp,
  },
];

export const AutomationProcess: React.FC = () => {
  return (
    <div className="w-full relative select-none -mt-3 sm:-mt-6">
      {/* ========================================================
          DESKTOP & TABLET: EXACT REFERENCE GRAPHIC + LABELS
          ======================================================== */}
      <div className="hidden md:block w-full max-w-[750px] mx-auto px-4">
        {/* Main Graphic Container */}
        <div className="relative w-full overflow-hidden flex justify-center items-center">
          <img
            src="/automation-nodes.png"
            alt="The Path to Automation Process Flow"
            className="w-full max-h-[180px] object-contain mx-auto block drop-shadow-xs"
          />
        </div>

        {/* Step Badges, Titles, and Descriptions aligned directly under the nodes */}
        <div className="grid grid-cols-5 gap-3 text-center mt-1 sm:mt-2 relative z-10">
          {stepsData.map((step) => {
            return (
              <div
                key={step.id}
                className="flex flex-col items-center"
              >
                {/* Circular Number Badge */}
                <div
                  className={`w-6 h-6 rounded-full ${step.badgeBg} text-white font-bold text-[11px] flex items-center justify-center shadow-xs mb-2`}
                >
                  {step.id}
                </div>

                {/* Step Title */}
                <h3 className="text-[15px] font-black text-[#1E122C] tracking-tight mb-1">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[12px] text-slate-500 font-medium leading-snug whitespace-pre-line max-w-[140px] mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MOBILE: ELEGANT RESPONSIVE CARDS
          ======================================================== */}
      <div className="md:hidden flex flex-col gap-4 px-4 max-w-sm mx-auto">
        {stepsData.map((step) => {
          const { Icon } = step;
          return (
            <div
              key={step.id}
              className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-[0_8px_20px_rgba(75,29,107,0.06)]"
            >
              <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-md border border-[#FFF0E6] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2]" style={{ color: step.color }} />
                </div>
                <span
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${step.badgeBg} text-white font-bold text-[10px] flex items-center justify-center shadow-xs`}
                >
                  {step.id}
                </span>
              </div>
              <div className="text-left">
                <h4 className="text-[15px] font-black text-[#1E122C]">{step.title}</h4>
                <p className="text-[12px] text-slate-500 font-medium leading-tight mt-0.5 whitespace-pre-line">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutomationProcess;
