import { create } from "zustand";
import { persist } from "zustand/middleware";
import { format } from "date-fns";
import { mockEntries } from "../data/mockData";

export const useVehicleStore = create(
  persist(
    (set) => ({
      entries: mockEntries, // Fallback mock data if store is empty
      selectedDate: format(new Date(), "yyyy-MM-dd"),
      globalGate: "Gate 1",

      addEntry: (entry) => set((state) => ({ 
        entries: [entry, ...state.entries] 
      })),
      
      updateEntry: (id, updatedData) => set((state) => ({
        entries: state.entries.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
      })),
      
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((e) => e.id !== id)
      })),
      
      setSelectedDate: (dateStr) => set({ selectedDate: dateStr }),
      setGlobalGate: (gateName) => set({ globalGate: gateName }),
    }),
    {
      name: "uvt-store",
    }
  )
);
