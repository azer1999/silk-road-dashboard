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

// --- Данные конфигурации ---
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

const shipments = [
  { id: "KNT-001", origin: "China", destination: "Kazakhstan", status: "AUTO", risk: 12, action: "Green-lane eligible", color: "green" },
  { id: "KNT-002", origin: "China", destination: "Türkiye", status: "AUTO", risk: 22, action: "Standard corridor flow", color: "green" },
  { id: "KNT-003", origin: "Kazakhstan", destination: "Azerbaijan", status: "REVIEW", risk: 63, action: "Inspection suggested", color: "yellow" },
  { id: "KNT-004", origin: "Türkiye", destination: "Azerbaijan", status: "ESCALATE", risk: 91, action: "Emergency hold", color: "red" },
  { id: "KNT-005", origin: "China", destination: "Türkiye", status: "AUTO", risk: 7, action: "Low-risk priority", color: "green" },
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

// --- Вспомогательные функции и UI-компоненты ---
function cn(...items) {
  return items.filter(Boolean).join(" ");
}

function Card({ children, className = "" }) {
  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-slate-950/55 shadow-2xl shadow-black/30 backdrop-blur-xl p-6", className)}>
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
    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

// --- Главный компонент Дашборда ---
export default function App() {
  const [activeScreen, setActiveScreen] = useState(screens[0]);
  const [riskFilter, setRiskFilter] = useState(0);

  const filteredShipments = useMemo(() => {
    return shipments.filter((s) => s.risk >= riskFilter);
  }, [riskFilter]);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-100 selection:bg-cyan-500/30">
      {/* Шапка */}
      <PageTitle 
        kicker="Silk Road Logistics" 
        title="Eurasian Corridor Management" 
        subtitle="Real-time orchestration, automated customs risk assessment, and smart CIPS settlement sync."
      />

      {/* Навигация по экранам */}
      <div className="mb-8 flex flex-wrap gap-2">
        {screens.map((screen) => (
          <button
            key={screen}
            onClick={() => setActiveScreen(screen)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-medium transition-all border",
              activeScreen === screen 
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 shadow-lg shadow-cyan-500/5" 
                : "bg-transparent text-slate-400 border-white/5 hover:bg-white/5"
            )}
          >
            {screen}
          </button>
        ))}
      </div>

      {/* Основная сетка дашборда */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Колонка 1: Модули оркестрации */}
        <Card>
          <SectionHeader icon={Network} title={activeScreen} subtitle="System status and modules" />
          <div className="mt-4 grid grid-cols-1 gap-3">
            {orchestrationModules.map(([name, status, Icon, tone]) => (
              <div key={name} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-200">{name}</span>
                </div>
                <StatusBadge tone={tone}>{status}</StatusBadge>
              </div>
            ))}
          </div>
        </Card>

        {/* Колонка 2: Мониторинг отправлений */}
        <Card>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <SectionHeader icon={Activity} title="Active Shipments" subtitle="Monitored freight" />
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">Risk {riskFilter}%</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={riskFilter} 
                onChange={(e) => setRiskFilter(Number(e.target.value))}
                className="accent-cyan-400 h-1 w-16 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Route</th>
                  <th className="pb-2 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredShipments.map((ship) => (
                  <tr key={ship.id} className="group hover:bg-white/[0.01]">
                    <td className="py-2.5 font-mono font-medium text-cyan-400">{ship.id}</td>
                    <td className="py-2.5 text-slate-300">
                      {ship.origin} <ArrowRight className="inline h-3 w-3 mx-0.5 text-slate-600" /> {ship.destination}
                    </td>
                    <td className="py-2.5">
                      <span className={cn(
                        "font-semibold",
                        ship.risk > 70 ? "text-red-400" : ship.risk > 40 ? "text-amber-400" : "text-emerald-400"
                      )}>
                        {ship.risk}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Колонка 3: Адаптивные Маршруты (Новая интеграция данных!) */}
        <Card>
          <SectionHeader icon={Route} title="Adaptive Routing" subtitle="Corridor alternatives and benchmarks" />
          <div className="mt-4 grid grid-cols-1 gap-3">
            {routeOptions.map(([title, time, metric, badge]) => (
              <div key={title} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-medium text-slate-200 max-w-[70%]">{title}</h4>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-md border font-medium",
                    badge === "Recommended" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" : "bg-amber-500/10 border-amber-500/20 text-amber-300"
                  )}>{badge}</span>
                </div>
                <div className="flex gap-4 text-[11px] font-mono text-slate-400">
                  <div>ETA: <span className="text-white font-semibold">{time}</span></div>
                  <div>Efficiency: <span className="text-emerald-400 font-semibold">{metric}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Нижняя широкая карточка: Финансовые расчеты CIPS (Новая интеграция данных!) */}
        <Card className="lg:col-span-3">
          <SectionHeader icon={Landmark} title="CIPS / e-CNY Settlement Synchronizer" subtitle="Cross-border cleared liquidity & corridor channels" />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-3 font-medium">Tx ID</th>
                  <th className="pb-3 font-medium">Volume</th>
                  <th className="pb-3 font-medium">Channel</th>
                  <th className="pb-3 font-medium">Operational Directive</th>
                  <th className="pb-3 font-medium text-right">Performance Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                {paymentRows.map(([id, volume, channel, directive, gain]) => (
                  <tr key={id} className="hover:bg-white/[0.01]">
                    <td className="py-3 text-cyan-400 font-semibold">{id}</td>
                    <td className="py-3 text-slate-200 font-bold">{volume}</td>
                    <td className="py-3"><span className="bg-slate-800 border border-white/10 px-2 py-0.5 rounded text-slate-300">{channel}</span></td>
                    <td className="py-3 text-slate-400 font-sans">{directive}</td>
                    <td className="py-3 text-emerald-400 text-right font-semibold">{gain}</td>
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