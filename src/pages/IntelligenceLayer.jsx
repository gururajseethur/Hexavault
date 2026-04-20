import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertOctagon, Zap, ArrowRight, BrainCircuit } from 'lucide-react';

export default function IntelligenceLayer() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-6">
        <div className="p-4 bg-cyan/5 border border-cyan/20 rounded-[2rem] text-cyan animate-pulse shadow-glow-blue">
          <BrainCircuit size={32} />
        </div>
        <div>
           <h2 className="text-4xl font-black text-soft-white tracking-tighter">INTELL_CORE_ALPHA</h2>
           <p className="hud-label mt-1 text-cyan tracking-[0.5em]">Mode: Strategic_Synthesis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        <div className="space-y-6">
          <h3 className="hud-label opacity-60">STRATEGIC_PRIORITIES</h3>
          {[
            { title: 'BEST ACTION TODAY', desc: 'Optimize content distribution shard C for 18% higher conversion.', icon: Target, color: 'text-cyan' },
            { title: 'RESOURCE BOTTLENECK', desc: 'Memory leak detected in research agent. Restarting node 04.', icon: AlertOctagon, color: 'text-blue-500' },
            { title: 'GROWTH OPPORTUNITY', desc: 'New revenue stream identified in APAC region. Deploy lead scraper.', icon: TrendingUp, color: 'text-cyan' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex gap-8 group hover:translate-x-3 border-cyan/5 transition-all cursor-pointer"
            >
               <div className={`p-5 rounded-3xl bg-cyan/5 border border-cyan/10 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
               </div>
               <div className="flex-1">
                  <h4 className="text-sm font-mono font-black uppercase tracking-widest text-soft-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono uppercase">{item.desc}</p>
               </div>
               <div className="flex items-center text-slate-600 group-hover:text-cyan transition-colors">
                  <ArrowRight size={20} />
               </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-12 flex flex-col justify-center border-cyan/10 relative overflow-hidden text-center group">
           {/* Sexy Radial Background */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,210,255,0.05),transparent)] group-hover:bg-[radial-gradient(circle_at_50%_50%,rgba(0,210,255,0.1),transparent)] transition-all duration-700" />
           
           <div className="relative space-y-6">
              <h3 className="hud-label text-cyan opacity-80">RISK_FORECAST_ALPHA</h3>
              <div className="text-7xl font-black text-soft-white tracking-tighter blue-glow-text group-hover:scale-110 transition-transform">0.082</div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto font-mono uppercase leading-loose">System integrity is optimal. No significant capital risk detected in the current cycle.</p>
              
              <div className="flex justify-center gap-1.5 mt-10">
                 {[...Array(24)].map((_, i) => (
                   <motion.div 
                     key={i} 
                     animate={{ opacity: [0.2, 1, 0.2] }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                     className={`w-1.5 h-10 rounded-full ${i < 18 ? 'bg-cyan' : 'bg-white/5'}`} 
                   />
                 ))}
              </div>
           </div>

           {/* Sexy Holographic Ring */}
           <div className="absolute inset-0 border-[10px] border-cyan/[0.02] rounded-full scale-150 animate-pulse pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
