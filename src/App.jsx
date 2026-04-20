import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Bot, 
  Terminal, 
  BarChart3, 
  ShieldAlert, 
  Server, 
  Cpu, 
  Search, 
  User,
  Clock,
  Settings,
  Bell,
  ChevronRight,
  TrendingUp,
  Activity,
  Zap,
  Lock,
  Database
} from 'lucide-react';
import Overview from './pages/Overview';
import AgentsControl from './pages/AgentsControl';
import CommandCenter from './pages/CommandCenter';
import RevenueOps from './pages/RevenueOps';
import SecurityWarRoom from './pages/SecurityWarRoom';
import Infrastructure from './pages/Infrastructure';
import IntelligenceLayer from './pages/IntelligenceLayer';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative flex items-center justify-center w-20 h-20 transition-all duration-300 ${
      active ? 'text-primary' : 'text-muted hover:text-soft-white'
    }`}
  >
    <Icon size={24} strokeWidth={1.5} className={active ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]' : ''} />
    {active && (
      <motion.div
        layoutId="sidebar-active"
        className="absolute left-0 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_15px_rgba(204,255,0,0.8)]"
      />
    )}
    <div className="absolute left-full ml-4 px-3 py-2 bg-surface border border-glass-border rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
      {label}
    </div>
  </button>
);

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'command', label: 'Command', icon: Terminal },
    { id: 'revenue', label: 'Revenue', icon: BarChart3 },
    { id: 'security', label: 'Security', icon: ShieldAlert },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'intelligence', label: 'Intelligence', icon: Cpu },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'overview': return <Overview />;
      case 'agents': return <AgentsControl />;
      case 'command': return <CommandCenter />;
      case 'revenue': return <RevenueOps />;
      case 'security': return <SecurityWarRoom />;
      case 'infrastructure': return <Infrastructure />;
      case 'intelligence': return <IntelligenceLayer />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative font-sans crt-flicker">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="radar-line" />
      <div className="scanlines" />
      <div className="ambient-light" />
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

      {/* Sidebar Rail */}
      <aside className="w-20 glass-panel border-r border-glass-border flex flex-col items-center py-8 z-30">
        <div className="w-10 h-10 bg-surface border border-glass-border rounded-xl flex items-center justify-center mb-12 text-primary font-bold text-xl shadow-glow-lime">
          H
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
              {...item}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <button className="text-muted hover:text-soft-white transition-colors p-3">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-surface border border-glass-border p-0.5">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Operator" 
              className="w-full h-full rounded-full grayscale opacity-80"
            />
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative z-20">
        {/* Top Bar */}
        <header className="h-20 glass-panel border-b border-glass-border px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter text-soft-white flex items-center gap-3">
              HEXAVAULT <span className="text-primary text-[10px] tracking-widest px-2 py-0.5 border border-primary/30 rounded uppercase font-mono">OS V2.0</span>
            </h1>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="EXECUTE COMMAND..." 
                className="bg-surface/50 border border-glass-border rounded-full pl-10 pr-4 py-2 text-xs font-mono text-soft-white focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-glow-lime"></span>
              <span className="text-soft-white uppercase">Sovereign_Node_Online</span>
            </div>
            <div className="h-4 w-px bg-glass-border" />
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary" />
              <span className="text-soft-white">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
            <div className="h-4 w-px bg-glass-border" />
            <button className="relative hover:text-soft-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
