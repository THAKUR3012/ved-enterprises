import React from "react";
import { Clock, Wrench, ShieldCheck, Award } from "lucide-react";

export function TrustBar() {
  const blocks = [
    {
      title: "Same-Day Service",
      description: "Quick assistance for urgent appliance problems.",
      icon: Clock,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Skilled Technicians",
      description: "Professionals experienced with household appliances.",
      icon: Wrench,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      title: "Genuine Spare Parts",
      description: "Quality replacement parts when required.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Service Warranty",
      description: "Warranty support on eligible repairs.",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {blocks.map((block, idx) => {
          const Icon = block.icon;
          return (
            <div
              key={block.title}
              className={`flex items-start gap-4 ${
                idx > 0 ? "pt-5 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${block.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F2C59] mb-1">
                  {block.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {block.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
