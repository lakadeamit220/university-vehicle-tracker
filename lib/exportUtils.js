import Papa from "papaparse";
import { format } from "date-fns";

export function exportToCSV(data, filename = "vehicle_logs") {
  if (!data || data.length === 0) return;

  const csv = Papa.unparse(data, {
    quotes: true, 
    header: true,
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  
  // Append current date to filename
  const dateStr = format(new Date(), "yyyy-MM-dd_HH-mm");
  link.setAttribute("download", `${filename}_${dateStr}.csv`);
  
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
