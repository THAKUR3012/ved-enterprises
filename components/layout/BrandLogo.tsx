import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  variant?: "header" | "footer" | "white";
  size?: "sm" | "default" | "lg";
}

export function BrandLogo({
  className = "",
  variant = "header",
  size = "default",
}: BrandLogoProps) {
  const isFooter = variant === "footer" || variant === "white";

  // Dimensions based on context
  const dimensions = {
    sm: "h-9 w-36 sm:h-10 sm:w-44",
    default: "h-10 w-44 sm:h-12 sm:w-56",
    lg: "h-14 w-60 sm:h-16 sm:w-72",
  };

  return (
    <div
      className={`inline-flex items-center transition-all select-none ${
        isFooter
          ? "bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-white/20"
          : ""
      } ${className}`}
    >
      <div className={`relative ${dimensions[size]}`}>
        <Image
          src="/images/ved-logo-transparent.webp"
          alt="Ved Enterprises - Home Appliance Repair & Servicing"
          fill
          priority
          className="object-contain object-left"
          sizes="(max-width: 640px) 180px, 240px"
        />
      </div>
    </div>
  );
}
