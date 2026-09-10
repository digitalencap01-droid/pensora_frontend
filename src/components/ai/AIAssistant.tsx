import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Zap, 
  TrendingUp, 
  Target, 
  PenTool, 
  RotateCcw,
  Copy,
  Check,
  ArrowRight,
  Compass,
  Search,
  Bot
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const AIAssistant: React.FC = () => {
  const { 
    chatMessages, 
    isAssistantOpen, 
    setAssistantOpen, 
    sendMessageToAssistant,
    business
  } = useMarketing();
  
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { 
      title: "Today's Priorities", 
      desc: "What is my highest ROI action right now?",
      prompt: "What should I do today to get more sales?",
      icon: Zap,
      accent: "#D94A2A",
      bg: "#FFF1EB"
    },
    { 
      title: "Traffic & SEO Audit", 
      desc: "Diagnose visitor drops and search ranking gaps",
      prompt: "Why did my traffic drop and what SEO fixes are needed?",
      icon: TrendingUp,
      accent: "#8C1F3D",
      bg: "#FDF0F3"
    },
    { 
      title: "Lead Generation", 
      desc: "Optimize conversion funnels & get customers",
      prompt: "How can I get more leads and increase conversion rate?",
      icon: Target,
      accent: "#4B1D6B",
      bg: "#F5EEFB"
    },
    { 
      title: "Create Content", 
      desc: "Draft high-converting blog & Instagram copies",
      prompt: "Create a social media post and blog outline for my brand",
      icon: PenTool,
      accent: "#D94A2A",
      bg: "#FFF1EB"
    }
  ];

  // Auto scroll to bottom smoothly
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen, sending]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || sending) return;
    setSending(true);
    setInputText('');
    await sendMessageToAssistant(textToSend);
    setSending(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to format bold markdown tags nicely
  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold text-[#1E122C] bg-[#FFEFEA] text-[#D94A2A] px-1.5 py-0.5 rounded-md text-[11.5px] border border-[#FAD8C7]/50 inline-block my-0.5">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Launcher Trigger Button (3D GrowWise Icon) */}
      <button
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white hover:bg-[#FFF8F5] active:scale-95 p-2 rounded-full shadow-[0_10px_35px_rgba(43,8,71,0.28)] hover:shadow-[0_14px_40px_rgba(217,74,42,0.32)] hover:scale-108 transition-all duration-300 flex items-center justify-center border-2 border-[#F3DEC8] cursor-pointer group"
        title="Open GrowWise AI Assistant"
      >
        <img 
          src="/growwise-icon.png" 
          alt="GrowWise AI Assistant" 
          className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110" 
        />
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94A2A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D94A2A]"></span>
        </span>
      </button>

      {/* Backdrop */}
      {isAssistantOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setAssistantOpen(false)}
        />
      )}

      {/* Slide-out Drawer Container */}
      <div className={`
        fixed right-0 top-0 bottom-0 w-full sm:w-[460px] md:w-[490px] bg-[#FAF5F0] border-l border-[#F3DEC8] shadow-[-16px_0_60px_rgba(43,8,71,0.2)] flex flex-col transition-transform duration-300 ease-out z-50 overflow-hidden
        ${isAssistantOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* ========================================================
            1. MODERN CLEAN HEADER
            ======================================================== */}
        <div className="h-20 px-6 border-b border-[#F3DEC8] bg-white flex items-center justify-between shrink-0 shadow-2xs">
          {/* Brand Identity */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF8F5] border border-[#F3DEC8] flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-0.5">
              <img 
                src="/growwise-icon.png" 
                alt="GrowWise AI" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-black text-[#1E122C] tracking-tight leading-none truncate">
                GrowWise <span className="text-[#D94A2A]">AI</span>
              </h3>
              <div className="flex items-center gap-1.5 pt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-[11px] text-[#6B5E77] font-bold truncate">
                  Active for <span className="text-[#1E122C] font-extrabold">{business?.name || 'Bloom Boutique'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0 pl-2">
            <button 
              onClick={() => setAssistantOpen(false)}
              className="w-9 h-9 rounded-xl bg-[#FAF5F0] hover:bg-[#FFEFEA] border border-[#F3DEC8] hover:border-[#FAD8C7] text-[#6B5E77] hover:text-[#D94A2A] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-3xs"
              title="Close Assistant"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            2. CONVERSATION CHAT STREAM
            ======================================================== */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF5F0]">
          
          {/* Messages Loop */}
          {chatMessages.map((msg, idx) => {
            const isAI = msg.sender === 'ai';
            const isInitialGreeting = idx === 0 && isAI;

            return (
              <div key={msg.id} className="space-y-3">
                
                {/* Message Bubble Container */}
                <div className={`flex items-start gap-3 w-full ${isAI ? 'justify-start' : 'justify-end'}`}>
                  
                  {/* AI Avatar */}
                  {isAI && (
                    <div className="w-8 h-8 rounded-xl bg-[#FFF8F5] border border-[#F3DEC8] flex items-center justify-center shadow-xs shrink-0 mt-0.5 overflow-hidden p-0.5">
                      <img 
                        src="/growwise-icon.png" 
                        alt="GrowWise AI" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  )}

                  {/* Bubble Content */}
                  <div className={`space-y-1.5 max-w-[85%] ${isAI ? 'text-left' : 'text-right'}`}>
                    
                    {/* Header Label */}
                    <div className={`text-[10px] font-black uppercase tracking-wider px-1 ${
                      isAI ? 'text-[#8C1F3D]' : 'text-[#6B5E77]'
                    }`}>
                      {isAI ? 'GrowWise AI Manager' : 'You'}
                    </div>

                    {/* Speech Bubble */}
                    <div className={`
                      p-4 rounded-2xl text-xs font-semibold leading-relaxed shadow-sm relative group
                      ${isAI 
                        ? 'bg-white text-[#1E122C] rounded-tl-xs border border-[#F3DEC8] shadow-[0_2px_16px_rgba(75,29,107,0.04)]' 
                        : 'bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white rounded-tr-xs'
                      }
                    `}>
                      <div className="space-y-1">
                        {formatMessageText(msg.text)}
                      </div>

                      {/* AI Bubble Action Bar (Copy Button) */}
                      {isAI && (
                        <div className="flex items-center justify-end gap-2 pt-2 mt-2 border-t border-[#F3DEC8]/50 text-[10px] text-[#6B5E77]">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="inline-flex items-center gap-1 hover:text-[#D94A2A] transition-colors cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {!isAI && (
                    <div className="w-8 h-8 rounded-xl bg-[#FFEFEA] border border-[#FAD8C7] flex items-center justify-center text-[#D94A2A] shadow-3xs shrink-0 mt-0.5">
                      <User className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  )}
                </div>

                {/* If Initial Greeting: Render Clean 2x2 Suggested Action Grid directly below it */}
                {isInitialGreeting && chatMessages.length === 1 && (
                  <div className="pl-11 pt-1 space-y-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6B5E77] block">
                      Quick Suggestions
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {quickPrompts.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.title}
                            onClick={() => handleSend(item.prompt)}
                            disabled={sending}
                            className="flex flex-col text-left p-3.5 rounded-2xl bg-white hover:bg-[#FFF8F5] border border-[#F3DEC8] hover:border-[#D94A2A]/40 shadow-xs hover:shadow-[0_4px_16px_rgba(217,74,42,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group disabled:opacity-50"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div 
                                className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                                style={{ backgroundColor: item.bg, color: item.accent }}
                              >
                                <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-[#6B5E77] group-hover:text-[#D94A2A] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <h5 className="text-[11.5px] font-black text-[#1E122C] group-hover:text-[#D94A2A] transition-colors leading-tight">
                              {item.title}
                            </h5>
                            <p className="text-[9.5px] text-[#6B5E77] font-medium leading-tight pt-0.5 line-clamp-2">
                              {item.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            );
          })}

          {/* Typing Indicator */}
          {sending && (
            <div className="flex items-start gap-3 justify-start pl-0.5">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8F5] border border-[#F3DEC8] flex items-center justify-center shadow-xs shrink-0 mt-0.5 overflow-hidden p-0.5">
                <img src="/growwise-icon.png" alt="GrowWise AI" className="w-full h-full object-contain animate-pulse" />
              </div>
              <div className="bg-white border border-[#F3DEC8] rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-2">
                <span className="text-xs font-bold text-[#6B5E77]">GrowWise AI is thinking</span>
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94A2A] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C1F3D] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4B1D6B] animate-bounce" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ========================================================
            3. MODERN FLOATING INPUT FORM
            ======================================================== */}
        <div className="p-4 border-t border-[#F3DEC8] bg-white/95 backdrop-blur-md shrink-0 space-y-2.5 shadow-[0_-6px_25px_rgba(75,29,107,0.03)]">
          
          {/* Interactive Chat Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
            className="relative flex items-center bg-[#FAF5F0] border border-[#F3DEC8] focus-within:border-[#D94A2A] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#D94A2A]/10 rounded-2xl p-1.5 transition-all shadow-2xs"
          >
            <div className="pl-2.5 text-[#8C1F3D] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask GrowWise AI anything about your marketing..."
              disabled={sending}
              className="w-full text-xs font-bold text-[#1E122C] placeholder-[#6B5E77]/60 bg-transparent px-2.5 py-1.5 focus:outline-none disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="w-9 h-9 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 active:scale-95 text-white rounded-xl disabled:opacity-35 transition-all shadow-xs flex items-center justify-center shrink-0 cursor-pointer border-0"
              title="Send message"
            >
              <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
            </button>
          </form>

          {/* Subtle micro footer disclaimer */}
          <div className="flex items-center justify-between text-[9px] text-[#6B5E77]/70 font-semibold px-1">
            <span>Powered by GrowWise Autonomous Agent</span>
            <span>Press Enter ↵ to send</span>
          </div>
        </div>

      </div>
    </>
  );
};

export default AIAssistant;
