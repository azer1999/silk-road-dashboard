import React, { useState } from "react";
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

// --- ДАННЫЕ ДАШБОРДА ---
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

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ И КОМПОНЕНТЫ ---
function cn(...items) {
  return items.filter(Boolean).join(" ");
}

// Увеличили min-h для карточки карты, чтобы элементы не сжимались
function Card({ children, className = "" }) {
  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

function PageTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
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
    red: "border-red-400/25 bg-red-400/10 text-red-200",
    blue: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
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
    <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
function App() {
  const [activeScreen, setActiveScreen] = useState("Strategic Command");

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4 md:p-8 text-white font-sans antialiased">
      
      <PageTitle 
        kicker="Silk Road Intelligence" 
        title="Orchestration Brain" 
        subtitle="Real-time multi-modal logistics corridor intelligence and automated cross-border settlements." 
      />

      <div className="mb-8 flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {screens.map((screen) => (
          <button
            key={screen}
            onClick={() => setActiveScreen(screen)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-medium transition-all duration-200",
              activeScreen === screen 
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
            )}
          >
            {screen}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* НОВАЯ ИНТЕРАКТИВНАЯ КАРТА (Вставили сюда) */}
        <Card className="relative min-h-[400px] overflow-hidden">
          <SectionHeader icon={Network} title="Corridor Nodes" subtitle="Live infrastructure map" />
          
          {/* Контейнер для абсолютного позиционирования точек */}
          <div className="relative w-full h-72 mt-4 bg-slate-900/30 rounded-2xl border border-white/5">
            {nodes.map((n) => (
              <div
                key={n.city}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`
                }}
              >
                {/* Анимированный пинг-маркер */}
                <div className={cn("relative h-4 w-4 rounded-full", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")}>
                  <span className={cn("absolute inset-0 animate-ping rounded-full", n.status === "warning" ? "bg-amber-400" : "bg-emerald-400")} />
                </div>
                
                {/* Всплывающая подсказка с городом */}
                <div className="mt-2 min-w-28 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 shadow-xl backdrop-blur-xl">
                  <div className="text-xs font-semibold text-white">{n.city}</div>
                  <div className="text-[10px] text-slate-500">
                    {n.country} Node · {n.status === "warning" ? "Watch" : "Stable"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Системные модули */}
        <Card>
          <SectionHeader icon={Activity} title="System Modules" subtitle="Automated control layers" />
          <div className="grid grid-cols-2 gap-3">
            {orchestrationModules.map(([name, status, Icon, color]) => (
              <div key={name} className="p-3 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-slate-300 max-w-[80%]">{name}</span>
                  <Icon className={cn("h-4 w-4", color === "green" ? "text-emerald-400" : color === "yellow" ? "text-amber-400" : "text-cyan-400")} />
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{status}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Оптимизация маршрутов */}
        <Card>
          <SectionHeader icon={Route} title="Adaptive Routing" subtitle="Dynamic path optimization" />
          <div className="flex flex-col gap-3">
            {routeOptions.map(([route, time, cost, badge]) => (
              <div key={route} className="p-3 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-200">{route}</span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full", badge === "Recommended" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300")}>
                    {badge}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {time}</span>
                  <span className="text-cyan-300">{cost} Efficiency</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Активные поставки */}
        <Card className="lg:col-span-3 md:col-span-2">
          <SectionHeader icon={Ship} title="Active Shipments" subtitle="Risk analysis & queue state" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Route</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Risk Score</th>
                  <th className="pb-3 font-medium">Confidence</th>
                  <th className="pb-3 font-medium">Automated Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {initialShipments.map((ship) => (
                  <tr key={ship.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-cyan-400 font-medium">{ship.id}</td>
                    <td className="py-3 text-slate-300">{ship.origin} <ArrowRight className="inline h-3 w-3 mx-1 text-slate-500" /> {ship.destination}</td>
                    <td className="py-3">
                      <StatusBadge tone={ship.color}>{ship.status}</StatusBadge>
                    </td>
                    <td className="py-3 font-medium">{ship.risk}%</td>
                    <td className="py-3 text-slate-400">{ship.confidence}%</td>
                    <td className="py-3 text-xs text-slate-300 italic">{ship.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Финансовый клиринг */}
        <Card className="lg:col-span-3 md:col-span-2">
          <SectionHeader icon={WalletCards} title="Settlement Sync" subtitle="CIPS & e-CNY channel optimization" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-medium">Tx ID</th>
                  <th className="pb-3 font-medium">Volume</th>
                  <th className="pb-3 font-medium">Channel</th>
                  <th className="pb-3 font-medium">Routing Instruction</th>
                  <th className="pb-3 font-medium">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {paymentRows.map(([id, volume, channel, instruction, delta]) => (
                  <tr key={id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-slate-400">{id}</td>
                    <td className="py-3 font-semibold text-emerald-400">{volume}</td>
                    <td className="py-3"><span className="px-2 py-1 bg-slate-900 border border-white/10 rounded-lg text-xs">{channel}</span></td>
                    <td className="py-3 text-slate-300">{instruction}</td>
                    <td className="py-3 text-cyan-300 font-medium text-xs">{delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}

export default App;
