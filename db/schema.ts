import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  boolean,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// 1. Admin Users
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["admin", "superadmin", "technician"]).default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// 2. Services
export const services = mysqlTable("services", {
  id: varchar("id", { length: 36 }).primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  startingPrice: decimal("starting_price", { precision: 10, scale: 2 }).notNull(),
  iconName: varchar("icon_name", { length: 50 }).notNull().default("Wrench"),
  image: varchar("image", { length: 255 }).notNull(),
  badge: varchar("badge", { length: 50 }),
  commonProblems: text("common_problems"), // JSON string or comma-separated
  featuresIncluded: text("features_included"), // JSON string
  metaTitle: varchar("meta_title", { length: 150 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true).notNull(),
  orderIndex: int("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// 3. Bookings
export const bookings = mysqlTable("bookings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  bookingNumber: varchar("booking_number", { length: 30 }).notNull().unique(), // e.g. VE-000123
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }),
  address: text("address").notNull(),
  applianceType: varchar("appliance_type", { length: 100 }).notNull(),
  serviceRequired: varchar("service_required", { length: 150 }).notNull(),
  problemDescription: text("problem_description").notNull(),
  preferredDate: varchar("preferred_date", { length: 50 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 50 }).notNull(),
  additionalMessage: text("additional_message"),
  status: mysqlEnum("status", [
    "NEW",
    "CONTACTED",
    "SCHEDULED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ])
    .default("NEW")
    .notNull(),
  assignedTechnician: varchar("assigned_technician", { length: 100 }),
  technicianNotes: text("technician_notes"),
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  finalCost: decimal("final_cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// 4. Testimonials
export const testimonials = mysqlTable("testimonials", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  rating: int("rating").notNull().default(5),
  review: text("review").notNull(),
  appliance: varchar("appliance", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }),
  isVerified: boolean("is_verified").default(true).notNull(),
  isApproved: boolean("is_approved").default(true).notNull(),
  orderIndex: int("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Gallery Images
export const galleryImages = mysqlTable("gallery_images", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // AC, Refrigerator, etc.
  description: text("description"),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  orderIndex: int("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Service Areas
export const serviceAreas = mysqlTable("service_areas", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  district: varchar("district", { length: 100 }),
  pincode: varchar("pincode", { length: 20 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. FAQs
export const faqs = mysqlTable("faqs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  serviceSlug: varchar("service_slug", { length: 100 }), // null for global FAQs
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  orderIndex: int("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Contact Messages
export const contactMessages = mysqlTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 150 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. Website Settings (Key-Value CMS Configuration)
export const websiteSettings = mysqlTable("website_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  group: varchar("group", { length: 50 }).default("general").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
