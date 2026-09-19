"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "Appliance Repair Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjectOptions = [
    "Appliance Repair Inquiry",
    "Request Cost Estimate / Quotation",
    "Warranty Claim / Re-service",
    "Commercial / AMC Inquiries",
    "General Question / Feedback",
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

    const validation = contactSchema.safeParse(formData);
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "Appliance Repair Inquiry",
          message: "",
        });
      } else {
        setErrors({
          form: result.message || "Failed to send message. Please call our hotline directly.",
        });
      }
    } catch (err) {
      setErrors({
        form: "Network error occurred. Please check connection or contact us via phone.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-[#0F2C59]">Message Sent Successfully!</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for getting in touch with Ved Enterprises. Our customer service desk will review
          your request and contact you within 15-30 minutes.
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="text-xs font-bold"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Your Full Name <span className="text-rose-500">*</span>
          </label>
          <Input
            name="name"
            placeholder="e.g. Amit Verma"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-rose-400 focus-visible:border-rose-500" : ""}
          />
          {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
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
          {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address (Optional)
          </label>
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-rose-400 focus-visible:border-rose-500" : ""}
          />
          {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Inquiry Subject <span className="text-rose-500">*</span>
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#0F2C59] focus:ring-2 focus:ring-[#0F2C59]/10"
          >
            {subjectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Your Message / Repair Requirement <span className="text-rose-500">*</span>
        </label>
        <Textarea
          name="message"
          rows={4}
          placeholder="Tell us about the appliance model, symptoms, or any questions you have..."
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? "border-rose-400 focus-visible:border-rose-500" : ""}
        />
        {errors.message && <p className="text-rose-500 text-[11px] mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="orange"
        size="lg"
        className="w-full sm:w-auto h-12 px-8 font-bold gap-2 cursor-pointer shadow-md shadow-orange-500/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
}
