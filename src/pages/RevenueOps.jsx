import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, FileText, PieChart, ArrowUpRight } from 'lucide-react';

const data = [
  { month: 'JAN', mrr: 45000 }, { month: 'FEB', mrr: 52000 }, { month: 'MAR', mrr: 48000 },
  { month: 'APR', mrr: 61000 }, { month: 'MAY', mrr: 75000 }, { month: 'JUN', mrr: 89000 },
];

export default function RevenueOps() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-soft-white tracking-tight">REVENUE_OPERATIONS</h2>
          <p className="text-xs text-muted font-mono uppercase tracking-widest mt-1">TOTAL_VALUATION: $2.4M [PROJECTED]</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <p className="text-[10px] text-muted font-mono uppercase tracking-widest">MTD_GROWTH</p>
              <p className="text-lg font-bold text-primary">+24.5%</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent">
           <p className="text-[10px] text-muted font-mono uppercase mb-1">MRR</p>
           <h3 className="text-3xl font-bold text-soft-white tracking-tight">$89,402</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl">
           <p className="text-[10px] text-muted font-mono uppercase mb-1">CASH_ON_HAND</p>
           <h3 className="text-3xl font-bold text-soft-white tracking-tight">$412,050</h3>
        </div>
        <div className="glass-card p-6 rounded-2xl">
           <p className="text-[10px] text-muted font-mono uppercase mb-1">PENDING_INVOICES</p>
           <h3 className="text-3xl font-bold text-soft-white tracking-tight text-amber">$12,400</h3>
        </div>
      </div>

      <div className="glass-card p-8 rounded-2xl">
         <h3 className="text-xs font-mono text-muted uppercase mb-6 tracking-widest">GROWTH_TRAJECTORY</h3>
         <div className="h-80 w-full font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#444'}} />
                <Tooltip contentStyle={{backgroundColor: '#121212', border: '1px solid #333'}} />
                <Area type="monotone" dataKey="mrr" stroke="#CCFF00" fill="#CCFF00" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}
