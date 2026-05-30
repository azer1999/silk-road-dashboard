import React, { useState, useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Database,
  FileText,
  Gauge,
  Landmark,
  Lock,
  Network,
  RadioTower,
  Route,
  ShieldCheck,
  Ship,
  SlidersHorizontal,
  Timer,
  WalletCards,
  Zap,
  Sliders,
  Eye,
  Layers,
  X
} from "lucide-react";

// --- НАЧАЛЬНЫЕ ДАННЫЕ ДЛЯ СИМУЛЯЦИИ ---
const screens = [
  "Strategic Command",
  "Orchestration Brain",
  "Corridor Intelligence",
  "Container Review",
  "State Policy Control",
  "Settlement Sync",
  "Impact Analytics",
  "Pilot Readiness",
];

const initialNodes = [
  { city: "Shenzhen", country: "CN", x: 12, y: 62, status: "stable" },
  { city: "Khorgos", country: "KZ", x: 33, y: 38, status: "warning" },
  { city: "Aktau", country: "KZ", x: 54, y: 48, status: "stable" },
  { city: "Alat", country: "AZ", x: 67, y: 57, status: "stable" },
  { city: "Istanbul", country: "TR", x: 86, y: 46, status: "stable" },
];

const initialShipments = [
  { id: "KNT-001", origin: "China", destination: "Kazakhstan", status: "AUTO", risk: 12, action: "Green-lane eligible", color: "green", confidence: 94, weight: "24 Tons", type: "Electronics" },
  { id: "KNT-002", origin: "China", destination: "Türkiye", status: "AUTO", risk: 22, action: "Standard corridor flow", color: "green", confidence: 88, weight: "22 Tons", type: "Machinery" },
  { id: "KNT-003", origin: "Kazakhstan", destination: "Azerbaijan", status: "REVIEW", risk: 63, action: "Inspection suggested", color: "yellow", confidence: 68, weight: "19 Tons", type: "Chemicals" },
  { id: "KNT-004", origin: "Türkiye", destination: "Azerbaijan", status: "ESCALATE", risk: 91, action: "Emergency hold", color: "red", confidence: 45, weight: "26 Tons", type: "Textiles" },
  { id: "KNT-005", origin: "China", destination: "Türkiye", status: "AUTO", risk: 7, action: "Low-risk priority", color: "green", confidence: 96, weight: "20 Tons", type: "Consumer Goods" },
];

const orchestrationModules = [
  { id: "mod-1", name: "Customs Coordination", status: "Synchronized", icon: ShieldCheck, color: "green", details: "Cross-border sovereign API relays are responding within 45ms. Symmetric cryptographic ledgers verified." },
  { id: "mod-2", name: "Logistics Networks", status: "Coordinated", icon: Ship, color: "blue", details: "Multi-modal blocktrain scheduling synchronized with Caspian rail-ferry timetables. Capacity load at 84%." },
  { id: "mod-3", name: "CIPS/e-CNY Settlement", status: "Verified", icon: WalletCards, color: "green", details: "Liquidity routers optimal. Automatic smart contracts deployed for immediate customs tariff release upon border arrival." },
  { id: "mod-4", name: "Policy Engine", status: "Active", icon: SlidersHorizontal, color: "yellow", details: "National security override buffers operating within standard parameters. Latency check on tariff updates: 0.2s." },
  { id: "mod-5", name: "Corridor Risk", status: "Monitored", icon: Gauge, color: "blue", details: "Predictive AI engine parsing weather telemetrics, border customs backlogs, and multi-modal transit anomalies." },
  { id: "mod-6", name: "Adaptive Routing", status: "Enabled", icon: Route, color: "green", details: "Autonomous alternative pipeline discovery running. Telemetry feeds active across Middle Corridor tracks." },
];

const routeOptions = [
  { id: "rt-1", route: "Aktau → Alat maritime corridor", time: "48h", cost: "+18%", badge: "Recommended", description: "Optimal sea state conditions observed. High maritime throughput efficiency across the Caspian sector." },
  { id: "rt-2", route: "Khorgos → Caspian reroute", time: "62h", cost: "+11%", badge: "Contingency", description: "Land border terminal experiencing mild customs congestion. Suggested for non-perishable freight layers." },
  { id: "rt-3", route: "Baku → Istanbul rail corridor", time: "36h", cost: "+22%", badge: "Recommended", description: "Baku-Tbilisi-Kars rail line running at absolute priority state. Blocktrain priority clearance granted." },
];

const paymentRows = [
  { id: "PAY-001", volume: "12,000 RMB", channel: "CIPS-1", instruction: "Maintain primary channel", delta: "0.2s faster", description: "Direct central bank settlement liquidity pool utilized. Zero counterparty routing friction." },
  { id: "PAY-002", volume: "450,000 RMB", channel: "External rail", instruction: "Switch to CIPS-2", delta: "3.5h settlement gain", description: "Automated routing optimization triggered due to clearing gridlock on standard cross-border channels." },
  { id: "PAY-003", volume: "2,300,000 RMB", channel: "CIPS-1", instruction: "Fee-optimized routing", delta: "15% fee reduction", description: "Large-volume batch processing enabled via national wholesale digital currency ledger rails." },
];

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
function cn(...items) {
  return items.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white tracking-wide">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ children, tone = "blue" }) {
  const tones = {
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    yellow: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    red: "border-red-500/30 bg-red-500/10 text-red-300",
    blue: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase", tones[tone])}>
      <CircleDot className="h-2.5 w-2.5 animate-pulse" />
      {children}
    </span>
  );
}

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
function App() {
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [shipments, setShipments] = useState(initialShipments);
  const [toast, setToast] = useState(null);

  // Состояния для экранов интерфейса
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedModule, setSelectedModule] = useState(orchestrationModules[0]);
  const [selectedRoute, setSelectedRoute] = useState(routeOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentRows[0]);
  
  // Состояния для State Policy Control
  const [riskThreshold, setRiskThreshold] = useState(70);
  const [isOverrideActive, setIsOverrideActive] = useState(false);
  const [policyPriority, setPolicyPriority] = useState("Throughput");

  // Состояние для Impact Analytics
  const [activeScenario, setActiveScenario] = useState("Sino-Euro Maximum");

  // Состояние для Pilot Readiness
  const [selectedMilestone, setSelectedMilestone] = useState("Phase 1");

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const toneMap = { RELEASED: "green", INSPECTED: "yellow", ESCALATED: "red" };
    const actionTextMap = {
      RELEASED: "Cleared by automated system override.",
      INSPECTED: "Held for physical customs border inspection.",
      ESCALATED: "Emergency critical containment protocol triggered."
    };

    setShipments(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          color: toneMap[newStatus],
          action: actionTextMap[newStatus]
        };
      }
      return s;
    }));

    if (selectedShipment && selectedShipment.id === id) {
      setSelectedShipment(prev => ({
        ...prev,
        status: newStatus,
        color: toneMap[newStatus],
        action: actionTextMap[newStatus]
      }));
    }

    triggerToast(`Container ${id} state updated to ${newStatus}`);
    setSelectedShipment(null);
  };

  // --- ОТДЕЛЬНЫЕ ЭКРАНЫ ИНТЕРФЕЙСА ---
  
  // ЭКРАН 1: Strategic Command
  const renderStrategicCommand = () => (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <SectionHeader icon={Network} title="Sovereign Multi-Modal Corridor Map" subtitle="Real-time geo-spatial telemetric data and infrastructure status vectors" />
          <div className="relative h-[300px] w-full rounded-2xl bg-slate-900/40 p-4 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M12,62 L33,38 L54,48 L67,57 L86,46" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeDasharray="3,3" />
              </svg>
            </div>
            {initialNodes.map((n) => (
              <div
                key={n.city}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                onClick={() => triggerToast(`Node heartbeat checked: ${n.city} reporting ${n.status.toUpperCase()}`)}
              >
                <div className={cn("relative h-4 w-4 rounded-full shadow-lg shadow-black/50", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")}>
                  <span className={cn("absolute inset-0 animate-ping rounded-full", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")} />
                </div>
                <div className="mt-1.5 min-w-24 rounded-xl border border-white/10 bg-slate-950/95 px-2.5 py-1.5 shadow-2xl backdrop-blur-xl pointer-events-none group-hover:scale-105 transition-transform">
                  <div className="text-[11px] font-bold text-white">{n.city}</div>
                  <div className="text-[9px] text-slate-400">{n.country} · {n.status === "warning" ? "Watch State" : "Stable Channel"}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader icon={Ship} title="Active Intermodal Container Pipeline" subtitle="Click any container row to launch human validation console and override authority" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">ID</th>
                  <th className="pb-3">Route Path</th>
                  <th className="pb-3">Clearance Matrix</th>
                  <th className="pb-3 text-right">Risk</th>
                  <th className="pb-3 text-right">Confidence</th>
                  <th className="pb-3 pl-6">Automated Action State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium">
                {shipments.map((ship) => (
                  <tr 
                    key={ship.id} 
                    onClick={() => setSelectedShipment(ship)}
                    className="group hover:bg-cyan-500/5 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 pl-2 font-mono font-bold text-cyan-400">{ship.id}</td>
                    <td className="py-3.5 text-slate-200">{ship.origin} <ArrowRight className="inline h-3 w-3 mx-1 text-slate-500" /> {ship.destination}</td>
                    <td className="py-3.5"><StatusBadge tone={ship.color}>{ship.status}</StatusBadge></td>
                    <td className="py-3.5 text-right font-bold">{ship.risk}%</td>
                    <td className="py-3.5 text-right text-slate-400 font-mono">{ship.confidence}%</td>
                    <td className="py-3.5 pl-6 text-slate-300 italic text-[11px] group-hover:text-cyan-300 transition-colors">{ship.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <SectionHeader icon={Activity} title="Orchestration Summary" subtitle="Live state summary across sovereign networks" />
          <div className="grid grid-cols-2 gap-3">
            {orchestrationModules.slice(0, 4).map((m) => (
              <div key={m.name} className="p-3 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[11px] font-semibold text-slate-300 leading-tight">{m.name}</span>
                  <m.icon className="h-3.5 w-3.5 text-cyan-400" />
                </div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500">{m.status}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader icon={Route} title="Dynamic Alternative Routing" subtitle="Real-time automated path discovery" />
          <div className="space-y-2">
            {routeOptions.map((r) => (
              <div key={r.id} className="p-2.5 rounded-xl border border-white/5 bg-white/[0.01] text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200 truncate max-w-[70%]">{r.route}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold uppercase">{r.badge}</span>
                </div>
                <div className="flex gap-3 text-[11px] text-slate-400 mt-1">
                  <span>Delta: <strong className="text-emerald-400">{r.time}</strong></span>
                  <span>Efficiency: {r.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  // ЭКРАН 2: Orchestration Brain
  const renderOrchestrationBrain = () => (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <h4 className="text-sm font-bold tracking-wider text-cyan-300 uppercase">Select Orchestration Engine Layer:</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {orchestrationModules.map((m) => (
            <div 
              key={m.id}
              onClick={() => setSelectedModule(m)}
              className={cn(
                "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between",
                selectedModule.id === m.id 
                  ? "bg-cyan-950/40 border-cyan-400/50 shadow-lg shadow-cyan-950/50" 
                  : "bg-slate-900/30 border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm text-white">{m.name}</span>
                <m.icon className={cn("h-5 w-5", selectedModule.id === m.id ? "text-cyan-400 animate-pulse" : "text-slate-400")} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-500 uppercase tracking-wider text-[10px]">Operational State</span>
                <span className={cn("font-bold px-2 py-0.5 rounded text-[10px]", m.color === "green" ? "bg-emerald-500/10 text-emerald-400" : m.color === "yellow" ? "bg-amber-500/10 text-amber-400" : "bg-cyan-500/10 text-cyan-400")}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Card className="h-full border-cyan-500/20 bg-slate-950/80">
          <SectionHeader icon={Layers} title="Module Detail Panel" subtitle="Deep network telemetry insights" />
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block">Selected Subsystem</label>
              <div className="text-base font-bold text-white mt-1">{selectedModule.name}</div>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-500 block">Core Relays Configuration</label>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 p-3.5 rounded-xl bg-slate-900/50 border border-white/5">
                {selectedModule.details}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 text-[11px] text-slate-400 flex flex-col gap-2">
              <div className="flex justify-between"><span>Telemetry Stream:</span><span className="text-emerald-400 font-mono">ACTIVE (100%)</span></div>
              <div className="flex justify-between"><span>Encryption Protocol:</span><span className="text-cyan-400 font-mono">SHA-256/mTLS</span></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // ЭКРАН 3: Corridor Intelligence
  const renderCorridorIntelligence = () => (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-3">
        <h4 className="text-sm font-bold tracking-wider text-cyan-300 uppercase mb-2">Click Route Row to Analyze Capacity Projections:</h4>
        {routeOptions.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelectedRoute(r)}
            className={cn(
              "p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center",
              selectedRoute.id === r.id 
                ? "bg-cyan-950/30 border-cyan-400/50 shadow-md" 
                : "bg-slate-900/20 border-white/5 hover:border-white/10"
            )}
          >
            <div className="space-y-1">
              <div className="font-bold text-sm text-white">{r.route}</div>
              <div className="text-xs text-slate-400">Estimated duration Delta: <span className="text-cyan-400 font-medium">{r.time}</span></div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400 block">{r.cost} Efficiency</span>
              <span className="text-[9px] uppercase font-extrabold text-slate-500 tracking-wider mt-1 block">{r.badge}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Card className="h-full border-cyan-500/10">
          <SectionHeader icon={Eye} title="Route Decision Panel" subtitle="Real-time multi-modal bottleneck scoring" />
          <div className="space-y-4 mt-4">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Target Channel</div>
              <div className="text-sm font-bold text-white mt-1">{selectedRoute.route}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300 leading-relaxed">
              {selectedRoute.description}
            </div>
            <div className="space-y-2 pt-2 text-[11px]">
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Risk Coefficient:</span><span className="font-bold text-slate-200">0.14 Optimal</span></div>
              <div className="flex justify-between border-b border-white/5 pb-1"><span>Border Dwell Time:</span><span className="font-bold text-emerald-400">14 Mins Avg</span></div>
              <div className="flex justify-between"><span>Throughput Score:</span><span className="font-bold text-cyan-400">9.8 / 10</span></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // ЭКРАН 4: Container Review
  const renderContainerReview = () => (
    <Card className="p-8 text-center max-w-2xl mx-auto">
      <SectionHeader icon={FileText} title="Document Verification Audit Desk" subtitle="Neural OCR semantic validation pipeline" />
      <div className="py-8 space-y-4">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-400 animate-pulse" />
        <h4 className="text-lg font-bold text-white">Cryptographic Exception Queue: Empty</h4>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          All real-time multi-modal bills of lading, customs declarations, and digital seals perfectly match sovereign ledger state declarations.
        </p>
        <div className="pt-4">
          <button 
            onClick={() => triggerToast("Forced neural document cross-audit re-indexing initiated...")}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
          >
            Force Complete System Re-Audit
          </button>
        </div>
      </div>
    </Card>
  );

  // ЭКРАН 5: State Policy Control
  const renderStatePolicyControl = () => (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <SectionHeader icon={SlidersHorizontal} title="Autonomous Policy Rule Constraints" subtitle="Configure automated machine-learning execution boundaries" />
          
          <div className="space-y-6 mt-6">
            {/* СЛАЙДЕР РИСКА */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Global Corridor Risk Threshold Constraint</span>
                <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-sm">{riskThreshold}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="95" 
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                disabled={isOverrideActive}
                className={cn("w-full h-1.5 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-cyan-400", isOverrideActive && "opacity-30 cursor-not-allowed")} 
              />
              <p className="text-[11px] text-slate-500 italic">
                {isOverrideActive ? "⚠️ Slider locked due to Active Manual Emergency Override State." : "Automated algorithms will flag containers exceeding this risk ratio for human review."}
              </p>
            </div>

            {/* КНОПКИ ПРИОРИТЕТА */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-xs font-bold text-slate-300 block">Active Policy Directive Priority</label>
              <div className="flex flex-wrap gap-2">
                {["Throughput Max", "Strict Security Audit", "Balanced Ledger Integrity"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPolicyPriority(p);
                      triggerToast(`Policy priority state changed to: ${p}`);
                    }}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold rounded-xl border transition-all",
                      policyPriority === p 
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40" 
                        : "bg-slate-900/40 border-white/5 text-slate-400 hover:text-white"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Card className={cn("h-full border transition-all", isOverrideActive ? "border-red-500/30 bg-red-950/10" : "border-white/10")}>
          <SectionHeader icon={AlertTriangle} title="Human Override Authority Console" subtitle="Emergency sovereign protocol control" />
          <div className="space-y-6 mt-6">
            <div className="text-xs text-slate-400 leading-relaxed">
              Activating the manual override layer completely suspends automated AI container clearances and requires manual state authorization keys for border gates.
            </div>
            
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Current Security State</span>
              <span className={cn("text-sm font-bold uppercase font-mono tracking-wider", isOverrideActive ? "text-red-400" : "text-emerald-400")}>
                {isOverrideActive ? "🚨 EMERGENCY MAN OVERRIDE" : "🛡️ AUTONOMOUS SYNC PARAMETERS"}
              </span>
            </div>

            <div>
              <button
                onClick={() => {
                  setIsOverrideActive(!isOverrideActive);
                  triggerToast(isOverrideActive ? "Autonomous AI routing constraints restored." : "WARNING: Manual override active. Automated channels frozen.");
                }}
                className={cn(
                  "w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all",
                  isOverrideActive 
                    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30" 
                    : "bg-red-500/20 border-red-400/40 text-red-300 hover:bg-red-500/30"
                )}
              >
                {isOverrideActive ? "Deactivate Override State" : "Trigger Emergency Override"}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // ЭКРАН 6: Settlement Sync
  const renderSettlementSync = () => (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-3">
        <h4 className="text-sm font-bold tracking-wider text-cyan-300 uppercase mb-2">Click Liquidity Channel Row to Analyze Settlement Instructions:</h4>
        {paymentRows.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPayment(p)}
            className={cn(
              "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
              selectedPayment.id === p.id 
                ? "bg-cyan-950/30 border-cyan-400/50 shadow-md" 
                : "bg-slate-900/20 border-white/5 hover:border-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 font-mono text-[10px] text-slate-400 border border-white/5">{p.id}</div>
              <div>
                <div className="font-bold text-sm text-white">{p.volume}</div>
                <div className="text-xs text-slate-400">Channel Infrastructure: <span className="font-mono text-cyan-300">{p.channel}</span></div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-emerald-400 block">{p.delta}</span>
              <span className="text-[11px] text-slate-400 italic mt-1 block">{p.instruction}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Card className="h-full border-cyan-500/10 flex flex-col justify-between">
          <div className="space-y-4">
            <SectionHeader icon={WalletCards} title="Liquidity Route Detail" subtitle="Automated CIPS & wholesale digital banking synchronization" />
            <div className="space-y-3 mt-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Selected Channel ID</span>
                <span className="font-mono text-sm text-white font-bold">{selectedPayment.id} ({selectedPayment.channel})</span>
              </div>
              <p className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-slate-300 leading-relaxed">
                {selectedPayment.description}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => triggerToast(`Transaction batch ${selectedPayment.id} validated. Settlement ledger instructions synchronized successfully.`)}
              className="w-full py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
            >
              Confirm Operational Routing Instruction
            </button>
          </div>
        </Card>
      </div>
    </div>
  );

  // ЭКРАН 7: Impact Analytics
  const renderImpactAnalytics = () => {
    const scenarioData = {
      "Sino-Euro Maximum": { throughput: "+34.2%", time: "-42.5 Hours", costs: "-18.4%", integrity: "99.94%" },
      "Caspian Sea Surge": { throughput: "+18.9%", time: "-21.0 Hours", costs: "-11.2%", integrity: "99.98%" },
      "Baku-Tbilisi Blocktrain Priority": { throughput: "+27.5%", time: "-36.2 Hours", costs: "-15.0%", integrity: "99.91%" }
    };

    const currentMetrics = scenarioData[activeScenario];

    return (
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-white/5 pb-3">
          {Object.keys(scenarioData).map((scen) => (
            <button
              key={scen}
              onClick={() => setActiveScenario(scen)}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-xl border transition-all",
                activeScenario === scen 
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30" 
                  : "text-slate-400 border-transparent hover:bg-white/5"
              )}
            >
              {scen}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Throughput Optimization Delta", val: currentMetrics.throughput, icon: Activity, color: "text-cyan-400" },
            { label: "Corridor Dwell Time Delta", val: currentMetrics.time, icon: Timer, color: "text-emerald-400" },
            { label: "Sovereign Customs Fee Margin", val: currentMetrics.costs, icon: Landmark, color: "text-amber-400" },
            { label: "Ledger State Cryptographic Integrity", val: currentMetrics.integrity, icon: ShieldCheck, color: "text-indigo-400" },
          ].map((m) => (
            <Card key={m.label} className="p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 max-w-[80%] leading-tight">{m.label}</span>
                <m.icon className={cn("h-4 w-4", m.color)} />
              </div>
              <div className="text-2xl font-bold tracking-tight text-white mt-4 font-mono">{m.val}</div>
            </Card>
          ))}
        </div>

        <Card className="p-5 text-xs text-slate-400 italic">
          💡 Metrics are dynamically computed via parsing neural machine-learning predictions across historic sovereign trade channels.
        </Card>
      </div>
    );
  };

  // ЭКРАН 8: Pilot Readiness
  const renderPilotReadiness = () => {
    const milestones = {
      "Phase 1": { title: "API Cryptographic Synchronization", state: "Completed", details: "All customs endpoints in China, Kazakhstan, Azerbaijan, and Turkey are linked via secure mTLS ledger relays." },
      "Phase 2": { title: "Smart Contract Settlement Test", state: "Completed", details: "Wholesale digital asset multi-currency cross-border trade transactions successfully cleared with zero settlement failures." },
      "Phase 3": { title: "Autonomous Routing Live Run", state: "Active Trial", details: "Currently coordinating 500 intermodal shipping containers with automated exception management thresholds." }
    };

    return (
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-sm font-bold tracking-wider text-cyan-300 uppercase mb-2">Click System Milestone for Progress Analysis:</h4>
          {Object.keys(milestones).map((mKey) => (
            <div
              key={mKey}
              onClick={() => setSelectedMilestone(mKey)}
              className={cn(
                "p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center",
                selectedMilestone === mKey 
                  ? "bg-cyan-950/30 border-cyan-400/50 shadow-md" 
                  : "bg-slate-900/20 border-white/5 hover:border-white/10"
              )}
            >
              <div>
                <div className="text-xs font-bold font-mono text-cyan-400">{mKey}</div>
                <div className="font-bold text-sm text-white mt-0.5">{milestones[mKey].title}</div>
              </div>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded", milestones[mKey].state === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400 animate-pulse")}>
                {milestones[mKey].state}
              </span>
            </div>
          ))}
        </div>

        <div>
          <Card className="h-full border-white/5">
            <SectionHeader icon={Sliders} title="Milestone Audit Desk" subtitle="Sovereign compliance checkpoints status" />
            <div className="space-y-4 mt-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Selected Gate Checkpoint</span>
                <span className="text-sm font-bold text-white mt-1 block">{milestones[selectedMilestone].title}</span>
              </div>
              <p className="p-3.5 rounded-xl bg-slate-900/50 border border-white/5 text-slate-300 leading-relaxed">
                {milestones[selectedMilestone].details}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // --- ВЫБОР ЭКРАНА НА ЛЕТУ ---
  const activeContent = useMemo(() => {
    switch (activeScreenIdx) {
      case 0: return renderStrategicCommand();
      case 1: return renderOrchestrationBrain();
      case 2: return renderCorridorIntelligence();
      case 3: return renderContainerReview();
      case 4: return renderStatePolicyControl();
      case 5: return renderSettlementSync();
      case 6: return renderImpactAnalytics();
      case 7: return renderPilotReadiness();
      default: return renderStrategicCommand();
    }
  }, [activeScreenIdx, shipments, selectedShipment, selectedModule, selectedRoute, selectedPayment, riskThreshold, isOverrideActive, policyPriority, activeScenario, selectedMilestone]);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 md:p-8 text-white font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ТУТ СИСТЕМНЫЕ TOAST УВЕДОМЛЕНИЯ */}
      {toast && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-cyan-500/30 bg-slate-900/95 px-5 py-3.5 text-xs font-bold text-cyan-200 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <RadioTower className="h-4 w-4 text-cyan-400 animate-pulse" />
          {toast}
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ СТРАТЕГИЧЕСКОГО КОМАНДОВАНИЯ С КНОПКАМИ ИЗМЕНЕНИЯ СТАТУСА */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/80">
            <div className="flex justify-between items-start border-b border-white/5 pb-3">
              <div>
                <h4 className="text-base font-bold text-white">Human Validation Override Console</h4>
                <p className="text-xs text-slate-400 mt-0.5">Container Reference: <span className="font-mono text-cyan-400 font-bold">{selectedShipment.id}</span></p>
              </div>
              <button 
                onClick={() => setSelectedShipment(null)}
                className="p-1 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 my-5 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div><span className="text-[10px] text-slate-500 uppercase block">Route</span><span className="font-medium text-slate-200">{selectedShipment.origin} ➔ {selectedShipment.destination}</span></div>
                <div><span className="text-[10px] text-slate-500 uppercase block">Cargo Classification</span><span className="font-medium text-slate-200">{selectedShipment.type} ({selectedShipment.weight})</span></div>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400">Current AI Matrix State:</span>
                <StatusBadge tone={selectedShipment.color}>{selectedShipment.status}</StatusBadge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Algorithmic Risk Rating:</span>
                <span className="font-bold text-white font-mono">{selectedShipment.risk}% (Confidence: {selectedShipment.confidence}%)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block text-center mb-1">Issue Sovereign Override Mandate</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleUpdateStatus(selectedShipment.id, "RELEASED")}
                  className="py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] hover:bg-emerald-500/30 transition-all"
                >
                  Release
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedShipment.id, "INSPECTED")}
                  className="py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px] hover:bg-amber-500/30 transition-all"
                >
                  Inspect
                </button>
                <button 
                  onClick={() => handleUpdateStatus(selectedShipment.id, "ESCALATED")}
                  className="py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-[11px] hover:bg-red-500/30 transition-all"
                >
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* КОНТРОЛЬНЫЙ ПРИЗНАК ПРАВИЛЬНОЙ ВЕРСИИ */}
      <header className="mb-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.34em] text-cyan-300">Customs & Sovereign Trade Analytics</div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
          Federated Trade Orchestration Command Center
        </h1>
        <p className="mt-2 max-w-4xl text-xs text-slate-400 leading-relaxed">
          Decentralized ledger sync layer for multi-modal Middle Corridor infrastructure monitoring, smart contractual trade clearance, and algorithmic risk mitigation.
        </p>
      </header>

      {/* ВЕРХНЕЕ МЕНЮ С 8 ОТДЕЛЬНЫМИ ЭКРАНАМИ */}
      <div className="mb-8 flex flex-wrap gap-1.5 border-b border-white/5 pb-4">
        {screens.map((scr, idx) => (
          <button
            key={scr}
            onClick={() => {
              setActiveScreenIdx(idx);
              triggerToast(`Mapsd to: ${scr}`);
            }}
            className={cn(
              "rounded-xl px-4 py-2.5 text-xs font-bold tracking-tight transition-all duration-200",
              activeScreenIdx === idx
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-xl shadow-cyan-950/20"
                : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
            )}
          >
            {scr}
          </button>
        ))}
      </div>

      {/* АКТИВНЫЙ КОНТЕНТ ВЫБРАННОГО ЭКРАНА */}
      <main className="min-h-[400px]">
        {activeContent}
      </main>
    </div>
  );
}

export default App;
