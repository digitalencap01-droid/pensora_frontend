import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, HelpCircle } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { Button } from '../ui/Button';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { text: 'What should I do today?', label: '☀️ Today\'s Actions' },
    { text: 'Why did my traffic drop?', label: '📈 Traffic Analysis' },
    { text: 'How can I get more leads?', label: '🎯 More Leads' },
    { text: 'Create a social post', label: '✍️ Social Post' },
    { text: 'Find my biggest opportunity', label: '✨ Opportunities' }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAssistantOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || sending) return;
    setSending(true);
    setInputText('');
    await sendMessageToAssistant(textToSend);
    setSending(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 active:scale-95 text-white p-4 rounded-full shadow-2xl hover:shadow-plum-500/20 hover:scale-105 transition-all duration-200 flex items-center justify-center border border-[#6A2B82]/40 cursor-pointer"
        title="Open AI Marketing Assistant"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D94A2A] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D94A2A]"></span>
        </span>
      </button>

      {/* Backdrop close */}
      {isAssistantOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#1E122C]/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setAssistantOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div className={`
        fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-[#F3DEC8] shadow-2xl flex flex-col transition-transform duration-300 ease-out z-50
        ${isAssistantOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4.5 border-b border-[#F3DEC8] bg-[#FFF8F5]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-[#2B0847] to-[#801B48] text-[#FAF5F0] rounded-xl shadow-xs">
              <Sparkles className="w-5 h-5 text-[#FAF5F0]" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#1E122C]">Aura AI Manager</h4>
              <p className="text-[10px] text-[#D94A2A] font-extrabold tracking-wide">Online &bull; Active for {business?.name || 'My Shop'}</p>
            </div>
          </div>
          <button 
            onClick={() => setAssistantOpen(false)}
            className="p-1.5 rounded-xl text-[#6B5E77] hover:bg-[#FAF5F0] hover:text-[#1E122C] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4.5 overflow-y-auto space-y-4 bg-[#FAF5F0]">
          {chatMessages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div 
                key={msg.id} 
                className={`flex items-start gap-2.5 max-w-[85%] ${isAI ? '' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`
                  p-2 rounded-xl shrink-0 border
                  ${isAI ? 'bg-[#F5EEFB] border-[#E8D4F8] text-[#4B1D6B]' : 'bg-[#FFF1EB] border-[#FAD8C7] text-[#D94A2A]'}
                `}>
                  {isAI ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div className={`
                  p-3.5 rounded-2xl text-xs font-semibold leading-relaxed shadow-3xs
                  ${isAI ? 'bg-white text-[#1E122C] rounded-tl-xs border border-[#F3DEC8]' : 'bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] text-white rounded-tr-xs shadow-xs'}
                `}>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer presets & input */}
        <div className="p-4 border-t border-[#F3DEC8] bg-[#FFF8F5]">
          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2 mb-3.5">
            {presets.map((preset) => (
              <button
                key={preset.text}
                onClick={() => handleSend(preset.text)}
                disabled={sending}
                className="text-[10px] font-bold text-[#6B5E77] hover:text-[#D94A2A] bg-white hover:bg-[#FFF1EB] border border-[#F3DEC8] hover:border-[#FAD8C7] px-3 py-1.5 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-3xs"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Input fields */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about your marketing..."
              disabled={sending}
              className="flex-1 border border-[#F3DEC8] rounded-xl px-3.5 py-2 text-xs font-bold text-[#1E122C] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94A2A]/20 focus:border-[#D94A2A] transition-all disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="p-2.5 bg-gradient-to-r from-[#2B0847] via-[#48115B] to-[#801B48] hover:opacity-95 text-white rounded-xl disabled:opacity-40 transition-all shadow-xs cursor-pointer border-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AIAssistant;
