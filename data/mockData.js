import { format, subDays, set } from "date-fns";

const today = new Date();
const yesterday = subDays(today, 1);

function createMockTime(baseDate, hour, minute) {
  return set(baseDate, { hours: hour, minutes: minute }).toISOString();
}

export const mockEntries = [
  // Today's entries
  {
    id: "1",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 8, 15),
    licensePlate: "MH12AB1234",
    vehicleType: "Car",
    purpose: "Staff",
    gateNumber: "Gate 1",
    visitorName: "John Doe",
    notes: "Regular staff member",
    status: "Entered"
  },
  {
    id: "2",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 9, 30),
    licensePlate: "KA05XYZ999",
    vehicleType: "Bike",
    purpose: "Student",
    gateNumber: "Gate 2",
    visitorName: "Alice Smith",
    notes: "",
    status: "Entered"
  },
  {
    id: "3",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 11, 45),
    licensePlate: "DL01GH5555",
    vehicleType: "Truck",
    purpose: "Delivery",
    gateNumber: "Gate 1",
    visitorName: "Bob The Builder",
    notes: "Amazon Delivery",
    status: "Exited"
  },
  {
    id: "4",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 14, 10),
    licensePlate: "MH14QR7890",
    vehicleType: "Scooter",
    purpose: "Visitor",
    gateNumber: "Gate 1",
    visitorName: "Charlie Brown",
    notes: "Visiting Admin Block",
    status: "Entered"
  },
  {
    id: "5",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 18, 5),
    licensePlate: "TS09PO1111",
    vehicleType: "Bus",
    purpose: "Other",
    gateNumber: "Gate 2",
    visitorName: "University Bus",
    notes: "Evening Drop-off",
    status: "Entered"
  },
  // Yesterday's entries
  {
    id: "6",
    date: format(yesterday, "yyyy-MM-dd"),
    timestamp: createMockTime(yesterday, 10, 20),
    licensePlate: "MH12XY4321",
    vehicleType: "Car",
    purpose: "Faculty",
    gateNumber: "Gate 1",
    visitorName: "Dr. Who",
    notes: "Guest Lecturer",
    status: "Exited"
  },
  {
    id: "7",
    date: format(yesterday, "yyyy-MM-dd"),
    timestamp: createMockTime(yesterday, 16, 40),
    licensePlate: "KA01AB8888",
    vehicleType: "Bike",
    purpose: "Student",
    gateNumber: "Gate 2",
    visitorName: "Eve",
    notes: "",
    status: "Exited"
  }
];
