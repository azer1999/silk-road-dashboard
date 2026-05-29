import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
