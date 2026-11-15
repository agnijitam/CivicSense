export const CATEGORIES = [
  {
    id: 'roads_potholes',
    label: 'Roads & Potholes',
    icon: 'AlertTriangle',
    color: '#EA580C',
    bgLight: '#FFF7ED',
    borderLight: '#FDBA74',
    description: 'Cratered roads, dangerous potholes, uneven road resurfacing'
  },
  {
    id: 'garbage_sanitation',
    label: 'Garbage & Sanitation',
    icon: 'Trash2',
    color: '#D97706',
    bgLight: '#FEF3C7',
    borderLight: '#FCD34D',
    description: 'Overflowing dumpsters, illegal waste dumping, uncollected litter'
  },
  {
    id: 'streetlights',
    label: 'Streetlights',
    icon: 'Lightbulb',
    color: '#CA8A04',
    bgLight: '#FEFCE8',
    borderLight: '#FDE047',
    description: 'Broken lamps, dark street stretches, flickering high masts'
  },
  {
    id: 'water_supply',
    label: 'Water Supply & Leakage',
    icon: 'Droplets',
    color: '#0284C7',
    bgLight: '#F0F9FF',
    borderLight: '#BAE6FD',
    description: 'Pipeline bursts, contaminated tap supply, urban waterlogging'
  },
  {
    id: 'public_infrastructure',
    label: 'Public Infrastructure',
    icon: 'Building2',
    color: '#7C3AED',
    bgLight: '#F5F3FF',
    borderLight: '#DDD6FE',
    description: 'Broken footpaths, damaged bus shelters, open manholes'
  },
  {
    id: 'other',
    label: 'Other Civic Issue',
    icon: 'HelpCircle',
    color: '#64748B',
    bgLight: '#F8FAFC',
    borderLight: '#CBD5E1',
    description: 'Noise pollution, stray animal hazards, encroachment'
  }
];

export const STATUS_LIST = [
  { id: 'Reported', label: 'Reported', color: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
  { id: 'In Progress', label: 'In Progress', color: 'bg-orange-100 text-orange-800 border-orange-300', dot: 'bg-orange-600' },
  { id: 'Resolved', label: 'Resolved', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-600' }
];

export const INITIAL_ISSUES = [
  {
    id: 'CS-2026-GZB-1042',
    title: 'Severe Deep Pothole on Main Link Road near Shipra Mall',
    description: 'A crater-sized pothole spanning approximately 1.5 meters across has formed right at the exit turn toward Shipra Mall on the Indirapuram main corridor. Two two-wheelers skidded last evening during rainfall. Urgent bitumen patch repair required.',
    category: 'roads_potholes',
    status: 'In Progress',
    location: 'Indirapuram Main Road, near Shipra Mall, Ghaziabad, Uttar Pradesh',
    lat: 28.6434,
    lng: 77.3711,
    reportedAt: '2026-11-14T09:30:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    upvotes: 42,
    hasUpvoted: false,
    isUserSubmitted: true,
    department: 'Ghaziabad Nagar Nigam - Civil Works Division',
    ward: 'Indirapuram Ward 14',
    estimatedResolution: 'Nov 17, 2026',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 14, 2026 · 09:30 AM',
        title: 'Citizen Complaint Registered',
        description: 'Report filed with geo-tagged photographic evidence. Complaint dispatched to Ghaziabad Nagar Nigam automated portal.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 14, 2026 · 02:15 PM',
        title: 'Municipal Junior Engineer Assigned',
        description: 'Er. R. K. Sharma (Indirapuram Zone) conducted preliminary site verification. Work order #WO-GZB-8812 issued to local road contractor.',
        status: 'current'
      },
      {
        stage: 'Resolved',
        date: 'Pending Inspection',
        title: 'Bitumen Patchwork & Verification',
        description: 'Cold-mix asphalt patching scheduled. Awaiting final quality verification by civic inspector.',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'CS-2026-NOI-8831',
    title: 'Overflowing Municipal Dumpster and Waste Spill on Service Lane',
    description: 'Community garbage dumpster adjacent to the Sector 62 IT Park market hasn’t been cleared for over 48 hours. Waste is spilling across the pedestrian sidewalk creating foul odor and blocking foot traffic.',
    category: 'garbage_sanitation',
    status: 'Reported',
    location: 'Near C-Block Market, Sector 62, Noida, Uttar Pradesh',
    lat: 28.6280,
    lng: 77.3649,
    reportedAt: '2026-11-15T08:15:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
    upvotes: 28,
    hasUpvoted: false,
    isUserSubmitted: false,
    department: 'NOIDA Authority - Public Health & Sanitation Dept',
    ward: 'Sector 62 Zone 4',
    estimatedResolution: 'Nov 16, 2026',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 15, 2026 · 08:15 AM',
        title: 'Civic Complaint Logged',
        description: 'Automated AI classification flagged as High Priority sanitation hazard. Queued for compactor truck route rescheduling.',
        status: 'current'
      },
      {
        stage: 'In Progress',
        date: 'Pending',
        title: 'Waste Lifting Crew Dispatch',
        description: 'Sanitation supervisory officer notified for emergency compactor deployment.',
        status: 'upcoming'
      },
      {
        stage: 'Resolved',
        date: 'Pending',
        title: 'Sanitized & Cleared',
        description: 'Complete waste removal followed by lime powder spraying on sidewalk.',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'CS-2026-DEL-4419',
    title: 'High-Mast Streetlight Failure at Ring Road Pedestrian Crossing',
    description: 'Four consecutive LED streetlights and the central junction high mast are completely non-functional between Lajpat Nagar Metro Station and Ring Road crossing. Major safety hazard for women commuters at night.',
    category: 'streetlights',
    status: 'Resolved',
    location: 'Ring Road Crossing, Lajpat Nagar IV, South Delhi, Delhi',
    lat: 28.5677,
    lng: 77.2433,
    reportedAt: '2026-11-11T19:40:00.000Z',
    resolvedAt: '2026-11-13T16:20:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    upvotes: 65,
    hasUpvoted: true,
    isUserSubmitted: true,
    department: 'BSES Rajdhani / MCD Central Zone Electrical Wing',
    ward: 'Ward 58-S (Lajpat Nagar)',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 11, 2026 · 07:40 PM',
        title: 'Dark Spot Grievance Registered',
        description: 'Citizen report logged with streetlight pole ID #LR-4029. High priority tag assigned.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 12, 2026 · 11:10 AM',
        title: 'Electrical Feeder Cable Repaired',
        description: 'Technician team identified underground cable fault at the transformer box. New breaker switch and 4 LED luminaires replaced.',
        status: 'completed'
      },
      {
        stage: 'Resolved',
        date: 'Nov 13, 2026 · 04:20 PM',
        title: 'Operational Verification Confirmed',
        description: 'Evening illuminance audit completed. All 4 lights along with high-mast are fully functional. Complaint closed.',
        status: 'completed'
      }
    ]
  },
  {
    id: 'CS-2026-GZB-3120',
    title: 'Drinking Water Pipeline Rupture causing Street Inundation',
    description: 'Major underground municipal water supply main line cracked near the central green park entrance. Potable water has been gushing onto the road since 6:00 AM, eroding the tarmac and wasting thousands of liters.',
    category: 'water_supply',
    status: 'In Progress',
    location: 'Near Central Park Gate 2, Raj Nagar Extension, Ghaziabad, Uttar Pradesh',
    lat: 28.7041,
    lng: 77.4412,
    reportedAt: '2026-11-15T06:45:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    upvotes: 51,
    hasUpvoted: false,
    isUserSubmitted: false,
    department: 'Uttar Pradesh Jal Nigam / Ghaziabad Water Works',
    ward: 'Raj Nagar Extension Circle',
    estimatedResolution: 'Nov 16, 2026',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 15, 2026 · 06:45 AM',
        title: 'Emergency Pipeline Leak Logged',
        description: 'Tagged under high urgency water conservation alert by CivicSense automated system.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 15, 2026 · 10:00 AM',
        title: 'Isolation Valve Closed & Excavation Underway',
        description: 'Jal Nigam maintenance crew isolated line section #RN-12. Backhoe excavator on site replacing the 150mm fractured ductile iron pipe segment.',
        status: 'current'
      },
      {
        stage: 'Resolved',
        date: 'Pending',
        title: 'Pressure Test & Road Resurfacing',
        description: 'Hydrostatic pressure test scheduled prior to backfilling trench.',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'CS-2026-DEL-1940',
    title: 'Damaged Pedestrian Footpath and Missing Grating near Metro Gate 3',
    description: 'Heavy granite pavement slabs broken and open storm drainage trench exposed right outside the metro station exit. High risk of tripping or injury for blind pedestrians and senior citizens.',
    category: 'public_infrastructure',
    status: 'Resolved',
    location: 'Inner Circle, Connaught Place, Central Delhi, Delhi',
    lat: 28.6304,
    lng: 77.2177,
    reportedAt: '2026-11-09T14:15:00.000Z',
    resolvedAt: '2026-11-12T11:30:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    upvotes: 39,
    hasUpvoted: false,
    isUserSubmitted: false,
    department: 'New Delhi Municipal Council (NDMC) - Civil Works',
    ward: 'NDMC Zone 1',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 09, 2026 · 02:15 PM',
        title: 'NDMC Urban Heritage Complaint Registered',
        description: 'Reported with photographic evidence of broken granite pavers.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 10, 2026 · 03:00 PM',
        title: 'New Cast-Iron Grating Installed',
        description: 'Masonry team replaced fractured slabs and installed anti-theft heavy-duty cast iron drain grating.',
        status: 'completed'
      },
      {
        stage: 'Resolved',
        date: 'Nov 12, 2026 · 11:30 AM',
        title: 'Restoration Signed Off',
        description: 'Pedestrian corridor inspected by NDMC Civil Assistant Engineer. Pathway smooth and safe.',
        status: 'completed'
      }
    ]
  },
  {
    id: 'CS-2026-DEL-5592',
    title: 'Dangerous Open Storm Drain Cover near Government Primary School',
    description: 'Uncovered 4-foot deep stormwater drain right in front of the primary school entrance gate. Children play nearby every afternoon. Urgent reinforced concrete slab cover needed immediately.',
    category: 'public_infrastructure',
    status: 'Reported',
    location: 'Pocket 1, Mayur Vihar Phase 1, East Delhi, Delhi',
    lat: 28.6087,
    lng: 77.2946,
    reportedAt: '2026-11-15T11:05:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1618090584176-7132b9911657?auto=format&fit=crop&w=800&q=80',
    upvotes: 84,
    hasUpvoted: true,
    isUserSubmitted: false,
    department: 'MCD East Zone - Drainage & Sanitation Division',
    ward: 'Mayur Vihar Ward 20',
    estimatedResolution: 'Nov 16, 2026',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 15, 2026 · 11:05 AM',
        title: 'Critical Child Safety Flag Raised',
        description: 'CivicSense system flagged as Tier-1 urgent hazard due to proximity to school zone.',
        status: 'current'
      },
      {
        stage: 'In Progress',
        date: 'Pending',
        title: 'Barricade Placement & Slab Fitting',
        description: 'Emergency safety barricades en route. Pre-cast RCC cover dispatched from MCD depot.',
        status: 'upcoming'
      },
      {
        stage: 'Resolved',
        date: 'Pending',
        title: 'Slab Fixed & Safety Audit',
        description: 'Final inspection scheduled upon concrete curing.',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'CS-2026-NOI-2311',
    title: 'Uprooted Peepal Tree Branch Blocking Two-Lane Carriageway',
    description: 'A massive branch broke off during yesterday’s high winds and is obstructing 70% of the Sector 18 market approach road. Auto-rickshaws and delivery vans are forced into oncoming traffic.',
    category: 'other',
    status: 'Resolved',
    location: 'Atta Market approach road, Sector 18, Noida, Uttar Pradesh',
    lat: 28.5708,
    lng: 77.3261,
    reportedAt: '2026-11-13T08:20:00.000Z',
    resolvedAt: '2026-11-13T14:45:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    resolutionImageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    upvotes: 19,
    hasUpvoted: false,
    isUserSubmitted: false,
    department: 'NOIDA Authority - Horticulture & Disaster Response',
    ward: 'Sector 18 Commercial Zone',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 13, 2026 · 08:20 AM',
        title: 'Obstruction Reported by Local Merchant',
        description: 'Photographic evidence forwarded to NOIDA Horticulture Quick Response Cell.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 13, 2026 · 10:15 AM',
        title: 'Chainsaw & Crane Team Mobilized',
        description: 'Team cleared main trunk and loaded green waste onto authority flatbed trucks.',
        status: 'completed'
      },
      {
        stage: 'Resolved',
        date: 'Nov 13, 2026 · 02:45 PM',
        title: 'Both Lanes Reopened & Swept',
        description: 'Traffic police confirmed unrestricted vehicular flow.',
        status: 'completed'
      }
    ]
  },
  {
    id: 'CS-2026-GZB-7650',
    title: 'Severely Clogged Stormwater Drain Causing Waterlogging on Sector Road',
    description: 'Construction silt and plastic bags have blocked the main culvert inlet outside Sector 14 market. Even a brief shower results in knee-deep water accumulation for 200 meters.',
    category: 'roads_potholes',
    status: 'In Progress',
    location: 'Sector 14 Main Commercial Road, Vasundhara, Ghaziabad, Uttar Pradesh',
    lat: 28.6612,
    lng: 77.3820,
    reportedAt: '2026-11-14T15:20:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    upvotes: 33,
    hasUpvoted: false,
    isUserSubmitted: false,
    department: 'Ghaziabad Nagar Nigam - Drainage Division',
    ward: 'Vasundhara Ward 22',
    estimatedResolution: 'Nov 18, 2026',
    timeline: [
      {
        stage: 'Reported',
        date: 'Nov 14, 2026 · 03:20 PM',
        title: 'Waterlogging Complaint Received',
        description: 'Filed with videos of stagnant water at commercial sector.',
        status: 'completed'
      },
      {
        stage: 'In Progress',
        date: 'Nov 15, 2026 · 09:30 AM',
        title: 'Suction Machine & De-silting Operation',
        description: 'Super-sucker vacuum machine deployed at culvert intake. Silt extraction in progress.',
        status: 'current'
      },
      {
        stage: 'Resolved',
        date: 'Pending',
        title: 'Free-flow Discharge Test',
        description: 'Post-cleaning water flow check to be conducted with local resident welfare association.',
        status: 'upcoming'
      }
    ]
  }
];

export const DELHI_NCR_HUBS = [
  { name: 'All NCR', lat: 28.625, lng: 77.300, zoom: 11 },
  { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, zoom: 12 },
  { name: 'Noida', lat: 28.5750, lng: 77.3550, zoom: 13 },
  { name: 'Central Delhi', lat: 28.6304, lng: 77.2177, zoom: 13 },
  { name: 'South Delhi', lat: 28.5677, lng: 77.2433, zoom: 13 },
];
