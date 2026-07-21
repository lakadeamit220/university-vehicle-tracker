"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, BarChart2, Plus } from "lucide-react";

export default function BottomNav({ onOpenLogModal }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "History", href: "/history", icon: List },
    { name: "Stats", href: "/stats", icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-color z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto relative px-2">
        
        {/* Dashboard */}
        <NavItem item={navItems[0]} isActive={pathname === navItems[0].href} />
        
        {/* Spacer for FAB */}
        <div className="w-20 flex-shrink-0" />
        
        {/* History & Stats */}
        <NavItem item={navItems[1]} isActive={pathname === navItems[1].href} />
        <NavItem item={navItems[2]} isActive={pathname === navItems[2].href} />

        {/* Floating Action Button (FAB) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3">
          <button
            onClick={onOpenLogModal}
            className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-blue-500/30 hover:bg-primary-hover active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-primary/30"
            aria-label="Add Log Entry"
          >
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ item, isActive }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 ${
        isActive ? "text-primary" : "text-muted hover:text-foreground transition-colors"
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? "fill-primary/10" : ""}`} />
      <span className="text-[10px] font-medium">{item.name}</span>
    </Link>
  );
}
