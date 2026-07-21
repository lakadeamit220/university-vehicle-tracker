"use client";

import { useVehicleStore } from "@/store/vehicleStore";
import { format } from "date-fns";

export default function Header() {
  const { globalGate, setGlobalGate } = useVehicleStore();
  const todayFormatted = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <header className="px-4 py-4 bg-white border-b border-border-color sticky top-0 z-10">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-primary tracking-tight">UniTracker</h1>
        <select
          value={globalGate}
          onChange={(e) => setGlobalGate(e.target.value)}
          className="bg-gray-50 border border-border-color text-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary block px-2 py-1.5 text-foreground cursor-pointer font-medium"
        >
          <option value="Gate 1">Gate 1</option>
          <option value="Gate 2">Gate 2</option>
          <option value="Gate 3">Gate 3</option>
          <option value="Main Gate">Main Gate</option>
        </select>
      </div>
      <p className="text-xs text-muted font-medium">{todayFormatted}</p>
    </header>
  );
}
