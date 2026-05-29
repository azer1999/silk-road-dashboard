import React, { useMemo, useState } from "react";
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
} from "lucide-react";

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

const nodes = [
  { city: "Shenzhen", country: "CN", x: 12, y: 62, status: "stable" },
  { city: "Khorgos", country: "KZ", x: 33, y: 38, status: "warning" },
  { city: "Aktau", country: "KZ", x: 54, y: 48, status: "stable" },
  { city: "Alat", country: "AZ", x: 67, y: 57, status: "stable" },
  { city: "Istanbul", country: "TR", x: 86, y: 46, status: "stable" },
];

const initialShipments = [
  { id: "KNT-001", origin: "China", destination: "Kazakhstan", status: "AUTO", risk: 12, action: "Green-lane eligible", color: "green", confidence: 94 },
  { id: "KNT-002", origin: "China", destination: "Türkiye", status: "AUTO", risk: 22, action: "Standard corridor flow", color: "green", confidence: 88 },
  { id: "KNT-003", origin: "Kazakhstan", destination: "Azerbaijan", status: "REVIEW", risk: 63, action: "Inspection suggested", color: "yellow", confidence: 68 },
  { id: "KNT-004", origin: "Türkiye", destination: "Azerbaijan", status: "ESCALATE", risk: 91, action: "Emergency hold", color: "red", confidence: 45 },
  { id: "KNT-005", origin: "China", destination: "Türkiye", status: "AUTO", risk: 7, action: "Low-risk priority", color: "green", confidence: 96 },
];

const orchestrationModules = [
  ["Customs Coordination", "Synchronized", ShieldCheck, "green"],
  ["Logistics Networks", "Coordinated", Ship, "blue"],
  ["CIPS/e-CNY Settlement", "Verified", WalletCards, "green"],
  ["Policy Engine", "Active", SlidersHorizontal, "yellow"],
  ["Corridor Risk", "Monitored", Gauge, "blue"],
  ["Adaptive Routing", "Enabled", Route, "green"],
];

const routeOptions = [
  ["Aktau → Alat maritime corridor", "48h", "+18%", "Recommended"],
  ["Khorgos → Caspian reroute", "62h", "+11%", "Contingency"],
  ["Baku → Istanbul rail corridor", "36h", "+22%", "Recommended"],
];

const paymentRows = [
  ["PAY-001", "12,000 RMB", "CIPS-1", "Maintain primary channel", "0.2s faster"],
  ["PAY-002", "450,000 RMB", "External rail", "Switch to CIPS-2", "3.5h settlement gain"],
  ["PAY-003", "2,300,000 RMB", "CIPS-1", "Fee-optimized routing", "15% fee reduction"],
];

function cn(...items) {
  return items.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

function PageTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-6">
      <div className="text-[11px] font-semibold uppercase tracking-[0.34em] text-cyan-300">{kicker}</div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white lg:text-5xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-400">{subtitle}</p>}
    </div>
  );
}

function StatusBadge({ children, tone = "blue" }) {
  const tones = {
    green: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    yellow: "border-amber-400/25 bg-amber-400/10 text-amber-200",
    };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", tones[tone])}>
      <CircleDot className="h-3 w-3" />
      {children}
    </span>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

function StrategicMap() {
  return (
    <div className="relative h-[340px] w-full rounded-[20px] bg-slate-900/40 p-4 border border-white/5">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,20 Q30,10 50,25 T90,15" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
          <path d="M15,50 Q40,40 60,65 T95,55" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
          <path d="M5,80 Q25,85 55,70 T85,85" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" />
          <path d="M12,62 L33,38 L54,48 L67,57 L86,46" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="1" strokeDasharray="4,4" />
        </svg>
      </div>

      {nodes.map((n) => (
        <div
          key={n.city}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`
          }}
        >
          <div className={cn("relative h-4 w-4 rounded-full", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")}>
            <span className={cn("absolute inset-0 animate-ping rounded-full", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")} />
          </div>
          <div className="mt-2 min-w-28 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 shadow-xl backdrop-blur-xl">
            <div className="text-xs font-semibold text-white">{n.city}</div>
            <div className="text-[10px] text-slate-500">{n.country} Node · {n.status === "warning" ? "Watch" : "Stable"}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategicCommand({ shipments, updateShipmentStatus }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="p-6">
          <SectionHeader icon={Network} title="Corridor Map Visualization" subtitle="Geospatial distribution & edge status" />
          <div className="mt-6">
            <StrategicMap />
          </div>
        </Card>
        <Card className="p-6">
          <SectionHeader icon={Ship} title="Active Intermodal Container Pipeline" subtitle="Algorithmic clearance and immediate risk indexing" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3">Container ID</th>
                  <th className="pb-3">Logistics Route</th>
                  <th className="pb-3">Decision Matrix</th>
                  <th className="pb-3 text-right">Risk</th>
                  <th className="pb-3 text-right">Confidence</th>
                  <th className="pb-3 pl-6">Automated Resolution / Operational Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium text-slate-300">
                {shipments.map((ship) => (
                  <tr key={ship.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-mono font-semibold text-cyan-400">{ship.id}</td>
                    <td className="py-3.5 text-slate-200">
                      {ship.origin} <ArrowRight className="mx-1 inline h-3 w-3 text-slate-500" /> {ship.destination}
                    </td>
                    <td className="py-3.5">
                      <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium", ship.color === "green" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : ship.color === "yellow" ? "border-amber-400/25 bg-amber-400/10 text-amber-200" : "border-red-400/25 bg-red-400/10 text-red-200")}>
                        {ship.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-semibold text-slate-100">{ship.risk}%</td>
                    <td className="py-3.5 text-right font-mono text-slate-400">{ship.confidence}%</td>
                    <td className="py-3.5 pl-6 text-slate-300">
                      <div className="flex items-center justify-between gap-2">
                        <span className="italic text-slate-400">{ship.action}</span>
                        {ship.status !== "AUTO" && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => updateShipmentStatus(ship.id, "released")} className="rounded bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-300 hover:bg-emerald-500/30">
                              Release
                            </button>
                            <button onClick={() => updateShipmentStatus(ship.id, "inspected")} className="rounded bg-amber-500/20 px-2 py-1 text-[10px] font-bold text-amber-300 hover:bg-amber-500/30">
                              Inspect
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <SectionHeader icon={Activity} title="Orchestration Layer States" subtitle="Autonomous process sync flags" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            {orchestrationModules.map(([title, state, Icon, tone]) => (
              <div key={title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                <div className="flex items-start justify-between">
                  <div className="text-xs font-semibold text-slate-200 max-w-[70%] leading-snug">{title}</div>
                  <Icon className={cn("h-4 w-4", tone === "green" ? "text-emerald-400" : tone === "yellow" ? "text-amber-400" : "text-cyan-400")} />
                </div>
                <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">{state}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionHeader icon={Route} title="Dynamic Rerouting Matrix" subtitle="Real-time contingency evaluation" />
          <div className="mt-6 space-y-3">
            {routeOptions.map(([label, duration, delta, tag]) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.01] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-200">{label}</div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider", tag === "Recommended" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400")}>
                    {tag}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1"><Timer className="h-3.5 w-3.5 text-slate-500" /> {duration}</span>
                  <span className="text-cyan-400">{delta} capacity delta</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function OrchestrationBrain() {
  return (
    <Card className="p-8 text-center">
      <SectionHeader icon={Activity} title="Cognitive Pipeline" subtitle="Neural routing mechanics" />
      <div className="py-12">
        <RadioTower className="mx-auto h-12 w-12 text-cyan-400" />
        <h4 className="mt-4 text-lg font-semibold text-white">Neural Graph Processing</h4>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Corridor telemetrics are being parsed into decentralized state vectors. Autonomous execution model v4.11 active.</p>
      </div>
    </Card>
  );
}

function CorridorIntelligence() {
  return (
    <Card className="p-8 text-center">
      <SectionHeader icon={Gauge} title="Sensory Analytics" subtitle="IoT network telemetrics" />
      <div className="py-12">
        <Zap className="mx-auto h-12 w-12 text-amber-400" />
        <h4 className="mt-4 text-lg font-semibold text-white">Edge Node Telemetry</h4>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Continuous telemetry heartbeat active across 14,200 connected rail cars and maritime vessels.</p>
      </div>
    </Card>
  );
}

function ContainerReview({ notify }) {
  return (
    <Card className="p-6">
      <SectionHeader icon={FileText} title="Document Verification Audit" subtitle="OCR exception queue" />
      <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h4 className="mt-3 font-semibold text-white">Exception Queue Clear</h4>
        <p className="mt-1 text-xs text-slate-400">All cross-border bill of lading sheets match cryptographic customs manifests.</p>
        <button onClick={() => notify("Forced manual audit re-indexing triggered")} className="mt-4 rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
          Force Re-Audit
        </button>
      </div>
    </Card>
  );
}

function StatePolicyControl({ notify }) {
  return (
    <Card className="p-6">
      <SectionHeader icon={SlidersHorizontal} title="Inter-state Accord Compliance" subtitle="Customs rule enforcement engine" />
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div>
            <div className="text-sm font-semibold text-white">Sino-Kazakh Transit Standard v2</div>
            <div className="text-xs text-slate-400">Automated multi-agency phytosanitary checks matching 2026 mandates</div>
          </div>
          <button onClick={() => notify("Sino-Kazakh Rules synchronized to ledger")} className="rounded-xl bg-cyan-500/20 px-3 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30">
            Sync Rules
          </button>
        </div>
      </div>
    </Card>
  );
}

function SettlementSync({ notify }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionHeader icon={WalletCards} title="Cross-Border Liquidity Settlements" subtitle="Real-time clearing matrix" />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Volume</th>
                <th className="pb-3">Settlement Channel</th>
                <th className="pb-3">Routing Instruction</th>
                <th className="pb-3 text-right">Delta Optimization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-medium text-slate-300">
              {paymentRows.map(([id, volume, channel, instruction, delta]) => (
                <tr key={id} className="hover:bg-white/[0.01]">
                  <td className="py-3 font-mono text-slate-400">{id}</td>
                  <td className="py-3 font-semibold text-emerald-400">{volume}</td>
                  <td className="py-3">
                    <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[10px] border border-white/5 text-slate-300">{channel}</span>
                  </td>
                  <td className="py-3 text-slate-200">{instruction}</td>
                  <td className="py-3 text-right font-semibold text-cyan-400">{delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ImpactAnalytics() {
  return (
    <Card className="p-8 text-center">
      <SectionHeader icon={BarChart3} title="Corridor Macro-Economics" subtitle="Throughput and efficiency projections" />
      <div className="py-12">
        <Landmark className="mx-auto h-12 w-12 text-cyan-400" />
        <h4 className="mt-4 text-lg font-semibold text-white">Economic Indicators</h4>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">Average transit time across the Middle Corridor down 14.2% quarter-over-quarter. Capital velocity indexing optimal.</p>
      </div>
    </Card>
  );
}

function PilotReadiness({ notify }) {
  return (
    <Card className="p-6">
      <SectionHeader icon={ShieldCheck} title="Operational Authority Sign-off" subtitle="Multi-signature validator status" />
      <div className="mt-6 rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-emerald-400" />
          <div>
            <div className="text-sm font-semibold text-white">Cryptographic Node Validations</div>
            <div className="text-xs text-slate-400">All 5 border gate validators reporting active synchronization</div>
          </div>
        </div>
        <button onClick={() => notify("Cryptographic node heartbeat requested")} className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
          Ping Validators
        </button>
      </div>
    </Card>
  );
}

function App() {
  const [screen, setScreen] = useState(0);
  const [shipments, setShipments] = useState(initialShipments);
  const [toast, setToast] = useState(null);

  const updateShipmentStatus = (id, action) => {
    const actionText = action === "released" ? "Cleared by automated system overridden" : "Held for manual customs authority";

    setShipments((prev) =>
      prev.map((ship) =>
        ship.id === id
          ? {
              ...ship,
              status: action === "released" ? "RELEASED" : action === "inspected" ? "INSPECTED" : "ESCALATED",
              color: action === "released" ? "green" : action === "inspected" ? "yellow" : "red",
              action: actionText,
            }
          : ship
      )
    );

    setToast(`Container ${id}: ${actionText}. Simulation record only.`);
    setTimeout(() => setToast(null), 2600);
  };

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const content = useMemo(() => {
    switch (screen) {
      case 0:
        return <StrategicCommand shipments={shipments} updateShipmentStatus={updateShipmentStatus} />;
      case 1:
        return <OrchestrationBrain />;
      case 2:
        return <CorridorIntelligence />;
      case 3:
        return <ContainerReview notify={notify} />;
      case 4:
        return <StatePolicyControl notify={notify} />;
      case 5:
        return <SettlementSync notify={notify} />;
      case 6:
        return <ImpactAnalytics />;
      case 7:
        return <PilotReadiness notify={notify} />;
      default:
        return <StrategicCommand shipments={shipments} updateShipmentStatus={updateShipmentStatus} />;
    }
  }, [screen, shipments]);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 md:p-8 text-white font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {toast && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl border border-cyan-500/30 bg-slate-900/90 px-4 py-3 text-xs font-semibold text-cyan-200 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <RadioTower className="h-4 w-4 text-cyan-400 animate-pulse" />
          {toast}
        </div>
      )}

      <PageTitle kicker="Customs & Trade Logistics Interface" title="UTIS Orchestration Platform" subtitle="Automated neural routing matrix for multi-modal sovereign corridors. Real-time customs synchronization layer v2.81." />

      <div className="mb-8 flex flex-wrap gap-1.5 border-b border-white/5 pb-4">
        {screens.map((scr, idx) => (
          <button
            key={scr}
            onClick={() => setScreen(idx)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-xs font-semibold tracking-tight transition-all duration-200",
              screen === idx
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow-lg shadow-cyan-950/10"
                : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
            )}
          >
            {scr}
          </button>
        ))}
      </div>

      <main>{content}</main>
    </div>
  );
}

export default App;
