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
    visitorName: "Amit Lakade",
    notes: "Regular staff member",
    status: "Entered"
  },
  {
    id: "2",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 9, 30),
    licensePlate: "MH12FZ9999",
    vehicleType: "Bike",
    purpose: "Student",
    gateNumber: "Gate 2",
    visitorName: "Pooja Patil",
    notes: "",
    status: "Entered"
  },
  {
    id: "3",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 11, 45),
    licensePlate: "MH14KX5555",
    vehicleType: "Truck",
    purpose: "Delivery",
    gateNumber: "Gate 1",
    visitorName: "Sagar Kadam",
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
    visitorName: "Rahul Deshmukh",
    notes: "Visiting Admin Block",
    status: "Entered"
  },
  {
    id: "5",
    date: format(today, "yyyy-MM-dd"),
    timestamp: createMockTime(today, 18, 5),
    licensePlate: "MH12BU1111",
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
    visitorName: "Dr. Avinash Deore",
    notes: "Guest Lecturer",
    status: "Exited"
  },
  {
    id: "7",
    date: format(yesterday, "yyyy-MM-dd"),
    timestamp: createMockTime(yesterday, 16, 40),
    licensePlate: "MH12PK8888",
    vehicleType: "Bike",
    purpose: "Student",
    gateNumber: "Gate 2",
    visitorName: "Neha Shinde",
    notes: "",
    status: "Exited"
  }
];
