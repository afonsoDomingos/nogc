"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

interface HeroProps {
  content?: {
    tag_en: string;
    tag_pt: string;
    titleLine1_en: string;
    titleLine1_pt: string;
    titleLine2_en: string;
    titleLine2_pt: string;
    sub_en: string;
    sub_pt: string;
    bgImage: string;
  };
}

export default function Hero({ content }: HeroProps) {
  const { language, t } = useLanguage();

  // Dynamic values with static translations fallback
  const tag = content ? (language === "en" ? content.tag_en : content.tag_pt) : t("heroTag");
  const title1 = content ? (language === "en" ? content.titleLine1_en : content.titleLine1_pt) : t("heroTitleLine1");
  const title2 = content ? (language === "en" ? content.titleLine2_en : content.titleLine2_pt) : t("heroTitleLine2");
  const sub = content ? (language === "en" ? content.sub_en : content.sub_pt) : t("heroSub");
  const bgImage = content?.bgImage || "/hero_offshore.png";

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Image with optimized Next.js Image component */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Corporate banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105"
        />
        {/* Multilayered sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-20">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-petroleum/10 border border-petroleum/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              {tag}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-white mb-6 leading-[1.1]"
          >
            {title1} <br />
            <span className="bg-gradient-to-r from-petroleum via-sky-400 to-orange bg-clip-text text-transparent text-glow-petroleum">
              {title2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl"
          >
            {sub}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#about"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-petroleum to-darkblue hover:from-orange hover:to-orange transition-all duration-300 border border-white/10 hover:border-orange shadow-lg hover:shadow-orange/20 flex items-center gap-2 group"
            >
              {t("heroBtnAbout")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-slate-200 bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              {t("heroBtnContact")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
          {t("heroScroll")}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
