import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Settings2, 
  Trash2, 
  Activity,
  Zap,
  TrendingUp,
  ExternalLink,
  Plus
} from 'lucide-react';

const AGENTS = [
  { id: 1, name: 'RESEARCH_X1', role: 'MARKET_INTELLIGENCE', status: 'active', earnings: '$4,203', load: '42%', lastTask: 'Analyzing crypto flows' },
  { id: 2, name: 'CONTENT_GEN_A', role: 'PIPELINE_PRODUCTION', status: 'active', earnings: '$1,850', load: '89%', lastTask: 'Drafting Q2 Strategy' },
  { id: 3, name: 'SECURITY_SENTINEL', role: 'THREAT_HUNTING', status: 'active', earnings: 'N/A', load: '12%', lastTask: 'Firewall Audit' },
  { id: 4, name: 'LEAD_SCRAPER_PRO', role: 'REVENUE_OPS', status: 'paused', earnings: '$12,400', load: '0%', lastTask: 'LinkedIn Export' },
  { id: 5, name: 'AUTO_OUTREACH', role: 'DISTRIBUTION', status: 'active', earnings: '$850', load: '24%', lastTask: 'Email Sequence 4' },
];

export default function AgentsControl() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-soft-white tracking-tight">AGENT_COORDINATION</h2>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">FLEET_STATUS: NOMINAL (24 ACTIVE_CORES)</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan text-background rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-glow-blue">
          <Plus size={16} />
          DEPLOY_NEW_AGENT
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-left font-mono">
          <thead className="bg-cyan/5 text-[10px] text-slate-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest">AGENT_IDENTIFIER</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest">SUB_SYSTEM</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest">STATUS</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest text-right">EARNINGS_GENERATED</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest text-right">CORE_LOAD</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-widest text-right">CONTROL_INTERFACE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {AGENTS.map((agent) => (
              <tr key={agent.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-soft-white group-hover:text-cyan transition-colors">{agent.name}</span>
                    <span className="text-[10px] text-slate-400">ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[10px] px-2 py-1 bg-cyan/10 border border-white/10 rounded uppercase">{agent.role}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-cyan animate-pulse' : 'bg-slate-500'}`} />
                    <span className={`text-[10px] uppercase font-bold ${agent.status === 'active' ? 'text-cyan' : 'text-slate-400'}`}>
                      {agent.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className="text-sm text-soft-white font-bold">{agent.earnings}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-slate-400">{agent.load}</span>
                    <div className="w-20 h-1 bg-cyan/10 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan" style={{ width: agent.load }} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-cyan/10 hover:bg-cyan hover:text-background rounded-lg border border-white/10 transition-all">
                        {agent.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button className="p-2 bg-cyan/10 hover:bg-white hover:text-background rounded-lg border border-white/10 transition-all">
                        <Settings2 size={14} />
                      </button>
                      <button className="p-2 bg-cyan/10 hover:bg-red-500 hover:text-white rounded-lg border border-white/10 transition-all">
                        <Trash2 size={14} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
