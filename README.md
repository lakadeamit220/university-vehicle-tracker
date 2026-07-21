# University Vehicle Tracker

A mobile-first Progressive Web App (PWA) designed for university gate staff to quickly register and track incoming/outgoing vehicles with live statistics, history, and CSV export capabilities.

## Features

- **Quick Logging:** Fast vehicle entry form with auto-uppercase license plates and categorical tagging (Vehicle Type, Purpose).
- **Gate Tagging:** Support for multiple gates (Gate 1, Gate 2, Main Gate).
- **Time Slots:** Automatically groups daily logs into Morning, Afternoon, and Evening slots.
- **Live Dashboard:** Daily summary cards (Total, Cars, 2-Wheelers, Visitors) and real-time search.
- **History & Export:** Full historical log view with the ability to export data to CSV.
- **Data Visualization:** Built-in charts (Bar and Pie) to analyze 7-day traffic trends and daily vehicle distributions.
- **Offline-Ready PWA:** Installable as an app on iOS/Android home screens, backed by local storage and service workers.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand (with `localStorage` persistence)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts
- **CSV Export:** PapaParse
- **PWA:** @ducanh2912/next-pwa

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Deployment

This app is optimized for seamless deployment on **Vercel**. 

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect the Next.js framework and build it successfully. No additional environment variables are required out-of-the-box.
