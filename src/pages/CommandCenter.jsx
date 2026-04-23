import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Send, Cpu, Zap, Shield, HelpCircle } from 'lucide-react';

const LOG_ENTRIES = [
  { id: 1, type: 'system', text: 'NEURAL_LINK_ESTABLISHED' },
  { id: 2, type: 'auth', text: 'SOVEREIGN_PASSPORT_VERIFIED' },
  { id: 3, type: 'network', text: 'UPLINK_STABLE_4.2GBPS' },
];

export default function CommandCenter() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState(LOG_ENTRIES);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input.toUpperCase().trim();

    if (cmd === 'CLEAR') {
      setLogs([]);
      setInput('');
      return;
    }

    const newLog = { 
      id: Date.now(), 
      type: 'user', 
      text: `EXECUTE: ${cmd}`
    };
    setLogs([...logs, newLog]);
    setInput('');

    // Simulate system response
    setTimeout(() => {
      let responseText = `PROTOCOL_${cmd}_INITIALIZED... OK`;

      if (cmd === 'STATUS') {
        responseText = 'SYSTEM_STATUS: ALL_CORES_NOMINAL | SHIELD: 100% | UPLINK: STABLE';
      } else if (cmd === 'HELP') {
        responseText = 'AVAILABLE_COMMANDS: STATUS, CLEAR, OVERRIDE, INIT_PROTOCOL';
      } else if (cmd === 'OVERRIDE') {
        responseText = 'WARNING: MANUAL_OVERRIDE_ENGAGED. SAFETY_PROTOCOLS_DISABLED.';
      }

      setLogs(prev => [...prev, {
        id: Date.now() + 1,
        type: 'response',
        text: responseText
      }]);
    }, 600);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Sexy Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'CORES_ACTIVE', val: '128 Units', icon: Cpu },
          { label: 'THROUGHPUT', val: '84%', icon: Zap },
          { label: 'SHIELD_LEVEL', val: '100', icon: Shield },
        ].map((s) => (
          <div key={s.label} className="glass-card p-6 flex items-center justify-between border-cyan/10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan/5 rounded-2xl border border-cyan/20 text-cyan shadow-glow-blue">
                <s.icon size={20} />
              </div>
              <span className="hud-label">{s.label}</span>
            </div>
            <span className="text-xl font-black text-soft-white tracking-tighter">{s.val}</span>
          </div>
        ))}
      </div>

      {/* Sexy Command Interface */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden border-cyan/20">
        <div className="p-8 border-b border-white/5 bg-cyan/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <TerminalIcon size={20} className="text-cyan animate-pulse" />
             <h3 className="hud-label font-black text-soft-white tracking-[0.8em]">ROOT@HEXAVAULT_OS:/_</h3>
           </div>
           <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-cyan/40" />
             <div className="w-2 h-2 rounded-full bg-cyan" />
           </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 font-mono text-xs space-y-4 custom-scrollbar bg-[rgba(0,0,0,0.2)]"
        >
          {logs.map((log) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              key={log.id} 
              className="flex gap-4 group"
            >
              <span className={`w-20 flex-shrink-0 font-black opacity-40 uppercase tracking-widest text-[9px] pt-1 ${
                log.type === 'user' ? 'text-cyan' : 'text-blue-500'
              }`}>
                [{log.type}]
              </span>
              <span className={`${
                log.type === 'user' ? 'text-soft-white font-bold' : 
                log.type === 'response' ? 'text-cyan' : 'text-slate-400'
              }`}>
                {log.text}
              </span>
            </motion.div>
          ))}
          <div className="pt-4 flex items-center gap-4">
             <span className="text-cyan animate-pulse font-black">❯</span>
             <motion.div 
               animate={{ opacity: [0, 1, 0] }} 
               transition={{ duration: 1, repeat: Infinity }}
               className="w-2 h-4 bg-cyan/60"
             />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 bg-cyan/5 border-t border-white/5 flex gap-6">
           <div className="flex-1 relative">
             <input
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="COMMAND_INPUT_REQUIRED..."
               className="sexy-input w-full"
             />
             <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 text-cyan/30">
               <HelpCircle size={16} className="cursor-pointer hover:text-cyan transition-colors" />
             </div>
           </div>
           <button 
             type="submit"
             className="glass-card !bg-cyan p-5 text-background hover:shadow-glow-blue transition-all group border-none !rounded-3xl"
           >
             <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </form>
      </div>
    </div>
  );
}
