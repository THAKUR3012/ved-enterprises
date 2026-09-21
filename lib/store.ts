import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  bookingNumber: string;
  source: "Online Booking" | "Contact Desk" | "AI Chatbot";
  fullName: string;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  applianceType: string;
  serviceRequired: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  status: "NEW" | "CONTACTED" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  assignedTechnician?: string | null;
  technicianNotes?: string | null;
  estimatedCost?: number | null;
  createdAt: string;
}

export interface AiSettings {
  provider: "gemini" | "openai" | "groq";
  apiKey: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  knowledgeBase: string;
  updatedAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "admin-store.json");

const DEFAULT_KNOWLEDGE_BASE = `# Ved Enterprises - Business Knowledge Base
Company Name: Ved Enterprises
Industry: Professional Home Appliance Repair & Servicing
Helpline Phone: +91 98765 43210
WhatsApp Support: +91 98765 43210
Email: support@vedenterprises.in
Operating Hours: 8:00 AM - 9:00 PM (Monday to Sunday, 7 Days a Week)
Emergency Response: 60 - 90 Minutes Doorstep Arrival Guarantee

## Diagnostic & Inspection Policy
- Inspection / Visiting Fee: ₹199
- Policy: Visiting fee is 100% WAIVED / ADJUSTED if the customer approves the repair.
- Upfront Quotation: Clear itemized price provided after diagnosis before any repair starts.
- Genuine Parts: Only 100% OEM/OES brand-compatible components used.
- Warranty: 30 to 90 days warranty coverage on all replaced parts and labor.

## Appliance Services & Starting Pricing
1. AC Repair & Servicing: Starts at ₹499
   - Split & Window ACs, Inverter models
   - Deep Foam Jet Cleaning, Gas refilling (R32, R410A, R22)
   - Compressor troubleshooting, PCB board repair, Water leakage fix
2. Refrigerator Repair: Starts at ₹399
   - Single door, Double door, Side-by-side, Inverter fridges
   - Cooling loss, excessive freezer frost, gas leak, thermostat & relay replacement
3. Washing Machine Repair: Starts at ₹399
   - Front load, Top load, Semi-automatic
   - Drum spin failure, loud vibration noise, drainage pump blockage, error codes
4. RO Water Purifier Service: Starts at ₹299
   - Sediment, Pre-carbon filter replacement, High-TDS RO Membrane, TDS calibration
5. Microwave & Oven Repair: Starts at ₹299
   - Heating failure, magnetron replacement, turntable motor, touch membrane
6. Electric Geyser / Water Heater: Starts at ₹299
   - Heating element, thermostat cut-off, tank leakage, wall installation
7. LED / LCD Smart TV Repair: Starts at ₹399
   - Black screen backlight, motherboard circuit repair, sound without display
8. General Appliance Installation: Starts at ₹299

## Service Coverage Areas
Serving all residential sectors, apartment complexes, housing societies, and commercial premises across the metro region.`;

const DEFAULT_SYSTEM_PROMPT = `You are "Ved Assistant", the official AI customer service and booking advisor for Ved Enterprises (Home Appliance Repair & Servicing).

Your goals:
1. Greet customers warmly and answer their appliance repair, maintenance, and installation questions.
2. Provide transparent starting prices and explain our ₹199 visiting fee (which is waived if service is availed).
3. Emphasize our 60-90 minute emergency doorstep dispatch and 30-90 day service warranty.
4. Encourage customers to book online or call our helpline (+91 98765 43210).
5. Always stay helpful, polite, professional, and concise.`;

const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: "lead_101",
    bookingNumber: "VE-928412",
    source: "Online Booking",
    fullName: "Rohan Sharma",
    phone: "+91 98112 34567",
    whatsapp: "+91 98112 34567",
    email: "rohan.sharma@example.com",
    address: "Tower 4, Flat 702, Silver Oaks Society, Sector 12",
    applianceType: "AC Repair & Servicing",
    serviceRequired: "Cooling Problem / Gas Leak",
    problemDescription: "Split AC running but blowing room temperature air. Minor water dripping from indoor unit.",
    preferredDate: "2026-09-19",
    preferredTime: "12:00 PM - 02:00 PM",
    status: "NEW",
    assignedTechnician: "Suresh Kumar",
    technicianNotes: "Urgent cooling issue. Assigned to Suresh.",
    estimatedCost: 850,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: "lead_102",
    bookingNumber: "VE-817290",
    source: "Online Booking",
    fullName: "Pooja Verma",
    phone: "+91 98234 56789",
    whatsapp: "+91 98234 56789",
    email: "pooja.v@example.com",
    address: "House No. 45, Green Glen Layout, 3rd Cross",
    applianceType: "Refrigerator Repair",
    serviceRequired: "Freezer Frost & No Cooling Below",
    problemDescription: "Double door Samsung fridge, ice forming on back panel but bottom vegetables compartment is warm.",
    preferredDate: "2026-09-19",
    preferredTime: "02:00 PM - 04:00 PM",
    status: "SCHEDULED",
    assignedTechnician: "Amit Verma",
    technicianNotes: "Scheduled for afternoon 2 PM visit.",
    estimatedCost: 650,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
  {
    id: "lead_103",
    bookingNumber: "VE-746219",
    source: "AI Chatbot",
    fullName: "Vikram Malhotra",
    phone: "+91 98991 22334",
    whatsapp: "+91 98991 22334",
    address: "B-201, Sunshine Heights, Main Market Road",
    applianceType: "Washing Machine Repair",
    serviceRequired: "Spin Cycle Not Working",
    problemDescription: "Front load IFB machine makes heavy thumping noise and does not drain water.",
    preferredDate: "2026-09-20",
    preferredTime: "10:00 AM - 12:00 PM",
    status: "NEW",
    createdAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
  },
  {
    id: "lead_104",
    bookingNumber: "VE-635108",
    source: "Contact Desk",
    fullName: "Sunita Roy",
    phone: "+91 98711 55667",
    email: "sunita.roy@example.com",
    address: "Flat 12B, Palm Meadows",
    applianceType: "RO Purifier Service",
    serviceRequired: "Annual Filter Replacement",
    problemDescription: "TDS level taste bad, water flow is very slow.",
    preferredDate: "2026-09-18",
    preferredTime: "04:00 PM - 06:00 PM",
    status: "COMPLETED",
    assignedTechnician: "Manoj Singh",
    technicianNotes: "Replaced sediment & carbon filters, calibrated TDS to 85.",
    estimatedCost: 799,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface StoreData {
  leads: Lead[];
  aiSettings: AiSettings;
}

function loadStore(): StoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading admin store:", err);
  }

  // Initial default store
  const defaultStore: StoreData = {
    leads: INITIAL_SAMPLE_LEADS,
    aiSettings: {
      provider: "gemini",
      apiKey: process.env.GEMINI_API_KEY || "",
      model: "gemini-1.5-flash",
      temperature: 0.7,
      systemPrompt: DEFAULT_SYSTEM_PROMPT,
      knowledgeBase: DEFAULT_KNOWLEDGE_BASE,
      updatedAt: new Date().toISOString(),
    },
  };

  saveStore(defaultStore);
  return defaultStore;
}

function saveStore(data: StoreData) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving admin store:", err);
  }
}

// 1. Leads Operations
export function getAllLeads(): Lead[] {
  const store = loadStore();
  return store.leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const store = loadStore();
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };

  store.leads.unshift(newLead);
  saveStore(store);
  return newLead;
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const store = loadStore();
  const index = store.leads.findIndex((l) => l.id === id || l.bookingNumber === id);
  if (index === -1) return null;

  store.leads[index] = {
    ...store.leads[index],
    ...updates,
  };

  saveStore(store);
  return store.leads[index];
}

export function deleteLead(id: string): boolean {
  const store = loadStore();
  const initialLen = store.leads.length;
  store.leads = store.leads.filter((l) => l.id !== id && l.bookingNumber !== id);

  if (store.leads.length !== initialLen) {
    saveStore(store);
    return true;
  }
  return false;
}

// 2. AI Settings Operations
export function getAiSettings(): AiSettings {
  const store = loadStore();
  const settings = { ...store.aiSettings };
  if (!settings.apiKey) {
    if (settings.provider === "openai" && process.env.OPENAI_API_KEY) {
      settings.apiKey = process.env.OPENAI_API_KEY;
    } else if (process.env.GEMINI_API_KEY) {
      settings.apiKey = process.env.GEMINI_API_KEY;
    }
  }
  return settings;
}

export function updateAiSettings(updates: Partial<AiSettings>): AiSettings {
  const store = loadStore();
  store.aiSettings = {
    ...store.aiSettings,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStore(store);
  return store.aiSettings;
}
