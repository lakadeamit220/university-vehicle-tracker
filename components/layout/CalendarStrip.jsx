"use client";

import { useEffect, useRef } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { get14DayRange } from "@/lib/dateUtils";

export default function CalendarStrip() {
  const { selectedDate, setSelectedDate } = useVehicleStore();
  const days = get14DayRange();
  const scrollContainerRef = useRef(null);
  
  // Quick auto-scroll to center the active date on mount or date change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(".active-date");
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedDate]);

  return (
    <div className="bg-white py-3 border-b border-border-color">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-3 px-4 pb-2 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />
        
        {days.map((item) => {
          const isActive = item.dateStr === selectedDate;
          
          return (
            <button
              key={item.dateStr}
              onClick={() => setSelectedDate(item.dateStr)}
              className={`snap-center flex flex-col items-center justify-center min-w-[3.5rem] p-2 rounded-xl border transition-all ${
                isActive 
                  ? "bg-primary text-white border-primary active-date shadow-sm scale-105" 
                  : "bg-white text-foreground border-border-color hover:bg-gray-50 active:scale-95"
              }`}
            >
              <span className={`text-xs ${isActive ? "text-blue-100" : "text-muted"}`}>
                {item.dayOfWeek}
              </span>
              <span className="text-lg font-bold mt-0.5">
                {item.dayNumber}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
