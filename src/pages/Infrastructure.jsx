import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database as DbIcon, Zap, Shield, Globe, Cpu, Network } from 'lucide-react';
import { CircleGraph } from '../components/HUDComponents';

const INFRA_NODES = [
  { id: 'CORE', name: 'PRIME_NODE', load: 84, x: 250, y: 150, icon: Cpu },
  { id: 'DB', name: 'VAULT_STORE', load: 42, x: 100, y: 80, icon: DbIcon },
  { id: 'CDN', name: 'CDN_EDGE', load: 15, x: 400, y: 80, icon: Globe },
  { id: 'API', name: 'API_QUANTUM', load: 68, x: 100, y: 220, icon: Network },
  { id: 'GPU', name: 'NEURAL_H100', load: 92, x: 400, y: 220, icon: Zap },
];

export default function Infrastructure() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-4xl font-black text-soft-white tracking-tighter">INFRA_TOPOLOGY</h2>
           <p className="hud-label mt-2 text-cyan">Status: Ultra_Operational</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-card px-10 py-5 flex items-center gap-6 border-cyan/10">
              <div>
                 <p className="hud-label text-slate-500">GRID_STABILITY</p>
                 <p className="text-xl font-black text-cyan">99.99%</p>
              </div>
              <div className="w-12 h-12 bg-cyan/10 rounded-2xl flex items-center justify-center text-cyan">
                 <Zap size={24} className="animate-pulse" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card p-12 h-[600px] relative group border-cyan/10 overflow-hidden bg-[rgba(0,210,255,0.02)]">
           {/* Sexy Grid Background */}
           <div className="absolute inset-0 bg-grid opacity-10" />
           
           <svg viewBox="0 0 500 300" className="w-full h-full relative z-10 drop-shadow-[0_0_30px_rgba(0,210,255,0.3)]">
              <defs>
                 <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(0,210,255,0)" />
                    <stop offset="50%" stopColor="rgba(0,210,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(0,210,255,0)" />
                 </linearGradient>
              </defs>

              {/* Sexy Network Links */}
              {INFRA_NODES.slice(1).map((node, i) => (
                <g key={i}>
                   <motion.path
                     d={`M 250,150 L ${node.x},${node.y}`}
                     stroke="url(#linkGrad)"
                     strokeWidth="2"
                     fill="none"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 2, delay: i * 0.2 }}
                   />
                   <motion.circle r="3" fill="#00d2ff" shadow="0 0 10px #00d2ff">
                      <animateMotion dur="4s" repeatCount="indefinite" path={`M 250,150 L ${node.x},${node.y}`} begin={`${i*0.5}s`} />
                   </motion.circle>
                </g>
              ))}

              {/* Node Modules */}
              {INFRA_NODES.map((node) => (
                <g key={node.id} className="cursor-pointer group">
                   <motion.rect
                     x={node.x - 30} y={node.y - 30} width="60" height="60" rx="15"
                     className="fill-background stroke-cyan/20 group-hover:stroke-cyan transition-all"
                     strokeWidth="2"
                   />
                   <rect
                     x={node.x - 35} y={node.y - 35} width="70" height="70" rx="20"
                     className="fill-none stroke-cyan/5" strokeWidth="1" strokeDasharray="4 4"
                   >
                      <animateTransform attributeName="transform" type="rotate" from={`0 ${node.x} ${node.y}`} to={`360 ${node.x} ${node.y}`} dur="20s" repeatCount="indefinite" />
                   </rect>
                   <node.icon x={node.x - 12} y={node.y - 12} size={24} className="text-cyan opacity-40 group-hover:opacity-100 transition-all" />
                   
                   <text x={node.x} y={node.y + 55} textAnchor="middle" className="fill-soft-white font-mono text-[9px] font-black uppercase tracking-[0.2em]">{node.name}</text>
                   <text x={node.x} y={node.y + 68} textAnchor="middle" className="fill-cyan/40 font-mono text-[7px] font-bold">{node.load}% LOAD</text>
                </g>
              ))}
           </svg>

           {/* Sexy Holographic Sweep */}
           <motion.div 
             animate={{ left: ['-10%', '110%'] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 bottom-0 w-[1px] bg-cyan/20 shadow-[0_0_20px_#00d2ff] z-20 pointer-events-none"
           />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="glass-card p-10 flex flex-col items-center justify-center flex-1 border-cyan/10">
              <CircleGraph size={220} percent={74} label="GLOBAL_YIELD" />
              <div className="mt-12 grid grid-cols-2 gap-10 w-full pt-10 border-t border-white/5">
                 <div className="text-center">
                    <p className="hud-label mb-2 text-slate-500">CORES</p>
                    <p className="text-2xl font-black text-cyan font-mono tracking-tighter">2,048</p>
                 </div>
                 <div className="text-center">
                    <p className="hud-label mb-2 text-slate-500">LATENCY</p>
                    <p className="text-2xl font-black text-cyan font-mono tracking-tighter">0.12ms</p>
                 </div>
              </div>
           </div>

           <button className="glass-card py-6 !bg-cyan/10 hover:!bg-cyan hover:text-background transition-all border-cyan/40 group flex items-center justify-center gap-6">
              <Zap size={20} className="group-hover:scale-125 transition-transform" />
              <span className="font-mono font-black text-sm tracking-[0.5em] uppercase">INIT_OVERCLOCK_x10</span>
           </button>
        </div>
      </div>
    </div>
  );
}
