import psutil
import platform
import socket
import time
import subprocess
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HexaCore Orchestrator", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── HELPERS ────────────────────────────────────────────────────────────────

def check_port(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.3)
        return s.connect_ex(('127.0.0.1', port)) == 0

SERVICES_DEF = [
    {"name": "OpenClaw API",        "port": 7860,  "id": "openclaw"},
    {"name": "LiteLLM Proxy",       "port": 4000,  "id": "litellm"},
    {"name": "Ollama Engine",       "port": 11434, "id": "ollama"},
    {"name": "Python Orchestrator", "port": 8000,  "id": "orchestrator"},
]

# ─── CORE STATUS ─────────────────────────────────────────────────────────────

@app.get("/system/status")
async def get_status():
    mem  = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    cpu  = psutil.cpu_percent(interval=None)

    service_status = [
        {
            "name":   s["name"],
            "port":   s["port"],
            "id":     s["id"],
            "status": "online" if check_port(s["port"]) else "offline"
        }
        for s in SERVICES_DEF
    ]

    return {
        "telemetry": {
            "ram":    mem.percent,
            "ram_gb": round(mem.used / (1024**3), 2),
            "ram_total_gb": round(mem.total / (1024**3), 2),
            "disk":   disk.percent,
            "cpu":    cpu,
            "uptime": int(time.time() - psutil.boot_time())
        },
        "services": service_status,
        "platform": platform.system()
    }

# ─── SYSTEM SUMMARY (for /system-summary command) ────────────────────────────

@app.get("/intel/system-summary")
async def system_summary():
    mem  = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    cpu  = psutil.cpu_percent(interval=0.5)
    net  = psutil.net_io_counters()

    services_up   = sum(1 for s in SERVICES_DEF if check_port(s["port"]))
    services_down = len(SERVICES_DEF) - services_up

    # Running process count
    proc_count = len(list(psutil.process_iter()))

    # Top 3 CPU processes
    top_procs = []
    try:
        procs = [(p.info['name'], p.info['cpu_percent'])
                 for p in psutil.process_iter(['name', 'cpu_percent'])
                 if p.info['cpu_percent'] and p.info['cpu_percent'] > 0]
        top_procs = sorted(procs, key=lambda x: x[1], reverse=True)[:3]
    except Exception:
        pass

    return {
        "ram_pct":      round(mem.percent, 1),
        "ram_used_gb":  round(mem.used / (1024**3), 2),
        "ram_total_gb": round(mem.total / (1024**3), 2),
        "cpu_pct":      round(cpu, 1),
        "disk_pct":     round(disk.percent, 1),
        "disk_free_gb": round(disk.free / (1024**3), 1),
        "net_sent_mb":  round(net.bytes_sent / (1024**2), 1),
        "net_recv_mb":  round(net.bytes_recv / (1024**2), 1),
        "services_up":  services_up,
        "services_down": services_down,
        "proc_count":   proc_count,
        "top_procs":    top_procs,
        "platform":     platform.system() + " " + platform.release()
    }

# ─── MEMORY AUDIT (for /check-leaks command) ─────────────────────────────────

@app.get("/intel/memory-audit")
async def memory_audit():
    mem = psutil.virtual_memory()

    # Find top memory-hungry processes
    leaks = []
    try:
        for p in psutil.process_iter(['pid', 'name', 'memory_percent', 'memory_info']):
            try:
                mp = p.info['memory_percent']
                mi = p.info['memory_info']
                if mp and mp > 0.5:  # > 0.5% RAM
                    leaks.append({
                        "pid":      p.info['pid'],
                        "name":     p.info['name'],
                        "ram_pct":  round(mp, 2),
                        "ram_mb":   round(mi.rss / (1024**2), 1) if mi else 0
                    })
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                pass
        leaks = sorted(leaks, key=lambda x: x['ram_pct'], reverse=True)[:8]
    except Exception as e:
        leaks = [{"name": "error", "ram_pct": 0, "ram_mb": 0, "pid": 0, "detail": str(e)}]

    # Determine if system is under pressure
    pressure_level = "NOMINAL"
    if mem.percent > 85:
        pressure_level = "CRITICAL"
    elif mem.percent > 70:
        pressure_level = "WARNING"

    return {
        "pressure":    pressure_level,
        "ram_pct":     round(mem.percent, 1),
        "ram_used_gb": round(mem.used / (1024**3), 2),
        "ram_avail_gb": round(mem.available / (1024**3), 2),
        "swap_pct":    round(psutil.swap_memory().percent, 1),
        "top_consumers": leaks
    }

# ─── GITHUB INTEL (for /repo-status command) ─────────────────────────────────
# This endpoint returns a static snapshot seeded at startup.
# The real GitHub data is fetched client-side via the JS layer.
# This endpoint provides local context: which local projects exist.

@app.get("/intel/repo-status")
async def repo_status():
    """Returns local project context. GitHub API calls happen in the browser."""
    return {
        "github_user": "gururajseethur",
        "tracked_repos": [
            {"name": "Hexamind_Lets_Secure", "type": "cybersec",   "lang": "Python"},
            {"name": "gururajseethur.in",    "type": "portfolio",  "lang": "JavaScript"},
            {"name": "Tryhackme-Gururajseethur","type": "cybersec","lang": "TypeScript"},
            {"name": "privacy-incident-response","type": "grc",    "lang": "Markdown"},
            {"name": "secure-file-transfer-design","type": "grc",  "lang": "Markdown"},
        ],
        "local_note": "GitHub commit data fetched live from browser."
    }

# ─── ENTRY POINT ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
