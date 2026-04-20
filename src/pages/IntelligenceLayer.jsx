import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertOctagon, Zap, ArrowRight, BrainCircuit } from 'lucide-react';

export default function IntelligenceLayer() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-surface border border-primary/20 rounded-xl text-primary animate-pulse shadow-glow-lime">
          <BrainCircuit size={28} />
        </div>
        <h2 className="text-2xl font-bold text-soft-white tracking-tight underline decoration-primary/30 underline-offset-8 decoration-2 italic">INTELLIGENCE_LAYER</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        <div className="space-y-6">
          <h3 className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] font-bold">STRATEGIC_PRIORITIES</h3>
          {[
            { title: 'BEST ACTION TODAY', desc: 'Optimize content distribution shard C for 18% higher conversion.', icon: Target, color: 'text-primary' },
            { title: 'RESOURCE BOTTLENECK', desc: 'Memory leak detected in research agent. Restarting node 04.', icon: AlertOctagon, color: 'text-danger' },
            { title: 'GROWTH OPPORTUNITY', desc: 'New revenue stream identified in APAC region. Deploy lead scraper.', icon: TrendingUp, color: 'text-cyan' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl flex gap-6 group hover:translate-x-2 transition-transform cursor-pointer"
            >
               <div className={`p-4 rounded-xl bg-surface border border-glass-border ${item.color}`}>
                  <item.icon size={24} />
               </div>
               <div className="flex-1">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-soft-white mb-2">{item.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
               </div>
               <div className="flex items-center text-muted group-hover:text-primary transition-colors">
                  <ArrowRight size={20} />
               </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-2xl border-primary/10 relative overflow-hidden flex flex-col justify-center">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.05),transparent)] pointer-events-none" />
           <div className="relative text-center space-y-4">
              <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.5em] font-bold">RISK_FORECAST_ALPHA</h3>
              <div className="text-6xl font-bold text-soft-white tracking-tighter">0.082</div>
              <p className="text-xs text-muted max-w-xs mx-auto">System integrity is optimal. No significant capital risk detected in the current cycle.</p>
              <div className="flex justify-center gap-1 mt-6">
                 {[...Array(20)].map((_, i) => (
                   <div key={i} className={`w-1 h-8 rounded-full ${i < 16 ? 'bg-primary/50' : 'bg-surface/50'}`} />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
