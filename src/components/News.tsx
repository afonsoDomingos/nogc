"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function News() {
  const articles = [
    {
      category: "Press Release",
      date: "July 08, 2026",
      title: "NOGC Expands Local Engineering Capacity in Matola",
      description: "Inaugurating our state-of-the-art training hub, offering ISO safety certifications and advanced fluid dynamics studies for Mozambican graduates.",
    },
    {
      category: "Sustainability",
      date: "June 24, 2026",
      title: "Mocuba Solar Project Reaches Full 40MW Grid Integration",
      description: "Successfully delivering clean electricity to the northern grid, offsetting over 25,000 tons of CO2 emissions annually.",
    },
    {
      category: "Operations",
      date: "May 15, 2026",
      title: "Strategic Marine Logistics Agreement Signed for Rovuma Basin",
      description: "Partnering with global maritime developers to deploy next-generation subsea infrastructure and pipeline monitoring vessels.",
    },
  ];

  return (
    <section id="news" className="py-24 bg-slate-900/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-orange">
              Media Relations
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-6">
              Latest Corporate News
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Stay up-to-date with NOGC's corporate milestones, strategic partnerships, and ongoing contributions to Mozambique's industrial growth.
            </p>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.article
              key={art.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-panel hover:bg-slate-900/60 transition-all duration-300 relative group flex flex-col justify-between hover:border-petroleum/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-6">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/5 text-orange uppercase tracking-wider text-[10px]">
                    {art.category}
                  </span>
                  <span>{art.date}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-4 group-hover:text-petroleum transition-colors leading-snug">
                  {art.title}
                </h3>
                
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-8">
                  {art.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors cursor-pointer w-fit">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
