"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  ShieldAlert,
  Sparkles,
  Users,
  Leaf,
  Activity,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const highlights = [
    {
      title: t("whyHl1Title"),
      description: t("whyHl1Desc"),
      icon: <FileCheck className="w-5 h-5 text-orange" />,
    },
    {
      title: t("whyHl2Title"),
      description: t("whyHl2Desc"),
      icon: <ShieldAlert className="w-5 h-5 text-petroleum" />,
    },
    {
      title: t("whyHl3Title"),
      description: t("whyHl3Desc"),
      icon: <Sparkles className="w-5 h-5 text-orange" />,
    },
    {
      title: t("whyHl4Title"),
      description: t("whyHl4Desc"),
      icon: <Users className="w-5 h-5 text-petroleum" />,
    },
    {
      title: t("whyHl5Title"),
      description: t("whyHl5Desc"),
      icon: <Leaf className="w-5 h-5 text-orange" />,
    },
    {
      title: t("whyHl6Title"),
      description: t("whyHl6Desc"),
      icon: <Activity className="w-5 h-5 text-petroleum" />,
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Decorative backdrop */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-darkblue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Layout: Text Left, Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-orange block mb-3">
                {t("whyTag")}
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
                {t("whyTitleLine1")} <br />
                <span className="text-petroleum text-glow-petroleum">{t("whyTitleLine2")}</span>
              </h2>
              <p className="text-slate-300 font-light leading-relaxed mb-6">
                {t("whyDesc1")}
              </p>
              <p className="text-slate-400 font-light leading-relaxed">
                {t("whyDesc2")}
              </p>
            </motion.div>
          </div>

          {/* Grid block */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((hl, idx) => (
              <motion.div
                key={hl.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-panel hover:bg-slate-900/60 transition-all duration-300 flex gap-4 hover:border-petroleum/30"
              >
                <div className="p-3 h-fit rounded-xl bg-slate-950/80 border border-white/5 shadow-inner">
                  {hl.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {hl.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {hl.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
