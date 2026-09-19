export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  iconName: string;
  image: string;
  commonProblems: string[];
  featuresIncluded: string[];
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  review: string;
  appliance: string;
  location: string;
  date: string;
  isVerified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "AC" | "Refrigerator" | "Washing Machine" | "RO" | "Geyser" | "TV" | "Other";
  description: string;
  image: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  district?: string;
  pincode?: string;
  isActive: boolean;
}

export const SITE_CONFIG = {
  companyName: "Ved Enterprises",
  tagline: "Fast & Reliable Home Appliance Repair at Your Doorstep",
  industry: "Home Appliance Repair & Servicing",
  // Editable placeholder business contacts
  contact: {
    phone: "+91 98765 43210", // EDITABLE: Replace with actual business phone
    phoneRaw: "+919876543210",
    whatsapp: "+91 98765 43210", // EDITABLE: Replace with actual WhatsApp number
    whatsappRaw: "+919876543210",
    email: "support@vedenterprises.in", // EDITABLE: Business email
    address: "Shop No. 12, Main Market Road, Commercial Complex, Sector 4", // EDITABLE: Business address
    city: "Local City / Metro Area", // EDITABLE
    workingHours: "Mon - Sun: 8:00 AM - 9:00 PM",
    emergencyAvailable: true,
  },
  stats: {
    experienceYears: "10+", // Placeholder - editable via Admin
    servicesCompleted: "5,000+", // Placeholder - editable via Admin
    serviceAreasCount: "25+", // Placeholder - editable via Admin
    customerRating: "4.8/5", // Placeholder - editable via Admin
  },
  trustPoints: [
    {
      title: "Same-Day Service",
      description: "Quick doorstep assistance for urgent appliance breakdowns and faults.",
      icon: "Clock",
    },
    {
      title: "Skilled Technicians",
      description: "Trained background-verified technicians with years of hands-on experience.",
      icon: "Wrench",
    },
    {
      title: "Genuine Spare Parts",
      description: "100% manufacturer-grade components with transparent pricing on replacements.",
      icon: "ShieldCheck",
    },
    {
      title: "Service Warranty",
      description: "Up to 30-90 days warranty coverage on replaced parts and service labor.",
      icon: "Award",
    },
  ],
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "srv-ac",
    slug: "ac-repair",
    name: "AC Repair & Servicing",
    shortDescription: "Cooling problems, gas refilling, jet foam servicing, installation, and PCB repairs.",
    fullDescription: "Complete cooling solutions for Split and Window air conditioners. We handle compressor troubleshooting, gas charging, deep jet cleaning, water leakage, and installation.",
    startingPrice: 499,
    iconName: "Wind",
    image: "/images/services/ac-repair.jpg",
    badge: "Most Booked",
    commonProblems: [
      "AC not cooling effectively",
      "Water leakage from indoor unit",
      "Unusual noise or vibration",
      "Refrigerant gas leak or refill required",
      "Power trip / PCB failure",
    ],
    featuresIncluded: [
      "Filter and coil deep inspection",
      "Refrigerant pressure measurement",
      "Thermostat calibration",
      "Post-service performance testing",
    ],
  },
  {
    id: "srv-ref",
    slug: "refrigerator-repair",
    name: "Refrigerator Repair",
    shortDescription: "Single & double door fridge cooling issues, compressor faults, and gas leak fixes.",
    fullDescription: "Prompt diagnostics and repair for frost-free and direct-cool refrigerators from all leading brands. We fix gas leakage, compressor failure, ice build-up, and thermostat issues.",
    startingPrice: 399,
    iconName: "Refrigerator",
    image: "/images/services/refrigerator-repair.jpg",
    badge: "Same-Day",
    commonProblems: [
      "Fridge not cooling or freezing",
      "Excess ice accumulation in freezer",
      "Water leaking beneath refrigerator",
      "Clicking sound or compressor overheating",
      "Door gasket / seal loose",
    ],
    featuresIncluded: [
      "Comprehensive cooling coil audit",
      "Relay and capacitor verification",
      "Gas leak detection test",
      "Door sealing check",
    ],
  },
  {
    id: "srv-wm",
    slug: "washing-machine-repair",
    name: "Washing Machine Repair",
    shortDescription: "Front load, top load, and semi-automatic drum, drain, and motor diagnostics.",
    fullDescription: "Specialized service for fully-automatic front-load, top-load, and semi-automatic washing machines. Solutions for spinning problems, drainage issues, drum noise, and motherboard errors.",
    startingPrice: 449,
    iconName: "RotateCw",
    image: "/images/services/washing-machine-repair.jpg",
    badge: "Popular",
    commonProblems: [
      "Drum not rotating / spin cycle failure",
      "Water not draining or filling",
      "Excessive vibration during spin",
      "Control panel error codes",
      "Door lock jammed",
    ],
    featuresIncluded: [
      "Inlet and outlet valve testing",
      "Motor and belt check",
      "Drum balance and bearing check",
      "Drain pump clearing",
    ],
  },
  {
    id: "srv-micro",
    slug: "microwave-oven-repair",
    name: "Microwave & Oven Repair",
    shortDescription: "Heating element, magnetron, touchpad, turntable, and spark repair services.",
    fullDescription: "Expert repair for convection, grill, and solo microwave ovens. We handle non-heating magnetron issues, sparking inside cavity, faulty touchpads, and turntable motor failures.",
    startingPrice: 349,
    iconName: "Flame",
    image: "/images/services/microwave-repair.jpg",
    commonProblems: [
      "Microwave not heating food",
      "Sparks or burning smell inside",
      "Turntable plate not rotating",
      "Touchpad buttons unresponsive",
      "Fuse blown repeatedly",
    ],
    featuresIncluded: [
      "High-voltage diode and capacitor test",
      "Magnetron output assessment",
      "Interlock door switch testing",
      "Radiation leakage safety check",
    ],
  },
  {
    id: "srv-ro",
    slug: "ro-service",
    name: "RO / Water Purifier Service",
    shortDescription: "Sediment filter, carbon filter, RO membrane replacement, and TDS testing.",
    fullDescription: "Safe drinking water guaranteed with our comprehensive water purifier servicing. We replace choked filters, UV/UF membranes, booster pumps, and balance minerals with precise TDS measurement.",
    startingPrice: 299,
    iconName: "Droplets",
    image: "/images/services/ro-service.jpg",
    badge: "Essential",
    commonProblems: [
      "Water taste or foul odor",
      "Low water flow / purifier stopped",
      "Continuous water leakage from bottom",
      "Auto-cut off not working / tank overflowing",
      "Beeping alarm or filter change alert",
    ],
    featuresIncluded: [
      "Raw & purified water TDS testing",
      "Sediment & Pre-carbon filter check",
      "Membrane filtration pressure check",
      "Electrical SMPS & pump test",
    ],
  },
  {
    id: "srv-geyser",
    slug: "geyser-repair",
    name: "Geyser / Water Heater Repair",
    shortDescription: "Storage & instant geyser heating element replacement, thermostat, and leak repair.",
    fullDescription: "Fast, safe service for electric and gas geysers. We resolve water not heating, tank leakage, short circuits, thermostat faults, and anode rod replacements for scale prevention.",
    startingPrice: 349,
    iconName: "Zap",
    image: "/images/services/geyser-repair.jpg",
    commonProblems: [
      "Water not heating or lukewarm",
      "Tank water leaking",
      "MCB tripping when geyser is switched on",
      "Overheating / steam coming from tap",
      "Strange popping sound inside geyser",
    ],
    featuresIncluded: [
      "Heating coil resistance check",
      "Thermostat cut-off temperature test",
      "Safety valve pressure check",
      "Wiring insulation inspection",
    ],
  },
  {
    id: "srv-tv",
    slug: "tv-repair",
    name: "LED / Smart TV Repair",
    shortDescription: "Screen backlight, motherboard, sound without picture, and power supply repairs.",
    fullDescription: "Precision repair for LED, LCD, OLED, and Smart TVs of all dimensions. We fix backlight LED strips, logic boards, HDMI port issues, display lines, and power supply faults.",
    startingPrice: 499,
    iconName: "Tv",
    image: "/images/services/tv-repair.jpg",
    commonProblems: [
      "Sound is working but screen is dark / black",
      "Lines or flickering display",
      "TV not turning on / red light blinking",
      "WiFi / Smart OS not connecting",
      "HDMI port not detecting setup box",
    ],
    featuresIncluded: [
      "Power board voltage check",
      "Backlight array testing",
      "T-Con board signal inspection",
      "Speaker audio test",
    ],
  },
  {
    id: "srv-install",
    slug: "appliance-installation",
    name: "General Appliance Installation",
    shortDescription: "Professional uninstallation, wall-mounting, plumbing fittings, and new setup.",
    fullDescription: "Stress-free uninstallation and secure installation for newly purchased appliances. Ensure manufacturer warranty compliance with vibration-dampened fittings and tested electrical connections.",
    startingPrice: 399,
    iconName: "Settings",
    image: "/images/services/appliance-installation.jpg",
    commonProblems: [
      "New split AC wall mounting and copper piping",
      "Washing machine inlet tap & drain setup",
      "TV swivel wall mount installation",
      "Water purifier wall hanging & plumbing tap",
      "Appliance shifting and re-installation",
    ],
    featuresIncluded: [
      "Precise laser levelling for wall mounts",
      "Heavy-duty fastener fixtures",
      "Plumbing leak check for wet appliances",
      "First-time operation walk-through",
    ],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Quick Response & Same Day",
    description: "Doorstep technician arrival within 60 to 90 minutes for priority appliance breakdown requests.",
    icon: "Clock",
  },
  {
    title: "Skilled & Verified Technicians",
    description: "Background-checked professionals with rigorous practical training across leading appliance brands.",
    icon: "UserCheck",
  },
  {
    title: "Transparent & Fair Pricing",
    description: "Upfront rate estimation with zero hidden charges. You approve the cost before any work begins.",
    icon: "Receipt",
  },
  {
    title: "100% Genuine Spare Parts",
    description: "Direct-sourced OEM/OES components ensuring long-term durability and original performance.",
    icon: "ShieldCheck",
  },
  {
    title: "Service & Parts Warranty",
    description: "Confidence guaranteed with 30 to 90-day service warranty on all eligible repair jobs.",
    icon: "BadgeCheck",
  },
  {
    title: "Doorstep Convenience",
    description: "Repairs performed right in front of you at your home, saving hassle, transport, and time.",
    icon: "Home",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Book a Service",
    description: "Submit your repair request online in 30 seconds or connect directly via Call / WhatsApp.",
  },
  {
    step: "02",
    title: "Technician Assigned",
    description: "A skilled technician near your area is scheduled according to your preferred time slot.",
  },
  {
    step: "03",
    title: "Inspection & Repair",
    description: "The appliance is diagnosed at your doorstep. We explain the problem and quote before repair.",
  },
  {
    step: "04",
    title: "Job Completed & Tested",
    description: "Your appliance is tested for peak performance, followed by invoice and warranty details.",
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  { id: "area-1", name: "Sector 1 - 15 (North Zone)", isActive: true },
  { id: "area-2", name: "Civil Lines & Model Town", isActive: true },
  { id: "area-3", name: "Green Park & South Extension", isActive: true },
  { id: "area-4", name: "Rajendra Nagar & Patel Nagar", isActive: true },
  { id: "area-5", name: "Indirapuram & Vaishali", isActive: true },
  { id: "area-6", name: "Noida Extension / Greater Noida West", isActive: true },
  { id: "area-7", name: "DLF Phase 1 - 5 & Cyber City", isActive: true },
  { id: "area-8", name: "Sohna Road & Golf Course Ext.", isActive: true },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Ramesh Sharma",
    rating: 5,
    review: "Our split AC stopped cooling right in the middle of a hot summer afternoon. The Ved Enterprises technician arrived within 2 hours, detected a minor capacitor issue, and fixed it affordably. Prompt and honest service!",
    appliance: "AC Repair & Servicing",
    location: "Civil Lines",
    date: "Recent Sample Review",
    isVerified: true,
  },
  {
    id: "rev-2",
    name: "Pooja Verma",
    rating: 5,
    review: "The washing machine drum made loud grinding noises during spin cycles. The technician explained the bearing issue clearly, quoted upfront, and finished the repair at our doorstep. Very satisfied.",
    appliance: "Washing Machine Repair",
    location: "Green Park",
    date: "Recent Sample Review",
    isVerified: true,
  },
  {
    id: "rev-3",
    name: "Amit Patel",
    rating: 5,
    review: "Got my double-door refrigerator serviced for a cooling issue. Genuine parts were replaced in front of me with warranty receipt. Highly recommended for trustworthy local appliance repairs.",
    appliance: "Refrigerator Repair",
    location: "Sector 14",
    date: "Recent Sample Review",
    isVerified: true,
  },
  {
    id: "rev-4",
    name: "Sunita Iyer",
    rating: 5,
    review: "Fast RO water purifier servicing. Replaced the choked sediment filter and tested TDS level in front of us. Courteous technician and transparent billing.",
    appliance: "RO Water Purifier",
    location: "Model Town",
    date: "Recent Sample Review",
    isVerified: true,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Split AC Jet Pump Servicing",
    category: "AC",
    description: "Deep jet pressure wash cleaning of cooling coils and indoor blower wheel.",
    image: "/images/gallery/ac-service.jpg",
  },
  {
    id: "gal-2",
    title: "Refrigerator Compressor Diagnostics",
    category: "Refrigerator",
    description: "Inverter compressor gas charging and relay module replacement.",
    image: "/images/gallery/fridge-service.jpg",
  },
  {
    id: "gal-3",
    title: "Front Load Washing Machine Drum Balancing",
    category: "Washing Machine",
    description: "Spider arm and shock absorber replacement for smooth, vibration-free spinning.",
    image: "/images/gallery/washing-service.jpg",
  },
  {
    id: "gal-4",
    title: "RO Membrane & Multi-Stage Filter Replacement",
    category: "RO",
    description: "Certified food-grade membrane fitting with precise digital TDS calibration.",
    image: "/images/gallery/ro-service.jpg",
  },
  {
    id: "gal-5",
    title: "Storage Geyser Heating Element Restoration",
    category: "Geyser",
    description: "Descaling hard water buildup and replacing heavy-duty copper heating element.",
    image: "/images/gallery/geyser-service.jpg",
  },
  {
    id: "gal-6",
    title: "Smart LED TV Backlight Repair",
    category: "TV",
    description: "Precision LED backlight strip replacement restoring crisp display luminosity.",
    image: "/images/gallery/tv-service.jpg",
  },
];
