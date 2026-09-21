"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Bot,
  Key,
  Database,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
  Settings,
  Send,
  Loader2,
  Wrench,
  Check,
  Lock,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Lead } from "@/lib/store";

export default function AdminDashboardPage() {
  // 1. Password Protection & Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"leads" | "ai-settings" | "overview">("leads");

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadCounts, setLeadCounts] = useState({ total: 0, new: 0, scheduled: 0, completed: 0, cancelled: 0 });
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // AI Settings State
  const [aiSettings, setAiSettings] = useState({
    provider: "gemini",
    apiKey: "",
    model: "gemini-1.5-flash",
    systemPrompt: "",
    knowledgeBase: "",
    temperature: 0.7,
    hasKey: false,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [aiSaving, setAiSaving] = useState(false);
  const [aiSaveSuccess, setAiSaveSuccess] = useState(false);

  // Live Test Chat State inside Admin
  const [testInput, setTestInput] = useState("");
  const [testMessages, setTestMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: "Hi Admin! I am configured with your current AI settings and knowledge base. Ask me anything to test the response!",
    },
  ]);
  const [testLoading, setTestLoading] = useState(false);

  // Check stored auth on load
  useEffect(() => {
    const isAuth = localStorage.getItem("ved_admin_auth") === "true";
    setIsAuthenticated(isAuth);
    setAuthChecked(true);
    if (isAuth) {
      fetchLeads();
      fetchAiSettings();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    setTimeout(() => {
      // DUMMY EMAIL AND PASSWORD VALIDATION
      if (
        loginEmail.trim().toLowerCase() === "admin@vedenterprises.in" &&
        loginPassword === "admin123"
      ) {
        setIsAuthenticated(true);
        localStorage.setItem("ved_admin_auth", "true");
        fetchLeads();
        fetchAiSettings();
      } else {
        setLoginError("Invalid credentials. Please use the dummy credentials shown below.");
      }
      setLoginLoading(false);
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem("ved_admin_auth");
    setIsAuthenticated(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleFillDemoCredentials = () => {
    setLoginEmail("admin@vedenterprises.in");
    setLoginPassword("admin123");
    setLoginError("");
  };

  // 1. Fetch Leads
  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setLeadCounts(data.counts || { total: 0, new: 0, scheduled: 0, completed: 0, cancelled: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLeadsLoading(false);
    }
  };

  // 2. Fetch AI Settings
  const fetchAiSettings = async () => {
    try {
      const res = await fetch("/api/admin/ai-settings");
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setAiSettings({
            provider: data.settings.provider || "gemini",
            apiKey: data.settings.apiKey || "",
            model: data.settings.model || "gemini-1.5-flash",
            systemPrompt: data.settings.systemPrompt || "",
            knowledgeBase: data.settings.knowledgeBase || "",
            temperature: data.settings.temperature || 0.7,
            hasKey: data.settings.hasKey || false,
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch AI settings:", err);
    }
  };

  // Update Lead Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(data.lead);
        }
        // update counts
        fetchLeads();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        fetchLeads();
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Save AI Settings
  const handleSaveAiSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiSaving(true);
    setAiSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/ai-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiSettings),
      });

      if (res.ok) {
        const data = await res.json();
        setAiSaveSuccess(true);
        setTimeout(() => setAiSaveSuccess(false), 4000);
        if (data.settings) {
          setAiSettings((prev) => ({
            ...prev,
            hasKey: data.settings.hasKey,
          }));
        }
      }
    } catch (err) {
      console.error("Failed to save AI settings:", err);
      alert("Failed to save AI settings. Please try again.");
    } finally {
      setAiSaving(false);
    }
  };

  // Test Chat Submit
  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim() || testLoading) return;

    const userText = testInput.trim();
    setTestMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setTestInput("");
    setTestLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (res.ok) {
        const data = await res.json();
        setTestMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.reply || "No response received.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setTestMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to AI chat engine." },
      ]);
    } finally {
      setTestLoading(false);
    }
  };

  // Filtered Leads List
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.applianceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.address && lead.address.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-orange-100 text-[#EA580C] border-orange-200";
      case "SCHEDULED":
        return "bg-blue-100 text-[#0F2C59] border-blue-200";
      case "CONTACTED":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // 1. If auth is still checking from localStorage, show brief loader
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white text-xs font-bold">
          <Loader2 className="w-5 h-5 animate-spin text-[#EA580C]" />
          <span>Checking Admin Session...</span>
        </div>
      </div>
    );
  }

  // 2. If NOT authenticated, render the Password Protected Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#09090b] via-zinc-950 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Branding Banner */}
          <div className="bg-[#09090b] text-white p-8 text-center border-b border-zinc-800 space-y-3">
            <div className="flex justify-center">
              <BrandLogo variant="white" size="sm" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>Password Protected Area</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">Admin Console Login</h1>
            <p className="text-xs text-slate-400">
              Enter your credentials to access leads, customer inquiries, and AI assistant settings.
            </p>
          </div>

          {/* Form Area */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Dummy Credentials Callout Box */}
            <div className="bg-orange-50/90 border border-orange-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-orange-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                  <span>Demo Admin Credentials</span>
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoCredentials}
                  className="text-[11px] font-bold text-[#EA580C] hover:text-[#C2410C] bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  Auto-Fill Demo
                </button>
              </div>
              <div className="font-mono text-slate-700 space-y-1 bg-white/70 p-2.5 rounded-xl border border-orange-100">
                <p>
                  <span className="text-slate-400">Email:</span> <strong>admin@vedenterprises.in</strong>
                </p>
                <p>
                  <span className="text-slate-400">Password:</span> <strong>admin123</strong>
                </p>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@vedenterprises.in"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Admin Portal →</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#EA580C] font-semibold transition-colors"
              >
                <span>← Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* 1. Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 2. Left Admin Sidebar (Fixed on desktop, slide-in drawer on mobile) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#09090b] text-white border-r border-zinc-800 flex flex-col justify-between transition-transform duration-300 shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Section */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Logo & Mobile close button */}
          <div className="flex items-center justify-between">
            <BrandLogo variant="white" size="sm" />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-orange-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admin Management Console</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => {
                setActiveTab("leads");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "leads"
                  ? "bg-[#EA580C] text-white shadow-lg shadow-orange-500/30"
                  : "text-slate-300 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leads &amp; Bookings</span>
              </div>
              {leadCounts.new > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    activeTab === "leads"
                      ? "bg-white text-[#EA580C]"
                      : "bg-[#EA580C] text-white"
                  }`}
                >
                  {leadCounts.new} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("ai-settings");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "ai-settings"
                  ? "bg-[#EA580C] text-white shadow-lg shadow-orange-500/30"
                  : "text-slate-300 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant Settings</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-orange-400" />
                <span>View Public Website</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </Link>
          </nav>
        </div>

        {/* Bottom Section: Profile & Sign out */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/60 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-400 truncate">admin@vedenterprises.in</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-white border border-rose-800/40 font-bold text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar inside Content Area */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
                {activeTab === "leads" ? "Customer Leads & Inquiries" : "AI Assistant & Knowledge Base"}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                {activeTab === "leads"
                  ? "Real-time repair bookings and inquiry leads from website forms"
                  : "Configure model, API key, and business knowledge base"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "leads" && (
              <button
                onClick={fetchLeads}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${leadsLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh Leads</span>
              </button>
            )}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#EA580C] text-xs font-bold border border-orange-200 transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 max-w-7xl w-full p-4 sm:p-8">
        {/* ========================================================= */}
        {/* TAB 1: LEADS & BOOKINGS MANAGEMENT                        */}
        {/* ========================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Form Leads</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{leadCounts.total}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F2C59] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider">New Uncontacted</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#EA580C] mt-1">{leadCounts.new}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center font-bold">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheduled Visits</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{leadCounts.scheduled}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Jobs Completed</p>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">{leadCounts.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, appliance..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#EA580C] focus:bg-white transition-all"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {["ALL", "NEW", "SCHEDULED", "COMPLETED", "CANCELLED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === status
                        ? "bg-[#09090b] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}

                <button
                  onClick={fetchLeads}
                  type="button"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors ml-auto cursor-pointer"
                  title="Refresh leads"
                >
                  <RefreshCw className={`w-4 h-4 ${leadsLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Leads Table Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-5">Reference</th>
                      <th className="py-3.5 px-5">Customer &amp; Contact</th>
                      <th className="py-3.5 px-5">Appliance &amp; Issue</th>
                      <th className="py-3.5 px-5">Preferred Slot</th>
                      <th className="py-3.5 px-5">Source</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                          No leads match your filter or search query.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                          onClick={() => setSelectedLead(lead)}
                        >
                          {/* Reference */}
                          <td className="py-4 px-5">
                            <span className="font-mono font-bold text-slate-900">{lead.bookingNumber}</span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(lead.createdAt).toLocaleDateString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>

                          {/* Customer Name & Phone */}
                          <td className="py-4 px-5">
                            <div className="font-bold text-slate-900 text-sm">{lead.fullName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{lead.phone}</span>
                              </a>
                              {lead.phone && (
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center hover:scale-110 transition-transform"
                                  title="Open WhatsApp chat"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Appliance Type & Problem */}
                          <td className="py-4 px-5 max-w-xs">
                            <div className="font-bold text-[#0F2C59]">{lead.applianceType}</div>
                            <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                              {lead.problemDescription || lead.serviceRequired}
                            </p>
                          </td>

                          {/* Preferred Slot */}
                          <td className="py-4 px-5 whitespace-nowrap">
                            <div className="font-semibold text-slate-800">{lead.preferredDate}</div>
                            <div className="text-[11px] text-slate-500">{lead.preferredTime}</div>
                          </td>

                          {/* Source */}
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200">
                              {lead.source}
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-4 px-5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${getStatusBadge(
                                lead.status
                              )}`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="SCHEDULED">SCHEDULED</option>
                              <option value="IN_PROGRESS">IN_PROGRESS</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                                title="View Lead Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Details Modal */}
            {selectedLead && (
              <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setSelectedLead(null)}
              >
                <div
                  className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Ref: {selectedLead.bookingNumber}</span>
                      <h3 className="text-lg font-extrabold text-[#0F2C59]">{selectedLead.fullName}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadge(
                        selectedLead.status
                      )}`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>

                  {/* Customer & Address details */}
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">PHONE</span>
                        <a
                          href={`tel:${selectedLead.phone}`}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{selectedLead.phone}</span>
                        </a>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px]">PREFERRED SLOT</span>
                        <span className="font-bold text-slate-900 block mt-0.5">
                          {selectedLead.preferredDate} ({selectedLead.preferredTime})
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">SERVICE ADDRESS</span>
                      <p className="font-medium text-slate-800 bg-slate-50 p-2.5 rounded-xl mt-1">
                        {selectedLead.address || "No street address provided"}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block text-[10px]">APPLIANCE &amp; ISSUE</span>
                      <div className="bg-slate-50 p-3 rounded-xl mt-1 space-y-1">
                        <div className="font-bold text-[#EA580C]">{selectedLead.applianceType}</div>
                        <p className="text-slate-600">{selectedLead.problemDescription}</p>
                      </div>
                    </div>

                    {selectedLead.assignedTechnician && (
                      <div className="bg-blue-50 p-3 rounded-xl text-blue-900">
                        <span className="text-[10px] font-bold uppercase text-blue-600 block">Assigned Technician</span>
                        <p className="font-bold text-sm">{selectedLead.assignedTechnician}</p>
                        {selectedLead.technicianNotes && (
                          <p className="text-xs text-blue-700 mt-1">{selectedLead.technicianNotes}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl transition-colors shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Customer</span>
                    </a>
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSelectedLead(null)}
                      type="button"
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: AI ASSISTANT SETTINGS & KNOWLEDGE BASE             */}
        {/* ========================================================= */}
        {activeTab === "ai-settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Configuration Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#EA580C] text-xs font-bold mb-2">
                  <Bot className="w-3.5 h-3.5" /> AI Model &amp; Knowledge Base Configuration
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Ved Assistant Engine</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Configure your API key, choose which model responds to visitors, and edit your custom business knowledge base.
                </p>
              </div>

              {aiSaveSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>AI Configuration successfully updated! The live chatbot will now use these settings.</span>
                </div>
              )}

              <form onSubmit={handleSaveAiSettings} className="space-y-5">
                {/* 1. Choose Provider */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    AI Provider
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "gemini", label: "Google Gemini", tag: "Recommended" },
                      { id: "openai", label: "OpenAI", tag: "GPT-4o" },
                      { id: "groq", label: "Groq / Meta", tag: "Ultra Fast" },
                    ].map((prov) => (
                      <button
                        key={prov.id}
                        type="button"
                        onClick={() => {
                          const defaultModel =
                            prov.id === "gemini" ? "gemini-1.5-flash" : prov.id === "openai" ? "gpt-4o-mini" : "llama-3.3-70b-versatile";
                          setAiSettings({ ...aiSettings, provider: prov.id as any, model: defaultModel });
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          aiSettings.provider === prov.id
                            ? "border-[#EA580C] bg-orange-50/50 shadow-sm ring-2 ring-orange-500/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-900 block">{prov.label}</span>
                        <span className="text-[10px] text-orange-600 font-semibold">{prov.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Choose Model */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Select Model
                  </label>
                  <select
                    value={aiSettings.model}
                    onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white"
                  >
                    {aiSettings.provider === "gemini" && (
                      <>
                        <option value="gemini-1.5-flash">gemini-1.5-flash (Fast, accurate, cost-effective)</option>
                        <option value="gemini-1.5-pro">gemini-1.5-pro (Complex reasoning &amp; large context)</option>
                        <option value="gemini-2.0-flash">gemini-2.0-flash (Latest Next-Gen experimental)</option>
                      </>
                    )}
                    {aiSettings.provider === "openai" && (
                      <>
                        <option value="gpt-4o-mini">gpt-4o-mini (Fast &amp; high intelligence)</option>
                        <option value="gpt-4o">gpt-4o (Flagship Omni model)</option>
                        <option value="gpt-3.5-turbo">gpt-3.5-turbo (Standard legacy)</option>
                      </>
                    )}
                    {aiSettings.provider === "groq" && (
                      <>
                        <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                        <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                      </>
                    )}
                  </select>
                </div>

                {/* 3. API Key Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {aiSettings.provider === "gemini" ? "Google Gemini API Key" : "API Key"}
                    </label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        aiSettings.hasKey
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {aiSettings.hasKey ? "Key Configured ✓" : "Key Not Set"}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={aiSettings.apiKey}
                      onChange={(e) => setAiSettings({ ...aiSettings, apiKey: e.target.value })}
                      placeholder="AIzaSy... (Paste your API Key here)"
                      className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                    <span>Your API key is stored securely in your project configuration.</span>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#EA580C] hover:underline font-bold"
                    >
                      Get Gemini Key Free →
                    </a>
                  </p>
                </div>

                {/* 4. Knowledge Base Editor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Knowledge Base &amp; Pricing Guide</span>
                    <span className="text-[10px] text-slate-400 font-normal">Custom business rules fed into AI</span>
                  </label>
                  <textarea
                    rows={10}
                    value={aiSettings.knowledgeBase}
                    onChange={(e) => setAiSettings({ ...aiSettings, knowledgeBase: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white leading-relaxed"
                    placeholder="Enter business details, service fees, discounts, and guarantees..."
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Edit pricing, diagnostic policies, turnaround hours, or warranty terms. The AI will strictly reference this information when answering customer questions.
                  </p>
                </div>

                {/* 5. System Prompt / Tone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    System Instructions &amp; Persona
                  </label>
                  <textarea
                    rows={4}
                    value={aiSettings.systemPrompt}
                    onChange={(e) => setAiSettings({ ...aiSettings, systemPrompt: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#EA580C] focus:bg-white leading-relaxed"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={aiSaving}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {aiSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>{aiSaving ? "Saving Configuration..." : "Save AI Settings"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Live Interactive Sandbox to test the Assistant immediately */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col h-[600px]">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-xs text-slate-900">Live AI Assistant Sandbox</span>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Model: {aiSettings.model}
                  </span>
                </div>

                {/* Chat Message Stream */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
                  {testMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                          m.sender === "user"
                            ? "bg-[#EA580C] text-white rounded-tr-none font-medium"
                            : "bg-slate-100 text-slate-800 rounded-tl-none font-normal"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {testLoading && (
                    <div className="p-3 bg-slate-100 rounded-2xl rounded-tl-none text-slate-500 flex items-center gap-2 w-fit">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EA580C]" />
                      <span>Generating reply using {aiSettings.model}...</span>
                    </div>
                  )}
                </div>

                {/* Input form */}
                <form onSubmit={handleSendTest} className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="Test your custom knowledge base..."
                    className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#EA580C] focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!testInput.trim() || testLoading}
                    className="w-9 h-9 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
);
}
