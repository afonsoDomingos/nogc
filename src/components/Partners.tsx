"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Partners() {
  const { t } = useLanguage();
  
  const partners = [
    { name: "TotalEnergies", short: "TE" },
    { name: "ExxonMobil", short: "EM" },
    { name: "ENH Mozambique", short: "ENH" },
    { name: "ENI East Africa", short: "ENI" },
    { name: "Sasol", short: "SS" },
    { name: "Galp Energia", short: "GP" },
  ];

  // Duplicate the list to ensure a seamless infinite loop
  const list = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-slate-950/60 overflow-hidden relative border-b border-white/5 w-full max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {t("partnersTag")}
        </span>
      </div>

      {/* Infinite Scroll Container */}
      <div className="flex w-full relative overflow-hidden">
        {/* Left & Right gradient fades for premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 items-center animate-infinite-scroll whitespace-nowrap">
          {list.map((partner, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer px-6"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-display font-extrabold text-sm text-slate-300">
                {partner.short}
              </div>
              <span className="font-display font-bold text-lg text-slate-300 tracking-wider">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
