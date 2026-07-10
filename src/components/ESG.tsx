"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Scale } from "lucide-react";

export default function ESG() {
  const cards = [
    {
      title: "Environmental Stewardship",
      letter: "E",
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      color: "border-green-500/20 hover:border-green-500/40 shadow-green-500/5",
      points: [
        "Transitioning pipeline facilities to low-emission tech.",
        "Developing 100+ MW of renewable energy by 2030.",
        "Strict bio-diversity protection policies in drilling zones.",
      ],
    },
    {
      title: "Social Development",
      letter: "S",
      icon: <Heart className="w-8 h-8 text-rose-400" />,
      color: "border-rose-500/20 hover:border-rose-500/40 shadow-rose-500/5",
      points: [
        "90% of our local workforce consists of Mozambican nationals.",
        "Empowering local communities through school and healthcare funding.",
        "Extensive HSSE training programs for field workers.",
      ],
    },
    {
      title: "Corporate Governance",
      letter: "G",
      icon: <Scale className="w-8 h-8 text-sky-400" />,
      color: "border-sky-500/20 hover:border-sky-500/40 shadow-sky-500/5",
      points: [
        "Zero-tolerance policy for corruption and anti-competitive practices.",
        "Transparent operational reporting aligned with international standard-setters.",
        "Board of directors composed of seasoned energy industry professionals.",
      ],
    },
  ];

  return (
    <section id="esg" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-petroleum/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

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
              Sustainability Framework
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mt-3 mb-6">
              Our Commitment to ESG
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              We operate under the firm belief that Mozambique's development must be sustainable, socially equitable, and built on transparent governance standards.
            </p>
          </motion.div>
        </div>

        {/* ESG Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`p-8 rounded-3xl glass-panel relative border transition-all duration-300 group hover:scale-[1.01] ${card.color} shadow-lg`}
            >
              {/* Giant background letter */}
              <div className="absolute top-4 right-8 font-display font-black text-8xl text-white/3 select-none pointer-events-none">
                {card.letter}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-950/80 border border-white/5 mb-8 shadow-inner group-hover:bg-slate-900 transition-colors">
                {card.icon}
              </div>

              <h3 className="font-display font-bold text-2xl text-white mb-6">
                {card.title}
              </h3>

              {/* Bullet points */}
              <ul className="space-y-4">
                {card.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {pt}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
