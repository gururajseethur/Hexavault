import React from 'react';
import { ShieldAlert, Lock, Zap, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityWarRoom() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-4 bg-cyan rounded-full shadow-glow-blue" 
          />
          <div>
            <h2 className="text-4xl font-black text-soft-white tracking-tighter">SHIELD_FORCE_CORE</h2>
            <p className="hud-label mt-1 tracking-[0.5em] text-cyan">Protocol: Monochromatic_Azure_v8</p>
          </div>
        </div>
        <div className="px-8 py-4 glass-card border-cyan/20 bg-cyan/5 text-cyan text-[10px] font-mono font-black rounded-2xl uppercase tracking-[0.4em] flex items-center gap-3">
          <ShieldCheck size={16} />
          THREAT_LEVEL: ALPHA_MINIMAL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 glass-card p-12 flex flex-col gap-10 border-cyan/10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="p-4 bg-cyan/5 rounded-[2rem] border border-cyan/20 text-cyan shadow-glow-blue">
                    <AlertTriangle size={28} />
                 </div>
                 <div>
                    <h3 className="hud-label font-black text-soft-white tracking-[0.4em]">NEURAL_THREAT_MATRIX</h3>
                    <p className="text-[10px] font-mono text-cyan/40 mt-1 uppercase tracking-widest">Global_Radius_Scan_Active</p>
                 </div>
              </div>
              <div className="flex gap-3">
                 {[...Array(8)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     animate={{ height: [10, 30, 10] }}
                     transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1.5 h-6 bg-cyan/20 rounded-full" 
                   />
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { time: '22:18:04', event: 'RECURSION_BLOCK_X', source: 'L5_VAULT_A', severity: 'Neutral' },
                { time: '22:15:44', event: 'ENCRYPTION_STABLE', source: 'AUTH_PRIME', severity: 'Info' },
                { time: '22:12:01', event: 'GRID_SYNC_REBOOT', source: 'NEURAL_NODE', severity: 'Optimal' },
              ].map((log, i) => (
                <div key={i} className="p-8 bg-cyan/[0.03] border border-cyan/5 rounded-[2.5rem] group hover:border-cyan/30 transition-all cursor-pointer relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan/10 group-hover:bg-cyan transition-colors" />
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono text-cyan/40">{log.time}</span>
                      <span className="text-[9px] font-black text-cyan uppercase tracking-[0.2em]">{log.severity}</span>
                   </div>
                   <h4 className="text-sm font-black text-soft-white mb-3 tracking-wide font-mono uppercase">{log.event}</h4>
                   <p className="text-[9px] text-cyan/60 font-mono uppercase tracking-widest">{log.source}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { label: 'OPEN_CHANNELS', value: '47', icon: Lock },
             { label: 'VAULT_HEALTH', value: '100%', icon: ShieldCheck },
             { label: 'DATA_VELOCITY', value: '2.4 TB/s', icon: Zap },
             { label: 'OBSERVERS', value: '00', icon: Eye },
           ].map((s) => (
             <div key={s.label} className="glass-card p-10 flex flex-col items-center justify-center text-center group hover:bg-cyan/5 border-cyan/10 transition-all">
                <div className="p-5 rounded-[2rem] bg-cyan/5 border border-cyan/10 text-cyan mb-6 group-hover:scale-110 shadow-glow-blue transition-all">
                   <s.icon size={32} />
                </div>
                <p className="hud-label mb-3 opacity-60">{s.label}</p>
                <h4 className="text-3xl font-black text-soft-white tracking-tighter group-hover:text-cyan transition-colors">{s.value}</h4>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
