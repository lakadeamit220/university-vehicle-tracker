"use client";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { format, parseISO } from "date-fns";
import { Edit2, Trash2, Lock } from "lucide-react";
import { useVehicleStore } from "@/store/vehicleStore";
import toast from "react-hot-toast";

export default function VehicleCard({ entry, onEdit }) {
  const { deleteEntry } = useVehicleStore();

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const isLocked = entry.date < todayStr;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the log for ${entry.licensePlate}?`)) {
      deleteEntry(entry.id);
      toast.success("Entry deleted");
    }
  };

  const formattedTime = format(parseISO(entry.timestamp), "h:mm a");
  
  // Choose badge color based on properties
  const typeColor = ["Bike", "Scooter"].includes(entry.vehicleType) ? "yellow" : "gray";
  const purposeColor = entry.purpose === "Visitor" ? "purple" : "blue";
  const statusColor = entry.status === "Entered" ? "green" : "red";

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow relative overflow-hidden group">
      {/* Visual status indicator bar on left edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${entry.status === "Entered" ? "bg-emerald-500" : "bg-red-500"}`} />
      
      <div className="flex justify-between items-start pl-2">
        <div>
          <h3 className={`text-xl font-extrabold text-foreground tracking-tight flex items-center ${isLocked ? 'line-through opacity-60' : ''}`}>
            {entry.licensePlate}
            {isLocked && <Lock className="w-4 h-4 ml-2 text-muted" />}
          </h3>
          <p className="text-xs text-muted font-medium mt-0.5">
            {formattedTime} • {entry.gateNumber}
          </p>
        </div>
        {isLocked ? (
          <span className="text-xs font-semibold text-muted bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider self-start mt-1 mr-1">Locked</span>
        ) : (
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(entry)}
              className="p-2 text-muted hover:text-primary hover:bg-blue-50 rounded-full transition-colors"
              aria-label="Edit entry"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-muted hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3 pl-2">
        <Badge color={statusColor}>{entry.status}</Badge>
        <Badge color={typeColor}>{entry.vehicleType}</Badge>
        <Badge color={purposeColor}>{entry.purpose}</Badge>
      </div>

      {(entry.visitorName || entry.notes) && (
        <div className="mt-3 pl-2 pt-3 border-t border-border-color/50">
          {entry.visitorName && (
            <p className="text-sm text-foreground">
              <span className="text-muted font-medium mr-1">Name:</span> {entry.visitorName}
            </p>
          )}
          {entry.notes && (
            <p className="text-sm text-muted italic mt-1">
              "{entry.notes}"
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
