import { addDays, format, getHours, parseISO } from "date-fns";

export function get14DayRange() {
  const today = new Date();
  const range = [];
  // 7 days past, today, 6 days future
  for (let i = -7; i <= 6; i++) {
    const d = addDays(today, i);
    range.push({
      date: d,
      dateStr: format(d, "yyyy-MM-dd"),
      dayOfWeek: format(d, "EEE"), // Mon, Tue
      dayNumber: format(d, "d"),   // 1, 2, 31
    });
  }
  return range;
}

export function getTimeSlot(timestamp) {
  const dateObj = typeof timestamp === "string" ? parseISO(timestamp) : timestamp;
  const hour = getHours(dateObj);
  
  if (hour >= 0 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 18) return "Afternoon";
  return "Evening";
}

export function groupByTimeSlot(entries) {
  const groups = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  entries.forEach(entry => {
    const slot = getTimeSlot(entry.timestamp);
    groups[slot].push(entry);
  });

  return groups;
}
