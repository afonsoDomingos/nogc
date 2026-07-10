"use client";

import { motion } from "framer-motion";

export default function Stats() {
  const metrics = [
    {
      value: "40+ MW",
      label: "Renewable Generation Capacity",
      detail: "Clean solar assets powering local grids.",
    },
    {
      value: "1,500+",
      label: "Local Jobs Created",
      detail: "Investing heavily in Mozambican talents.",
    },
    {
      value: "98.7%",
      label: "Safety HSSE Score",
      detail: "Exceeding international oil & gas safety rules.",
    },
    {
      value: "15+",
      label: "Strategic Alliances",
      detail: "Global energy partnerships across 5 continents.",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl glass-panel relative group hover:border-petroleum/20 transition-all duration-300"
            >
              {/* Top orange line glow */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <h3 className="font-display font-black text-4xl md:text-5xl bg-gradient-to-r from-white to-petroleum bg-clip-text text-transparent group-hover:from-orange group-hover:to-white transition-colors duration-300 mb-2">
                {metric.value}
              </h3>
              
              <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">
                {metric.label}
              </h4>
              
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {metric.detail}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
