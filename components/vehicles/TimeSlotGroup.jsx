"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Sun, Sunset, Moon, LayoutList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleCard from "./VehicleCard";

const icons = {
  "Full Day": <LayoutList className="w-5 h-5 text-blue-500" />,
  Morning: <Sun className="w-5 h-5 text-amber-500" />,
  Afternoon: <Sunset className="w-5 h-5 text-orange-500" />,
  Evening: <Moon className="w-5 h-5 text-indigo-500" />
};

export default function TimeSlotGroup({ title, entries, onEdit }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!entries || entries.length === 0) return null;

  return (
    <div className="mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 px-1 mb-2 focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          {icons[title]}
          <h2 className="text-lg font-bold text-foreground">
            {title} <span className="text-muted text-sm font-medium ml-1">({entries.length})</span>
          </h2>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pb-2">
              <AnimatePresence>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VehicleCard entry={entry} onEdit={onEdit} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
