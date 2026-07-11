"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();

  const metrics = [
    {
      value: t("stat1Value"),
      label: t("stat1Label"),
      detail: t("stat1Detail"),
    },
    {
      value: t("stat2Value"),
      label: t("stat2Label"),
      detail: t("stat2Detail"),
    },
    {
      value: t("stat3Value"),
      label: t("stat3Label"),
      detail: t("stat3Detail"),
    },
    {
      value: t("stat4Value"),
      label: t("stat4Label"),
      detail: t("stat4Detail"),
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
