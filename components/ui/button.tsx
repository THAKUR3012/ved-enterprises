import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "orange" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-sm";

    const variantStyles = {
      default:
        "bg-[#0F2C59] text-white hover:bg-[#091A36] focus-visible:ring-[#0F2C59] active:scale-[0.98]",
      primary:
        "bg-[#0F2C59] text-white hover:bg-[#091A36] focus-visible:ring-[#0F2C59] active:scale-[0.98]",
      orange:
        "bg-[#EA580C] text-white hover:bg-[#C2410C] focus-visible:ring-[#EA580C] active:scale-[0.98] shadow-md shadow-orange-500/20",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-300",
      outline:
        "border-2 border-[#0F2C59] text-[#0F2C59] bg-transparent hover:bg-[#0F2C59] hover:text-white focus-visible:ring-[#0F2C59]",
      ghost:
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-none",
      link:
        "text-[#EA580C] underline-offset-4 hover:underline shadow-none p-0 h-auto font-medium",
    };

    const sizeStyles = {
      default: "h-11 px-5 py-2.5",
      sm: "h-9 px-3.5 text-xs rounded-md",
      lg: "h-13 px-8 text-base rounded-xl font-bold",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
