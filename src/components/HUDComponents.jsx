import React from 'react';
import { motion } from 'framer-motion';

export const CircularHUD = ({ size = 200, color = "#CCFF00", label = "CORE_SYNC" }) => {
  return (
    <div className="relative flex items-center justify-center group" style={{ width: size, height: size }}>
      {/* Outer Rotating Ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="0.5" fill="none" strokeDasharray="10 5" />
      </motion.svg>

      {/* Middle Notched Ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="2" fill="none" strokeDasharray="1 4" />
      </motion.svg>

      {/* Pulsing Core */}
      <motion.div
        className="absolute w-1/2 h-1/2 rounded-full flex flex-col items-center justify-center bg-surface border border-primary/20 shadow-glow-lime backdrop-blur-md"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-mono text-primary font-bold">{label}</span>
        <span className="text-xl font-bold text-soft-white mt-1">98%</span>
      </motion.div>

      {/* Decorative Orbits */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          animate={{
            rotate: [angle, angle + 360],
          }}
          style={{ originX: "50%", originY: "50%", width: size * 0.9, height: size * 0.9, background: 'none' }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_#CCFF00]" />
        </motion.div>
      ))}
    </div>
  );
};

export const DataPipes = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
    <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    
    {/* Animated Data Lines */}
    <motion.path
      d="M 50 50 L 200 50 L 200 300"
      stroke="#CCFF00"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 0], pathOffset: [0, 0, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);
