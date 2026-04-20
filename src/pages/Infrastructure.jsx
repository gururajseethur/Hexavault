import React from 'react';
import { Server, Database, Container, Cloud, Zap, Cpu } from 'lucide-react';

export default function Infrastructure() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-soft-white tracking-tight">INFRASTRUCTURE_NODES</h2>
        <div className="text-[10px] text-primary font-mono bg-primary/10 px-3 py-1 rounded">GLOBAL_UPTIME: 99.9992%</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'K8S_CLUSTER_A', type: 'Container Oracle', load: '12%', heath: 'Healthy', icon: Container },
          { name: 'REDIS_CACHE_01', type: 'Memory Pool', load: '45%', heath: 'Healthy', icon: Zap },
          { name: 'POSTGRES_MASTER', type: 'Relational Store', load: '84%', heath: 'Under Load', icon: Database },
          { name: 'AWS_LAMBDA_API', type: 'Serverless Runtime', load: '1%', heath: 'Healthy', icon: Cloud },
          { name: 'GPU_NODE_H100', type: 'Compute Core', load: '98%', heath: 'Processing', icon: Cpu },
        ].map((node) => (
          <div key={node.name} className="glass-card p-6 rounded-2xl group hover:border-primary/30 active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-surface border border-glass-border rounded-xl text-primary group-hover:shadow-glow-lime transition-all">
                  <node.icon size={20} />
               </div>
               <div className={`text-[10px] uppercase font-mono font-bold ${node.heath === 'Healthy' ? 'text-primary' : 'text-amber'}`}>
                 {node.heath}
               </div>
            </div>
            <h4 className="text-sm font-bold text-soft-white mb-1">{node.name}</h4>
            <p className="text-[10px] text-muted font-mono uppercase tracking-widest mb-4">{node.type}</p>
            <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: node.load }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
