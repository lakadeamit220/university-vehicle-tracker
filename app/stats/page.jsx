"use client";

import { useMemo, useState } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import BottomNav from "@/components/layout/BottomNav";
import VehicleForm from "@/components/vehicles/VehicleForm";
import Modal from "@/components/ui/Modal";
import Card from "@/components/ui/Card";
import { get14DayRange, getTimeSlot } from "@/lib/dateUtils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { format, parseISO } from "date-fns";

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export default function StatsPage() {
  const isHydrated = useStoreHydration();
  const { entries, selectedDate } = useVehicleStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Chart 1: Entries by Day (last 7 days)
  const barChartData = useMemo(() => {
    if (!isHydrated) return [];
    const days = get14DayRange().filter((_, i) => i >= 1 && i <= 7);
    
    return days.map(dayObj => {
      const count = entries.filter(e => e.date === dayObj.dateStr).length;
      return {
        name: dayObj.dayOfWeek,
        date: dayObj.dateStr,
        count
      };
    });
  }, [entries, isHydrated]);

  // Chart 2: Vehicle Type Distribution for selected date
  const pieChartData = useMemo(() => {
    if (!isHydrated) return [];
    const todaysEntries = entries.filter(e => e.date === selectedDate);
    
    const counts = {};
    todaysEntries.forEach(e => {
      counts[e.vehicleType] = (counts[e.vehicleType] || 0) + 1;
    });

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    })).sort((a, b) => b.value - a.value);
  }, [entries, selectedDate, isHydrated]);

  // Quick stats
  const quickStats = useMemo(() => {
    if (!isHydrated || entries.length === 0) return { peakSlot: "-", busiestGate: "-" };
    
    // Busiest gate overall
    const gateCounts = {};
    // Peak hour overall
    const slotCounts = { Morning: 0, Afternoon: 0, Evening: 0 };
    
    entries.forEach(e => {
      gateCounts[e.gateNumber] = (gateCounts[e.gateNumber] || 0) + 1;
      const slot = getTimeSlot(e.timestamp);
      slotCounts[slot]++;
    });

    const busiestGate = Object.keys(gateCounts).reduce((a, b) => gateCounts[a] > gateCounts[b] ? a : b, "-");
    const peakSlot = Object.keys(slotCounts).reduce((a, b) => slotCounts[a] > slotCounts[b] ? a : b, "-");

    return { busiestGate, peakSlot };
  }, [entries, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="px-4 py-4 bg-white border-b border-border-color sticky top-0 z-10">
        <h1 className="text-xl font-bold text-foreground">Statistics & Insights</h1>
      </header>

      <main className="px-4 mt-4 space-y-4">
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="flex flex-col items-center text-center p-3">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Busiest Gate</span>
            <span className="text-lg font-bold text-primary">{quickStats.busiestGate}</span>
          </Card>
          <Card className="flex flex-col items-center text-center p-3">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Peak Time</span>
            <span className="text-lg font-bold text-amber-600">{quickStats.peakSlot}</span>
          </Card>
        </div>

        <Card className="pt-5 pb-2">
          <h2 className="text-sm font-bold text-foreground mb-4 px-2">Last 7 Days Traffic</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="pt-5 pb-2">
          <h2 className="text-sm font-bold text-foreground mb-2 px-2">
            Vehicle Types <span className="text-muted font-normal">({format(parseISO(selectedDate), "MMM d")})</span>
          </h2>
          
          {pieChartData.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-sm text-muted">
              No data for selected date
            </div>
          ) : (
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </main>

      <BottomNav onOpenLogModal={() => setIsModalOpen(true)} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="New Log Entry"
      >
        <VehicleForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
