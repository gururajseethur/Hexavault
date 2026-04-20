import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Thermometer, Wifi, Disc } from 'lucide-react';

export default function SystemOverlay() {
  const [load, setLoad] = useState(18.0);
  const [temp, setTemp] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        const val = typeof prev === 'string' ? parseFloat(prev) : prev;
        const next = val + (Math.random() - 0.5) * 2;
        return parseFloat(Math.max(15, Math.min(25, next)).toFixed(1));
      });
      setTemp(prev => {
        const val = typeof prev === 'string' ? parseInt(prev) : prev;
        const next = val + (Math.random() - 0.5);
        return Math.max(40, Math.min(45, Math.round(next)));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-12 right-12 z-[100] pointer-events-none flex flex-col gap-6 items-end font-mono">
      {/* Visual HUD Corner Piece */}
      <div className="fixed bottom-0 right-0 w-48 h-48 border-r-2 border-b-2 border-cyan/5 pointer-events-none" />
      
      {/* System Telemetry HUD: "Sexy Blue" */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card !rounded-3xl p-8 space-y-6 border-cyan/20 shadow-glow-blue flex flex-col min-w-[240px]"
      >
        <div className="flex items-center gap-4 justify-between">
           <div className="flex items-center gap-3">
              <Cpu size={14} className="text-cyan" />
              <span className="hud-label text-cyan/40">PWR_UTIL</span>
           </div>
           <span className="text-sm font-black text-soft-white">{load}%</span>
        </div>
        
        <div className="flex items-center gap-4 justify-between">
           <div className="flex items-center gap-3">
              <Thermometer size={14} className="text-cyan/60" />
              <span className="hud-label text-cyan/40">CORE_THERM</span>
           </div>
           <span className="text-sm font-black text-soft-white">{temp}°C</span>
        </div>

        <div className="relative h-1.5 w-full bg-cyan/5 rounded-full overflow-hidden border border-cyan/10">
           <motion.div 
             className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_15px_rgba(0,210,255,1)]"
             initial={{ width: '0%' }}
             animate={{ width: `${(load/30)*100}%` }}
           />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-6">
           <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/20" />
           </div>
           <div className="flex items-center gap-2 text-[9px] text-cyan font-black tracking-[0.3em] uppercase">
              <Wifi size={12} />
              LINK_OPTIMAL
           </div>
        </div>
      </motion.div>

      {/* Orbiting Ring Indicator */}
      <div className="relative w-16 h-16 mr-4 opacity-40">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
           className="w-full h-full border border-dashed border-cyan/40 rounded-full"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <Disc size={20} className="text-cyan animate-pulse" />
         </div>
      </div>
    </div>
  );
}
