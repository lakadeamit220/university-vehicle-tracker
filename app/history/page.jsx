"use client";

import { useState, useMemo } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import { exportToCSV } from "@/lib/exportUtils";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleForm from "@/components/vehicles/VehicleForm";
import Modal from "@/components/ui/Modal";
import BottomNav from "@/components/layout/BottomNav";
import Button from "@/components/ui/Button";
import { Search, Download } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { format, parseISO } from "date-fns";

export default function HistoryPage() {
  const isHydrated = useStoreHydration();
  const { entries } = useVehicleStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Search logic
  const filteredEntries = useMemo(() => {
    if (!isHydrated) return [];
    if (!searchQuery) return entries;
    const lower = searchQuery.toLowerCase();
    return entries.filter(e => 
      e.licensePlate.toLowerCase().includes(lower) || 
      (e.visitorName && e.visitorName.toLowerCase().includes(lower)) ||
      e.gateNumber.toLowerCase().includes(lower) ||
      e.vehicleType.toLowerCase().includes(lower) ||
      e.purpose.toLowerCase().includes(lower)
    );
  }, [entries, searchQuery, isHydrated]);

  // Group by date (descending)
  const groupedByDate = useMemo(() => {
    const groups = {};
    filteredEntries.forEach(entry => {
      if (!groups[entry.date]) groups[entry.date] = [];
      groups[entry.date].push(entry);
    });
    
    // Sort dates descending
    return Object.keys(groups).sort((a, b) => b.localeCompare(a)).map(date => ({
      date,
      displayDate: format(parseISO(date), "EEEE, MMM do, yyyy"),
      items: groups[date].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    }));
  }, [filteredEntries]);

  const handleExport = () => {
    // Export raw filtered entries, omit some fields if necessary
    const exportData = filteredEntries.map(({ id, ...rest }) => rest);
    exportToCSV(exportData, "UniTracker_History");
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
      <header className="px-4 py-4 bg-white border-b border-border-color sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-foreground">Log History</h1>
        <Button variant="secondary" size="sm" onClick={handleExport} disabled={filteredEntries.length === 0} className="text-sm py-1.5 px-3">
          <Download className="w-4 h-4 mr-1.5" /> Export
        </Button>
      </header>

      <main className="px-4 mt-4">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search all records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-color rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm text-foreground"
          />
        </div>

        {groupedByDate.length === 0 ? (
          <EmptyState title="No records found" message="No historical logs match your criteria." />
        ) : (
          <div className="space-y-6">
            {groupedByDate.map((group) => (
              <div key={group.date}>
                <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-3 pl-1">
                  {group.displayDate} <span className="lowercase normal-case font-normal">({group.items.length})</span>
                </h2>
                <div className="space-y-3">
                  {group.items.map(entry => (
                    <VehicleCard 
                      key={entry.id} 
                      entry={entry} 
                      onEdit={(e) => { setEditingEntry(e); setIsModalOpen(true); }} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav onOpenLogModal={() => { setEditingEntry(null); setIsModalOpen(true); }} />

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
