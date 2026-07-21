"use client";

import Card from "@/components/ui/Card";
import { Car, Bike, Users } from "lucide-react";

export default function StatsCards({ entries = [] }) {
  const total = entries.length;
  const cars = entries.filter((e) => e.vehicleType === "Car").length;
  const bikes = entries.filter((e) => e.vehicleType === "Bike" || e.vehicleType === "Scooter").length;
  const visitors = entries.filter((e) => e.purpose === "Visitor").length;

  return (
    <div className="px-4 py-4">
      <div 
        className="flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />

        <Card className="min-w-[130px] snap-center flex-shrink-0 bg-blue-50 border-blue-100 flex flex-col justify-center">
          <p className="text-sm font-medium text-blue-700">Total Logs</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">{total}</p>
        </Card>

        <Card className="min-w-[120px] snap-center flex-shrink-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium text-foreground">Cars</span>
            <Car className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{cars}</p>
        </Card>

        <Card className="min-w-[120px] snap-center flex-shrink-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium text-foreground">2-Wheelers</span>
            <Bike className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{bikes}</p>
        </Card>
        
        <Card className="min-w-[120px] snap-center flex-shrink-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="text-sm font-medium text-foreground">Visitors</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">{visitors}</p>
        </Card>
      </div>
    </div>
  );
}
