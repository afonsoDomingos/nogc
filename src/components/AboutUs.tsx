"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Compass, Eye, Award } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-orange" />,
      title: "Our Mission",
      description: "To deliver reliable, premium energy products and engineering services while upholding safety, operational excellence, and social responsibility in Mozambique.",
    },
    {
      icon: <Eye className="w-6 h-6 text-petroleum" />,
      title: "Our Vision",
      description: "To be recognized as the leading Mozambican energy conglomerate, pioneering innovation, technological progress, and a transition to clean energy.",
    },
    {
      icon: <Compass className="w-6 h-6 text-orange" />,
      title: "Core Values",
      description: "Integrity, safety compliance, environmental stewardship, local talent empowerment, and compliance with the highest international standards.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Decorative gradient spot */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-petroleum/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text block (Left Column) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-orange block mb-3">
                Institutional Profile
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
                A Mozambican Reference in the <br />
                <span className="text-petroleum text-glow-petroleum">Global Energy Landscape</span>
              </h2>
              <p className="text-slate-300 font-light leading-relaxed mb-6">
                National Oil & Gas Company (NOGC) SA is a leading corporate entity based in Mozambique. We are dedicated to building a resilient, advanced, and self-sufficient energy sector. Our operations bridge the extraction, processing, and distribution of critical fossil resources, whilst laying the groundwork for a transition to renewable energy sources.
              </p>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Operating from our main headquarters in Matola, Maputo, we represent Mozambican talent and potential. We partner with international developers, local industrial actors, and public stakeholders to deliver state-of-the-art energy infrastructure and consulting.
              </p>
              
              <div className="flex items-center gap-4 p-4 rounded-xl glass-panel-light max-w-md">
                <div className="p-3 rounded-lg bg-petroleum/15 border border-petroleum/20">
                  <Award className="w-6 h-6 text-petroleum" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">ISO Compliant Operations</h4>
                  <p className="text-xs text-slate-400">Committed to international HSSE safety rules.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cards block (Right Column) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {values.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-6 rounded-2xl glass-panel hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden group hover:border-petroleum/30"
              >
                {/* Thin side bar glow */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-petroleum to-orange opacity-60 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex gap-4 items-start pl-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
