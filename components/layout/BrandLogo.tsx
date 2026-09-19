import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "header" | "footer" | "white";
}

export function BrandLogo({ className = "", variant = "header" }: BrandLogoProps) {
  const isFooter = variant === "footer" || variant === "white";

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Stylized Emblem / Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0F2C59] via-[#1E3A8A] to-[#0A1E3F] shadow-md shadow-blue-900/20 p-2 shrink-0 border border-blue-400/20">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stylized V + Wrench/Shield Motif */}
          <path
            d="M6 10L20 32L34 10"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Orange Accent Sparkle / Core */}
          <circle cx="20" cy="15" r="4.5" fill="#EA580C" />
          <path
            d="M20 20V26"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M14 30H26"
            stroke="#EA580C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-xl sm:text-[22px]">
          <span className={isFooter ? "text-white" : "text-[#0F2C59]"}>
            VED
          </span>
          <span className="text-[#EA580C]">ENTERPRISES</span>
        </div>
        <span
          className={`text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase mt-0.5 ${
            isFooter ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Home Appliance Care &amp; Service
        </span>
      </div>
    </div>
  );
}
