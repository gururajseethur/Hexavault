import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Zap, Shield, Search, TrendingUp, Cpu, Command } from 'lucide-react';

const SUGGESTIONS = [
  { label: 'Optimize my day', icon: Zap },
  { label: 'Audit security', icon: Shield },
  { label: 'Find revenue', icon: TrendingUp },
  { label: 'System status', icon: Cpu },
];

export default function CommandCenter() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'SYTEM_READY. OPERATOR IDENTIFIED. READY FOR COMMANDS.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `EXECUTING: ${userMsg.toUpperCase()}... DATA_FETCH_COMPLETE. RECOMMENDATION_LEVEL_01 GENERATED.` 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6 font-mono">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 glass-panel rounded-xl text-primary shadow-glow-lime">
          <Terminal size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-soft-white tracking-tight underline decoration-primary/30 underline-offset-8 decoration-2">STRATEGIC_TERMINAL</h2>
          <p className="text-[10px] text-muted mt-1 uppercase tracking-widest">L3_NEURAL_LINK: ACTIVE</p>
        </div>
      </div>

      {/* Main Terminal Area */}
      <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col overflow-hidden relative border-primary/10">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none opacity-50" />
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pb-12">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-4 text-[13px] leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-primary text-background font-bold' 
                : 'bg-surface/80 border border-glass-border text-soft-white font-medium'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-[10px] text-primary uppercase font-bold opacity-70">
                    <Command size={10} />
                    HEXA_BRAIN:
                  </div>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Interface */}
        <div className="mt-4 space-y-4 relative z-10">
          <div className="flex gap-2">
            {SUGGESTIONS.map((s) => (
              <button 
                key={s.label}
                onClick={() => setInput(s.label)}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface/50 border border-glass-border rounded-full text-[10px] text-muted hover:text-primary hover:border-primary/30 transition-all"
              >
                <s.icon size={12} />
                {s.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ENTER_STRATEGIC_PROMPT..."
              className="w-full bg-surface border border-glass-border rounded-xl px-6 py-4 text-sm text-soft-white focus:outline-none focus:border-primary/50 placeholder:text-muted transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-background rounded-lg hover:scale-105 transition-all">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
