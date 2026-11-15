# CivicSense 🏛️📍
### AI-Powered Civic Issue Reporting & Redressal Platform

CivicSense is a modern civic-tech startup frontend MVP built with **React**, **Vite**, **Tailwind CSS**, and **React Leaflet**. Designed primarily for urban India (Delhi, Noida, Ghaziabad, and NCR), it provides an intuitive, high-transparency platform for citizens to discover, report, and monitor civic issues.

---

## 🌟 Key Features

### 1. Home Screen (`/`)
- **Interactive OpenStreetMap with Leaflet:** Category-colored pins with pulsing beacons. Clicking any pin zooms in and displays incident details.
- **Dynamic Views:** Toggle between **Split View** (Map + Cards side-by-side), **Full Map**, or **Card Grid**.
- **Real-Time Search & Multi-level Filtering:** Search by keyword, locality, or reference ID. Filter by category, status (*Reported*, *In Progress*, *Resolved*), or NCR hub (*Noida*, *Ghaziabad*, *Central Delhi*, *South Delhi*).
- **Citizen Endorsement (Upvotes):** Upvote issues to simulate raising municipal priority.
- **Detailed Audit Modal:** Inspect assigned municipal departments, junior engineer notes, and full 3-stage timeline.
- **Recently Reported Feed:** Real-time ticker showing new nearby reports.

### 2. Report Issue Screen (`/report`)
- **Drag-and-Drop Image Uploader:** Supports local file uploads, previews, replace, and removal.
- **Quick Sample Photo Presets:** 1-click test photos for Potholes, Garbage Dumps, Streetlights, and Water Leaks.
- **Vision AI Badge:** Simulated AI confidence score and hazard severity rating.
- **Interactive Map Pin Picker:** Click anywhere on the map to set exact coordinates and address.
- **Delhi NCR Quick Locality Presets:** Indirapuram, Sector 62 Noida, Connaught Place, and Raj Nagar Extension.
- **Simulated Municipal Dispatch:** Multi-step loading animation (*AI scanning* ➔ *Ward triage* ➔ *Ticket generation*).
- **Success Modal:** Generates an official tracking ID (e.g., `#CS-2026-DEL-8942`) and saves to `localStorage`.

### 3. Track Issues Screen (`/track`)
- **My Submitted Reports:** View all complaints submitted by the current user.
- **Scope Toggle:** Switch between *My Reports* and *All Ward Issues*.
- **3-Stage Visual Progress Tracker:** *Reported* ➔ *In Progress* ➔ *Resolved* with live municipal update notes.
- **Filter Tabs:** Quickly view *Active / In Progress* vs *Resolved* complaints.
- **Zero-State Handler:** Clean, user-friendly empty state with a call to action.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Color Palette & Design
- **Primary:** Deep Navy Blue (`#142B4A`)
- **Secondary:** Electric Blue (`#2563EB`)
- **Background:** Off-white (`#F8FAFC`)
- **Cards:** Crisp White (`#FFFFFF`)
- **Text:** Dark Slate (`#1E293B`)
- **Categories:**
  - Roads & Potholes: `#EA580C`
  - Garbage & Sanitation: `#D97706`
  - Streetlights: `#CA8A04`
  - Water Supply: `#0284C7`
  - Public Infrastructure: `#7C3AED`
