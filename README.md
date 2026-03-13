# HRMS Lite — Frontend

Production-ready frontend for HRMS Lite built with React and Vite.

## Live Demo
https://hrms-lite-client-v1-jdt25et00-mukul-bairwa-codez9s-projects.vercel.app

## Tech Stack
- React 18 + Vite
- Tailwind CSS v3
- shadcn/ui + Radix UI
- React Router DOM v6
- Axios
- React Hot Toast
- Deployed on Vercel

## Features
- ✅ Employee Management — Add, View, Delete
- ✅ Attendance Tracking — Mark Present/Absent
- ✅ Filter by employee and date range
- ✅ Dashboard with today's summary stats
- ✅ Total present days per employee
- ✅ Loading, empty and error states
- ✅ Form validation with error messages
- ✅ Toast notifications
- ✅ Dark theme UI

## Run Locally
```bash
git clone https://github.com/Mukul-bairwa-codeZ9/hrms-lite-client-v1.git
cd hrms-lite-client-v1
npm install
cp .env.example .env
# Add backend URL to .env
npm run dev
```

## Environment Variables
```
VITE_API_URL=http://localhost:5000/api
```

## Assumptions
- Single admin user — no authentication
- Backend on Render free tier — first load may take 30-50 seconds