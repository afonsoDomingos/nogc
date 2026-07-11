"use client";

import { motion } from "framer-motion";
import {
  Search,
  Flame,
  Globe2,
  Cpu,
  Layers,
  BarChart3,
  Truck,
  Sun,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Desc"),
      icon: <Search className="w-6 h-6 text-orange" />,
    },
    {
      title: t("service2Title"),
      description: t("service2Desc"),
      icon: <Flame className="w-6 h-6 text-petroleum" />,
    },
    {
      title: t("service3Title"),
      description: t("service3Desc"),
      icon: <Globe2 className="w-6 h-6 text-orange" />,
    },
    {
      title: t("service4Title"),
      description: t("service4Desc"),
      icon: <Cpu className="w-6 h-6 text-petroleum" />,
    },
    {
      title: t("service5Title"),
      description: t("service5Desc"),
      icon: <Layers className="w-6 h-6 text-orange" />,
    },
    {
      title: t("service6Title"),
      description: t("service6Desc"),
      icon: <BarChart3 className="w-6 h-6 text-petroleum" />,
    },
    {
      title: t("service7Title"),
      description: t("service7Desc"),
      icon: <Truck className="w-6 h-6 text-orange" />,
    },
    {
      title: t("service8Title"),
      description: t("service8Desc"),
      icon: <Sun className="w-6 h-6 text-petroleum" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/40 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-petroleum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-orange">
              {t("servicesTag")}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-6">
              {t("servicesTitle")}
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              {t("servicesSub")}
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="p-6 rounded-2xl glass-panel hover:bg-slate-900/90 transition-all duration-300 group relative flex flex-col justify-between hover:scale-[1.02] gradient-border-glow hover:shadow-xl hover:shadow-petroleum/5"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-950/80 border border-white/5 mb-6 group-hover:border-petroleum/30 group-hover:bg-slate-900 transition-colors">
                  {svc.icon}
                </div>

                <h3 className="font-display font-semibold text-lg text-white mb-3 group-hover:text-orange transition-colors">
                  {svc.title}
                </h3>
                
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-white transition-colors">
                <span>{t("serviceLearnMore")}</span>
                <ArrowUpRight className="w-4 h-4 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
