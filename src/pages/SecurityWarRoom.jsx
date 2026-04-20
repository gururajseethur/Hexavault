import React from 'react';
import { ShieldAlert, Lock, Zap, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SecurityWarRoom() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-primary rounded-full animate-ping shadow-glow-lime" />
          <h2 className="text-2xl font-bold text-soft-white tracking-tight">SECURITY_WAR_ROOM</h2>
        </div>
        <div className="px-4 py-1.5 bg-surface border border-primary/20 text-primary text-[10px] font-mono rounded uppercase">
          THREAT_LEVEL: ALPHA_LOW
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border-danger/20">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2 text-danger">
                <AlertTriangle size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest font-mono">ANOMALY_LOGS</h3>
             </div>
             <span className="text-[10px] text-muted font-mono">LIVE_FEED</span>
          </div>
          <div className="space-y-4 font-mono text-[10px]">
            {[
              { time: '18:42:01', event: 'FAILED_LOGIN_ATTEMPT', source: 'IP: 192.168.1.102', status: 'Blocked' },
              { time: '18:35:12', event: 'SSH_BRUTEFORCE_DETECTED', source: 'IP: 45.2.19.22', status: 'Blocked' },
              { time: '18:12:44', event: 'SSL_CERT_RENEWAL_REQUIRED', source: 'DOMAIN: vault.os', status: 'Warning' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-surface border border-glass-border rounded group cursor-crosshair">
                <div className="flex items-center gap-4">
                  <span className="text-muted">{log.time}</span>
                  <span className="text-soft-white font-bold group-hover:text-primary transition-colors">{log.event}</span>
                </div>
                <span className={log.status === 'Blocked' ? 'text-danger' : 'text-amber'}>{log.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           {[
             { label: 'OPEN_PORTS', value: '4', icon: Lock },
             { label: 'SSL_SCORE', value: 'A+', icon: ShieldCheck },
             { label: 'DNS_HEALTH', value: '100%', icon: Zap },
             { label: 'ACTIVE_SCANS', value: '2', icon: Eye },
           ].map((s) => (
             <div key={s.label} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <s.icon size={24} className="text-primary mb-3" />
                <p className="text-[10px] text-muted font-mono uppercase mb-1 tracking-widest">{s.label}</p>
                <h4 className="text-xl font-bold text-soft-white">{s.value}</h4>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
