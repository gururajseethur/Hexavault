import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Shield, Cpu, Activity, Share2, Globe, TrendingUp } from 'lucide-react';
import { CircleGraph, ArchDiagram, AutomationPulse } from '../components/HUDComponents';

const SlimCard = ({ icon: Icon, label, value, trend, color = "cyan" }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="glass-card p-5 group relative flex flex-col justify-between h-40"
  >
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-2.5 rounded-xl bg-${color}/5 border border-${color}/10 text-${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex items-center gap-1 font-mono text-[8px] text-cyan font-bold tracking-tighter bg-cyan/10 px-1.5 py-0.5 rounded">
         <TrendingUp size={10} />
         {trend}%
      </div>
    </div>
    
    <div className="relative z-10 mt-4">
      <p className="hud-label text-[8px] mb-1 opacity-40">{label}</p>
      <h3 className="text-2xl font-black text-soft-white tracking-tighter group-hover:text-cyan transition-colors">{value}</h3>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
       <motion.div 
         initial={{ width: 0 }} animate={{ width: '100%' }}
         className="h-full bg-cyan/20"
       />
    </div>
  </motion.div>
);

export default function Overview() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* High Density Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SlimCard icon={DollarSign} label="GROSS_CAPITAL" value="$12.8M" trend="14.2" />
        <SlimCard icon={Zap} label="UPLINK_RATE" value="2.4gbps" trend="3.2" />
        <SlimCard icon={Shield} label="SHIELD_OPS" value="SECURE" trend="0.1" />
        <SlimCard icon={Cpu} label="GRID_COMPUTE" value="18.2%" trend="4.8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
           <ArchDiagram />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[280px]">
             <CircleGraph percent={88} label="INTEGRITY" size={160} />
             
             <div className="mt-8 flex gap-8 border-t border-white/5 pt-6 w-full justify-center">
                <div className="text-center">
                   <p className="hud-label text-slate-500 mb-1">LATENCY</p>
                   <p className="text-sm font-black text-cyan font-mono">0.4ms</p>
                </div>
                <div className="text-center">
                   <p className="hud-label text-slate-500 mb-1">JITTER</p>
                   <p className="text-sm font-black text-cyan font-mono">NOMINAL</p>
                </div>
             </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <Activity size={16} className="text-cyan animate-pulse" />
                   <h4 className="hud-label font-black text-soft-white">DATA_STREAM</h4>
                </div>
                <AutomationPulse />
             </div>
             
             <div className="space-y-2">
                {[
                  { name: 'SEC_CORE_v8', load: '12%' },
                  { name: 'AI_AGENT_PROX', load: '64%' },
                  { name: 'VAULT_SYNC', load: 'OK' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-cyan/5 transition-all text-[10px] font-mono">
                    <span className="text-slate-400 font-bold">{item.name}</span>
                    <span className="text-cyan">{item.load}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-card p-6 flex items-center gap-6">
            <CircleGraph size={60} percent={72} label="" />
            <div>
               <h4 className="hud-label mb-1 text-slate-500">STORE_ARRAY</h4>
               <p className="text-lg font-black text-soft-white font-mono">3.2 / 10PB</p>
            </div>
         </div>

         <div className="glass-card p-6 flex flex-col justify-center gap-4">
            <h4 className="hud-label text-slate-500 tracking-[0.4em]">SOVEREIGNTY_INDEX</h4>
            <div className="flex gap-1 w-full">
               {[...Array(15)].map((_, i) => (
                 <motion.div 
                   key={i} 
                   className={`flex-1 h-2 rounded-sm ${i < 12 ? 'bg-cyan' : 'bg-white/5'}`} 
                   animate={{ opacity: [0.3, 1, 0.3] }} 
                   transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                 />
               ))}
            </div>
         </div>

         <div className="glass-card p-6 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan/10 border border-cyan/20 text-cyan">
                 <Shield size={20} />
              </div>
              <div>
                 <h4 className="hud-label text-slate-500 mb-0.5">SHIELD_STATUS</h4>
                 <p className="text-sm font-bold font-mono text-soft-white">MAX_GUARD_v8</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
