"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Wrench,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookingSchema, BookingFormData } from "@/lib/validations/booking";
import { SITE_CONFIG, SERVICES_LIST } from "@/lib/constants";
import { createWhatsAppLink, createTelLink } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/BrandLogo";

interface SuccessState {
  bookingNumber: string;
  customerName: string;
  applianceType: string;
  preferredDate: string;
  preferredTime: string;
}

export function BookingSection() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phone: "",
    whatsapp: "",
    address: "",
    applianceType: "AC Repair & Servicing",
    serviceRequired: "General Diagnosis & Repair",
    problemDescription: "",
    preferredDate: "",
    preferredTime: "Morning (9:00 AM - 1:00 PM)",
    additionalMessage: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<SuccessState | null>(null);

  const timeSlots = [
    "Morning (9:00 AM - 1:00 PM)",
    "Afternoon (1:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:30 PM)",
    "Urgent (Within 90 Mins)",
  ];

  const serviceOptions = [
    "General Diagnosis & Repair",
    "Deep Servicing / Cleaning",
    "Gas Refill / Leak Detection",
    "Part Replacement",
    "New Unit Installation",
    "Uninstallation / Shifting",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation with Zod
    const validation = bookingSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessData({
          bookingNumber: result.bookingNumber,
          customerName: result.customerName,
          applianceType: result.applianceType,
          preferredDate: result.preferredDate,
          preferredTime: result.preferredTime,
        });
      } else {
        setErrors({
          form: result.message || "Failed to submit booking. Please try again or call directly.",
        });
      }
    } catch (err) {
      setErrors({
        form: "Network error occurred. Please check connection or contact us by phone.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      fullName: "",
      phone: "",
      whatsapp: "",
      address: "",
      applianceType: "AC Repair & Servicing",
      serviceRequired: "General Diagnosis & Repair",
      problemDescription: "",
      preferredDate: "",
      preferredTime: "Morning (9:00 AM - 1:00 PM)",
      additionalMessage: "",
    });
  };

  return (
    <section id="book-repair" className="py-20 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#EA580C] text-xs font-bold tracking-wide border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" /> Instant Doorstep Dispatch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2C59] tracking-tight">
            Book Your Appliance Repair
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Fill out the simple form below. Our service manager will confirm your time slot and assign
            an expert technician near your locality.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/90 relative">
          {successData ? (
            /* Success Screen as required in Step 17 */
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="flex justify-center mb-1">
                <BrandLogo size="sm" />
              </div>
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Booking Request Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59]">
                  Thank you, {successData.customerName}!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Your appliance repair service request has been received. Our team will contact you shortly
                  to reconfirm technician arrival.
                </p>
              </div>

              {/* Unique Booking Reference Badge */}
              <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-orange-300 rounded-2xl p-5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Your Unique Booking ID
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#EA580C] font-mono tracking-wider">
                  {successData.bookingNumber}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2 text-left">
                  <div>
                    <span className="font-semibold text-slate-700">Appliance:</span> {successData.applianceType}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Slot:</span> {successData.preferredTime}
                  </div>
                </div>
              </div>

              {/* Direct Urgent Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={createWhatsAppLink(
                    SITE_CONFIG.contact.whatsappRaw,
                    `Hello Ved Enterprises, I just booked repair request ID ${successData.bookingNumber} for ${successData.applianceType}. Please confirm.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send ID via WhatsApp</span>
                </a>

                <a
                  href={createTelLink(SITE_CONFIG.contact.phoneRaw)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F2C59] hover:bg-[#091A36] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Dispatch: {SITE_CONFIG.contact.phone}</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Book Another Repair
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Section 1: Customer Contact Details */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#EA580C]" /> 1. Customer &amp; Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="fullName"
                      placeholder="e.g. Ramesh Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? "border-rose-400 focus-visible:border-rose-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-rose-400 focus-visible:border-rose-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* WhatsApp Number (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number (Optional)
                    </label>
                    <Input
                      name="whatsapp"
                      type="tel"
                      placeholder="Same as phone or alternate"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Address & Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complete Service Address &amp; Locality <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    name="address"
                    placeholder="House/Flat No., Building Name, Street / Sector, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-rose-400 focus-visible:border-rose-500" : ""}
                  />
                </div>
                {errors.address && (
                  <p className="text-rose-500 text-[11px] mt-1">{errors.address}</p>
                )}
              </div>

              {/* Section 3: Appliance & Service Details */}
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-[#0F2C59]" /> 2. Appliance &amp; Problem Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Appliance Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Appliance Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="applianceType"
                      value={formData.applianceType}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/10"
                    >
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name}
                        </option>
                      ))}
                      <option value="Other Appliance">Other / Unlisted Appliance</option>
                    </select>
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Service Required <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/10"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Problem Description <span className="text-rose-500">*</span>
                  </label>
                  <Textarea
                    name="problemDescription"
                    rows={3}
                    placeholder="Describe what is happening (e.g. AC not cooling, washing machine water leakage, strange rattling noise, etc.)"
                    value={formData.problemDescription}
                    onChange={handleChange}
                    className={errors.problemDescription ? "border-rose-400 focus-visible:border-rose-500" : ""}
                  />
                  {errors.problemDescription && (
                    <p className="text-rose-500 text-[11px] mt-1">{errors.problemDescription}</p>
                  )}
                </div>
              </div>

              {/* Section 4: Date & Slot Scheduling */}
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#EA580C]" /> 3. Preferred Date &amp; Time Slot
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <Input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={errors.preferredDate ? "border-rose-400 focus-visible:border-rose-500" : ""}
                    />
                    {errors.preferredDate && (
                      <p className="text-rose-500 text-[11px] mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Time Slot <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/10"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Note / Gate Entry Instructions (Optional)
                </label>
                <Input
                  name="additionalMessage"
                  placeholder="e.g. Please call before arriving / Gate code 123"
                  value={formData.additionalMessage}
                  onChange={handleChange}
                />
              </div>

              {/* Trust Badge & Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No payment required now. Pay only after inspection &amp; repair.</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="orange"
                  size="lg"
                  className="w-full sm:w-auto h-13 px-10 text-base font-bold shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Request Service</span>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
