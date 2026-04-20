import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, Zap, ShieldCheck, Cpu, ArrowUpRight, Activity, Globe, Lock
} from 'lucide-react';
import { CircularHUD } from '../components/HUDComponents';

const data = [
  { name: '00:00', value: 45 }, { name: '04:00', value: 52 }, { name: '08:00', value: 38 },
  { name: '12:00', value: 65 }, { name: '16:00', value: 48 }, { name: '20:00', value: 58 },
  { name: '23:59', value: 55 },
];

const StatCard = ({ icon: Icon, label, value, trend, colorClass }) => (
  <motion.div 
    whileHover={{ scale: 1.02, rotateY: 5, rotateX: -2 }}
    className="glass-card p-6 rounded-2xl relative overflow-hidden group border-primary/10"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity ${colorClass}`}>
       <Icon size={128} strokeWidth={1} />
    </div>
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-surface border border-glass-border ${colorClass} shadow-glow-lime/20`}>
        <Icon size={20} />
      </div>
      <div className="flex items-center gap-1 text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
        <ArrowUpRight size={10} />
        {trend}%
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-xs font-mono text-muted uppercase tracking-[0.2em]">{label}</p>
      <h3 className="text-2xl font-bold text-soft-white tracking-tighter">{value}</h3>
    </div>
  </motion.div>
);

export default function Overview() {
  return (
    <div className="space-y-10 pb-12">
      {/* HUD Header Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="REVENUE_CAPITAL" value="$12,492.00" trend="12.5" colorClass="text-primary" />
        <StatCard icon={Zap} label="AGENT_CORES" value="24" trend="8.2" colorClass="text-cyan" />
        <StatCard icon={ShieldCheck} label="SYSTEM_INTEGRITY" value="99.9%" trend="-45.1" colorClass="text-primary" />
        <StatCard icon={Cpu} label="NEURAL_LOAD" value="18.2%" trend="1.2" colorClass="text-primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left HUD Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.05),transparent)]" />
             <CircularHUD size={240} color="#CCFF00" label="CENTRAL_NODE" />
             <div className="mt-8 grid grid-cols-2 gap-8 w-full font-mono">
                <div className="text-center">
                   <p className="text-[10px] text-muted mb-1 uppercase tracking-widest">Latency</p>
                   <p className="text-lg font-bold text-primary">12ms</p>
                </div>
                <div className="text-center">
                   <p className="text-[10px] text-muted mb-1 uppercase tracking-widest">Uptime</p>
                   <p className="text-lg font-bold text-cyan">99.9h</p>
                </div>
             </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
             <h4 className="text-[10px] font-mono text-muted uppercase mb-4 tracking-[0.3em]">GEOSPATIAL_NODES</h4>
             <div className="space-y-4">
                {['LON_01', 'NYC_DATA', 'TOK_V2'].map(node => (
                   <div key={node} className="flex items-center justify-between p-3 bg-surface border border-glass-border rounded group cursor-pointer hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3">
                         <Globe size={14} className="text-primary opacity-50" />
                         <span className="text-[11px] font-mono text-soft-white">{node}</span>
                      </div>
                      <div className="flex gap-1">
                         {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-primary' : 'bg-muted'}`} />)}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Visuals */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card p-8 rounded-2xl relative">
             <div className="flex items-center justify-between mb-8">
               <div>
                 <h3 className="text-lg font-bold text-soft-white tracking-widest uppercase">Telemetry Stream</h3>
                 <p className="text-xs text-muted font-mono uppercase tracking-[0.4em]">Sub_System: Delta_01</p>
               </div>
               <div className="px-3 py-1 border border-primary/20 rounded flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-[10px] text-primary font-mono font-bold">LIVE_RECON</span>
               </div>
             </div>
             
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                   <defs>
                     <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#CCFF00" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                   <XAxis dataKey="name" hide />
                   <YAxis hide />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '12px', fontSize: '10px' }} 
                     cursor={{ stroke: '#CCFF00', strokeWidth: 0.5 }}
                   />
                   <Area type="step" dataKey="value" stroke="#CCFF00" strokeWidth={1} fillOpacity={1} fill="url(#colorValue)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-radar-sweep opacity-50" />
                <div className="flex items-center gap-4 mb-4">
                   <Lock size={18} className="text-cyan" />
                   <h4 className="text-[10px] font-mono text-muted uppercase tracking-widest">Vault_Security</h4>
                </div>
                <p className="text-2xl font-bold text-soft-white mb-2">0 SECRETS_EXPOSED</p>
                <div className="text-[10px] text-primary font-mono">STATUS: ENCRYPTED_L5</div>
             </div>
             <div className="glass-card p-6 rounded-2xl flex flex-col justify-center items-center">
                <Activity size={32} className="text-primary mb-4 animate-pulse opacity-50" />
                <h4 className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1">Signal_Strength</h4>
                <p className="text-xl font-bold text-soft-white">-42 dBm</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
