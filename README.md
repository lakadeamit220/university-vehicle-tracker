# University Vehicle Tracker

![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A blazing-fast, mobile-first Progressive Web App (PWA) designed to replace physical logbooks at university security gates. It allows gate staff to quickly register, track, and analyze incoming and outgoing vehicles—all directly from their smartphones, even on spotty internet connections.

**Live Application:** [https://university-vehicle-tracker.vercel.app/](https://university-vehicle-tracker.vercel.app/)

---

## The Problem vs. The Solution

**The Problem:** Traditional security gates use large physical paper registers. These are slow to write in, prone to human error, impossible to search quickly, and provide zero analytical insights to administration (e.g., peak hours, visitor volume).

**The Solution:** This digital tracker provides a sleek, one-handed mobile interface. It uses localized browser storage (`localStorage`) to guarantee the app runs instantly and perfectly offline. At the end of the month, administrators can export everything to CSV with a single click.

---

## Key Features

- **Lightning Fast Logging:** Optimized entry form forces uppercase license plates and uses smart defaults (Vehicle Type, Purpose) to get cars through the gate faster.
- **PWA (Progressive Web App):** Installable directly to iOS/Android home screens. It behaves exactly like a native app (no browser bars, fullscreen).
- **Automatic Data Integrity:** Logs from previous days are automatically "locked" (read-only with strikethrough text) preventing accidental historical modifications.
- **Live Dashboard & Analytics:** Real-time daily summary cards, plus a dedicated Stats page with Recharts (Bar/Pie charts) to analyze 7-day traffic trends.
- **Smart Time Grouping:** Automatically groups daily logs into Full Day, Morning, Afternoon, and Evening slots based on the entry timestamp.
- **Offline-Ready Architecture:** Built on Zustand with LocalStorage persistence. No slow database calls—everything is saved instantly to the device.
- **CSV Export:** Full historical log view with a 1-click export to Excel-ready CSV via PapaParse.

---

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts
- **PWA:** `@ducanh2912/next-pwa`

---

## How to Run Locally

Want to run this project on your own machine? It takes less than 2 minutes.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Step-by-Step Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lakadeamit220/university-vehicle-tracker.git
   cd university-vehicle-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the app:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000). 
   
   > **Pro Tip:** To get the full intended experience, open Chrome DevTools (`F12`), click the "Toggle Device Toolbar" icon (`Ctrl+Shift+M`), and view the app in mobile dimensions.

---

## How to Use the App

1. **Change Gates:** Use the dropdown in the top right corner to select which gate you are operating (Gate 1, Gate 2, Main Gate).
2. **Log a Vehicle:** Tap the large blue `+` button at the bottom center of the screen to open the logging form. Fill out the license plate (it auto-capitalizes) and hit Save.
3. **Edit / Delete:** Tap the pencil or trash can icons on any vehicle card to modify it. (Note: Only today's logs can be edited. Past logs are locked).
4. **View History:** Navigate to the History tab on the bottom bar to see all logs ever recorded, and click the Export button to download them as a CSV.
5. **View Stats:** Navigate to the Stats tab to see visual breakdowns of the traffic volume over the last 7 days.

---

## Deployment

This application is fully optimized for zero-config deployment on **Vercel**.

1. Create a free account on [Vercel](https://vercel.com/).
2. Click **Add New -> Project**.
3. Import your GitHub repository.
4. Leave all default settings (Vercel automatically detects Next.js) and click **Deploy**.

Within seconds, you will have a live, globally distributed PWA. No environment variables or database setups are required.
