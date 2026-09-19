import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "orange" | "blue" | "success" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border-slate-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200/60 font-semibold",
    blue: "bg-blue-50 text-blue-800 border-blue-200 font-semibold",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    outline: "border-slate-300 text-slate-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
