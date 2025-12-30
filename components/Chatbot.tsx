
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { Send, Sparkles, User, Info } from 'lucide-react';

interface ChatbotProps {
  user: UserProfile;
}

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await getChatResponse(input, user, messages);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col animate-fadeIn">
      <header className="hud-card p-4 border-b border-sky-500/20 flex items-center justify-between rounded-t-3xl">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white pulse-glow" style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
          }}>
            <Sparkles size={20} className="icon-glow" />
          </div>
          <div>
            <h3 className="font-bold text-sky-100">VitalCoach AI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse icon-glow" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Available for {user.goal} coaching</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold hud-glass px-3 py-1.5 rounded-full relative z-10">
          <Info size={14} className="text-sky-400" />
          <span className="text-slate-400">Non-Medical Advice Only</span>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4">
            <div className="w-16 h-16 hud-card-elevated rounded-3xl flex items-center justify-center text-emerald-400 pulse-glow">
              <Sparkles size={32} className="icon-glow" />
            </div>
            <div>
              <h4 className="font-bold text-sky-100">Ready to chat?</h4>
              <p className="text-sm text-slate-400 mt-2">
                Ask me about meal planning, lifestyle tips for your region, or how to reach your {user.goal} targets.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Healthy regional meal ideas', 'Tips for better sleep', 'How to stay consistent?'].map(q => (
                <button 
                  key={q} 
                  onClick={() => setInput(q)}
                  className="text-xs font-medium hud-glass px-3 py-2 rounded-full hover:border-emerald-400/50 transition-colors"
                >
                  <span className="text-slate-300">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' 
                ? 'icon-glow' 
                : 'text-white pulse-glow'
              }`} style={msg.role === 'user' ? {
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8'
              } : {
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
              }}>
                {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed relative z-10 ${
                msg.role === 'user' 
                ? 'hud-card-elevated text-sky-100 rounded-tr-none' 
                : 'hud-glass text-slate-300 rounded-tl-none'
              }`} style={msg.role === 'user' ? {
                borderColor: 'rgba(56, 189, 248, 0.5)'
              } : {}}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center pulse-glow" style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
              }}>
                <Sparkles size={16} />
              </div>
              <div className="hud-glass p-4 rounded-2xl rounded-tl-none flex gap-1 items-center relative z-10">
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 hud-card border-t border-sky-500/20 rounded-b-3xl">
        <div className="relative">
          <input
            type="text"
            className="w-full px-5 py-4 rounded-2xl border border-sky-500/30 bg-slate-900/50 text-sky-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all pr-12 relative z-10"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ backdropFilter: 'blur(10px)' }}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 w-10 text-white rounded-xl flex items-center justify-center transition-colors z-20 icon-glow"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
            }}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-500 mt-3 font-medium uppercase tracking-widest relative z-10">
          The coach may make mistakes. Verify critical information.
        </p>
      </form>
    </div>
  );
};

export default Chatbot;
