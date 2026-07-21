"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useVehicleStore } from "@/store/vehicleStore";

const vehicleSchema = z.object({
  licensePlate: z.string().min(2, "Required").max(20, "Too long"),
  vehicleType: z.enum(["Car", "Bike", "Scooter", "Bus", "Truck", "Other"]),
  purpose: z.enum(["Student", "Staff", "Visitor", "Delivery", "Faculty", "Other"]),
  visitorName: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Entered", "Exited"]),
});

export default function VehicleForm({ initialData = null, onClose }) {
  const { addEntry, updateEntry, selectedDate, globalGate } = useVehicleStore();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData || {
      licensePlate: "",
      vehicleType: "Car",
      purpose: "Visitor",
      visitorName: "",
      notes: "",
      status: "Entered",
    },
  });

  // Force uppercase for license plate
  const licensePlateVal = watch("licensePlate");
  useEffect(() => {
    if (licensePlateVal && licensePlateVal !== licensePlateVal.toUpperCase()) {
      setValue("licensePlate", licensePlateVal.toUpperCase());
    }
  }, [licensePlateVal, setValue]);

  const onSubmit = (data) => {
    try {
      if (initialData) {
        updateEntry(initialData.id, data);
        toast.success("Entry updated");
      } else {
        const newEntry = {
          ...data,
          id: crypto.randomUUID(),
          date: selectedDate,
          timestamp: new Date().toISOString(),
          gateNumber: globalGate,
        };
        addEntry(newEntry);
        toast.success("Entry logged successfully");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to save entry");
    }
  };

  const inputClass = "w-full rounded-lg border border-border-color bg-gray-50 px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-1 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelClass}>License Plate *</label>
        <input 
          {...register("licensePlate")} 
          type="text" 
          placeholder="e.g. MH12AB1234"
          className={inputClass} 
        />
        {errors.licensePlate && <p className="text-red-500 text-xs mt-1">{errors.licensePlate.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Vehicle Type *</label>
          <select {...register("vehicleType")} className={inputClass}>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Scooter">Scooter</option>
            <option value="Bus">Bus</option>
            <option value="Truck">Truck</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className={labelClass}>Status *</label>
          <select {...register("status")} className={inputClass}>
            <option value="Entered">Entered</option>
            <option value="Exited">Exited</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Purpose *</label>
        <select {...register("purpose")} className={inputClass}>
          <option value="Student">Student</option>
          <option value="Staff">Staff</option>
          <option value="Faculty">Faculty</option>
          <option value="Visitor">Visitor</option>
          <option value="Delivery">Delivery</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Visitor Name (Optional)</label>
        <input 
          {...register("visitorName")} 
          type="text" 
          placeholder="Driver or visitor name"
          className={inputClass} 
        />
      </div>

      <div>
        <label className={labelClass}>Notes (Optional)</label>
        <textarea 
          {...register("notes")} 
          rows={2}
          placeholder="Any additional details"
          className={inputClass} 
        />
      </div>

      <div className="pt-4 flex gap-3">
        <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {initialData ? "Save Changes" : "Log Entry"}
        </Button>
      </div>
    </form>
  );
}
