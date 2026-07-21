"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import CalendarStrip from "@/components/layout/CalendarStrip";
import StatsCards from "@/components/layout/StatsCards";
import BottomNav from "@/components/layout/BottomNav";
import TimeSlotGroup from "@/components/vehicles/TimeSlotGroup";
import VehicleForm from "@/components/vehicles/VehicleForm";
import Modal from "@/components/ui/Modal";
import { useVehicleStore } from "@/store/vehicleStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { groupByTimeSlot } from "@/lib/dateUtils";
import { Search, Inbox } from "lucide-react";

export default function Dashboard() {
  const isHydrated = useStoreHydration();
  const { entries, selectedDate } = useVehicleStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Filter entries for selected date
  const todaysEntries = useMemo(() => {
    if (!isHydrated) return [];
    return entries.filter(e => e.date === selectedDate);
  }, [entries, selectedDate, isHydrated]);

  // Apply search query
  const filteredEntries = useMemo(() => {
    if (!searchQuery) return todaysEntries;
    const lowerQ = searchQuery.toLowerCase();
    return todaysEntries.filter(e => 
      e.licensePlate.toLowerCase().includes(lowerQ) || 
      (e.visitorName && e.visitorName.toLowerCase().includes(lowerQ))
    );
  }, [todaysEntries, searchQuery]);

  // Group by Morning/Afternoon/Evening
  const groupedEntries = useMemo(() => {
    return groupByTimeSlot(filteredEntries);
  }, [filteredEntries]);

  const handleOpenEdit = (entry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      <Header />
      <CalendarStrip />
      
      <StatsCards entries={todaysEntries} />

      <main className="px-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search by license plate or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-foreground"
          />
        </div>

        {/* Entry List */}
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted">
            <Inbox className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-foreground">No vehicles found</p>
            <p className="text-sm mt-1 text-center">
              {searchQuery 
                ? "Try a different search term" 
                : "Tap the + button to log a vehicle"}
            </p>
          </div>
        ) : (
          <div>
            <TimeSlotGroup title="Morning" entries={groupedEntries.Morning} onEdit={handleOpenEdit} />
            <TimeSlotGroup title="Afternoon" entries={groupedEntries.Afternoon} onEdit={handleOpenEdit} />
            <TimeSlotGroup title="Evening" entries={groupedEntries.Evening} onEdit={handleOpenEdit} />
          </div>
        )}
      </main>

      <BottomNav onOpenLogModal={handleOpenNew} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingEntry ? "Edit Log Entry" : "New Log Entry"}
      >
        <VehicleForm 
          initialData={editingEntry} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
