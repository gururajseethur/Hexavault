import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Terminal, ShieldAlert, Server, Cpu, Search, Settings, Bell, Clock, Layers, Users, TrendingUp
} from 'lucide-react';
import Overview from './pages/Overview';
import CommandCenter from './pages/CommandCenter';
import SecurityWarRoom from './pages/SecurityWarRoom';
import Infrastructure from './pages/Infrastructure';
import IntelligenceLayer from './pages/IntelligenceLayer';
import AgentsControl from './pages/AgentsControl';
import RevenueOps from './pages/RevenueOps';
import SystemOverlay from './components/SystemOverlay';
import Atmosphere from './components/Atmosphere';

const NavButton = ({ icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-center w-14 h-14 transition-all duration-500 ${
      active ? 'text-cyan' : 'text-slate-600 hover:text-cyan/60'
    }`}
  >
    <div className={`absolute inset-2 rounded-xl transition-all duration-500 border ${
      active ? 'bg-cyan/5 border-cyan/20 shadow-[0_0_15px_rgba(0,210,255,0.1)]' : 'bg-transparent border-transparent'
    }`} />
    <Icon size={18} strokeWidth={active ? 2 : 1.5} className="relative z-10" />
  </button>
);

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { id: 'overview', icon: LayoutDashboard },
    { id: 'command', icon: Terminal },
    { id: 'security', icon: ShieldAlert },
    { id: 'infrastructure', icon: Server },
    { id: 'intelligence', icon: Cpu },
    { id: 'agents', icon: Users },
    { id: 'revenue', icon: TrendingUp },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'overview': return <Overview />;
      case 'command': return <CommandCenter />;
      case 'security': return <SecurityWarRoom />;
      case 'infrastructure': return <Infrastructure />;
      case 'intelligence': return <IntelligenceLayer />;
      case 'agents': return <AgentsControl />;
      case 'revenue': return <RevenueOps />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative font-sans text-sm">
      <Atmosphere />
      
      {/* Main Content with Perspective */}
      <div 
        className="flex w-full h-full relative z-[60] transition-transform duration-300 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateY(${mousePos.x * 0.5}deg) rotateX(${mousePos.y * -0.5}deg)`,
        }}
      >
        {/* Environment Atmosphere Layers */}
        <div className="nebula-vortex" />
        <div className="grid-3d-floor" />

        {/* Sidebar Rail */}
        <aside className="w-16 bg-[rgba(2,4,10,0.6)] backdrop-blur-2xl border-r border-white/5 flex flex-col items-center py-8 z-[70]">
          <div className="w-10 h-10 border border-cyan/20 rounded-xl flex items-center justify-center mb-12 text-cyan">
            <Layers size={20} />
          </div>
          
          <div className="flex-1 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavButton
                key={item.id}
                active={activePage === item.id}
                onClick={() => setActivePage(item.id)}
                {...item}
              />
            ))}
          </div>

          <div className="flex flex-col gap-6 mb-2">
            <button className="text-slate-600 hover:text-cyan transition-all">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-lg border border-white/10 overflow-hidden grayscale opacity-50">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Operator" alt="U" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative">
          <header className="h-16 px-8 flex items-center justify-between border-b border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-8">
              <h1 className="text-lg font-black text-soft-white tracking-tighter flex items-center gap-3">
                HEXAVAULT <span className="text-[8px] bg-cyan/5 border border-cyan/20 px-2 py-0.5 rounded text-cyan font-bold tracking-[0.4em]">SVRGN_OS</span>
              </h1>
              
              <div className="flex items-center gap-4 font-mono text-[9px] text-slate-500">
                <div className="flex items-center gap-1.5 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_5px_#00d2ff]" />
                  LINK_OK
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-cyan/40" />
                  {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan/20" size={12} />
                <input 
                  type="text" 
                  placeholder="SEARCH_PROTOCOL..." 
                  className="bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-1.5 text-[10px] font-mono text-soft-white focus:outline-none focus:border-cyan/20 w-64 transition-all"
                />
              </div>
              <Bell size={16} className="text-slate-600 cursor-pointer hover:text-cyan" />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>

          <SystemOverlay />
        </main>
      </div>
    </div>
  );
}
