import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { 
  MapPin, 
  Car, 
  DollarSign, 
  ClipboardList, 
  LayoutDashboard,
  CalendarDays,
  Settings,
  Sparkles,
  UserCheck
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/admin/locations", label: "Locations", icon: MapPin },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/rates", label: "Rates", icon: DollarSign },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex antialiased selection:bg-indigo-500 selection:text-white">
      {/* Premium Sidebar */}
      <aside className="w-68 bg-slate-950 text-white flex-shrink-0 hidden md:flex flex-col relative border-r border-slate-900/50 shadow-2xl">
        {/* Subtle interior ambient glow */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        
      {/* Branding Area */}
<div className="relative p-6 border-b border-slate-900/80 flex items-center gap-3">
  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 overflow-hidden">
    <Image
      src="/images/logo-fpt-white.png"
      alt="First Paris Transfer"
      width={24}
      height={24}
      className="object-contain"
    />
  </div>
  <div>
    <h1 className="text-sm font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
      First Paris Transfer
    </h1>
    <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest mt-0.5 opacity-90">
      Operations
    </p>
  </div>
</div>

        {/* Navigation Grid */}
        <nav className="flex-1 p-4 space-y-1.5 relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-3">
            Core Modules
          </p>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/[0.04] hover:text-white border border-transparent hover:border-white/5 transition-all duration-200"
              >
                {/* Visual Icon Container */}
                <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-800 border border-slate-800 transition-colors">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-105" />
                </div>
                <span className="tracking-wide group-hover:translate-x-0.5 transition-transform">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Identity Hub */}
        <div className="p-4 border-t border-slate-900/80 bg-slate-950/40 relative z-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Authenticated</p>
              <p className="text-xs text-slate-300 truncate font-mono mt-0.5" title={session.user?.email ?? ""}>
                {session.user?.email}
              </p>
            </div>
          </div>
          
          <div className="group-logout-wrapper">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Stream Window Canvas */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto bg-gradient-to-tr from-slate-100 via-slate-50 to-white/60">
        <div className="max-w-[1400px] mx-auto animate-in fade-in duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}