import React from 'react';
import { motion } from 'framer-motion';

export const CircleGraph = ({ percent = 70, label = "CORE_LOAD", size = 180 }) => {
  const radius = size * 0.42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative group flex items-center justify-center font-mono" style={{ width: size, height: size }}>
      <div className="absolute inset-0 border border-cyan/5 rounded-full border-dashed animate-spin-slow" />
      
      <svg className="transform -rotate-90 relative z-10" width={size} height={size}>
        <circle
          cx={size/2} cy={size/2} r={radius}
          stroke="rgba(0, 210, 255, 0.03)" strokeWidth="6" fill="transparent"
        />
        <motion.circle
          cx={size/2} cy={size/2} r={radius}
          stroke="#00d2ff" strokeWidth="6" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "circOut" }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-2xl font-black text-soft-white tracking-tighter">
          {percent}<span className="text-xs text-cyan opacity-50">%</span>
        </span>
        {label && <span className="text-[7px] uppercase tracking-[0.4em] text-cyan/40 mt-1">{label}</span>}
      </div>
    </div>
  );
};

export const ArchDiagram = () => {
  const nodes = [
    { id: 1, x: 250, y: 150, type: 'core', label: 'PRIME' },
    { id: 2, x: 120, y: 80, type: 'sub', label: 'AUTH' },
    { id: 3, x: 380, y: 80, type: 'sub', label: 'DATA' },
    { id: 4, x: 120, y: 220, type: 'sub', label: 'SHIELD' },
    { id: 5, x: 380, y: 220, type: 'sub', label: 'LINK' },
  ];

  return (
    <div className="glass-card p-8 w-full h-[460px] relative group overflow-hidden border-white/5">
      <div className="absolute top-6 left-6 flex items-center gap-3">
         <div className="w-1 h-4 bg-cyan rounded-full" />
         <h4 className="hud-label tracking-[0.5em] text-[8px]">TOPOLOGY_X</h4>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 500 300" className="w-[85%] h-[85%] opacity-80">
          {nodes.slice(1).map((node) => (
            <motion.path
              key={node.id}
              d={`M 250 150 L ${node.x} ${node.y}`}
              stroke="rgba(0, 210, 255, 0.1)"
              strokeWidth="1" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            />
          ))}

          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r={node.type === 'core' ? 12 : 8} className="fill-background stroke-cyan/30" strokeWidth="1" />
              <text x={node.x} y={node.y + 25} textAnchor="middle" className="fill-cyan/30 font-mono text-[7px] uppercase tracking-widest">{node.label}</text>
            </g>
          ))}
        </svg>
      </div>

      <motion.div 
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-cyan/10 pointer-events-none"
      />
    </div>
  );
};

export const AutomationPulse = () => (
   <div className="flex items-end gap-0.5 h-6">
     {[...Array(10)].map((_, i) => (
       <motion.div
         key={i}
         className="w-1 bg-cyan/20 rounded-t"
         animate={{ height: ['20%', '100%', '30%'] }}
         transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
       />
     ))}
   </div>
);
