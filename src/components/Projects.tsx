"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Rovuma Basin LNG Development",
      category: "Natural Gas & LNG",
      location: "Cabo Delgado, Mozambique",
      description: "Engineering and construction of offshore subsea collecting systems and processing plants for Mozambique's flagship natural gas fields.",
      image: "/project_lng.png",
    },
    {
      title: "Matola Marine Logistics Fleet",
      category: "Deepwater Operations",
      location: "Maputo Bay, Mozambique",
      description: "Managing deepwater energy vessel operations, offshore drilling logistics, and marine transport of refined petroleum assets.",
      image: "/project_drilling.png",
    },
    {
      title: "Mocuba Utility Solar Facility",
      category: "Renewable Energy",
      location: "Zambezia, Mozambique",
      description: "Installation and operation of 40MW utility-scale photovoltaic grid infrastructure, feeding stable clean energy to local grids.",
      image: "/project_solar.png",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange block mb-3">
              Strategic Portfolio
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              Leading Strategic Energy Projects
            </h2>
          </div>
          <p className="text-slate-400 font-light max-w-md mt-4 md:mt-0">
            NOGC actively invests in state-of-the-art infrastructure assets that build Mozambique's energy independence and power domestic heavy industry.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
            >
              {/* Background Image */}
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="(max-w-768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Project Card Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                {/* Category Badge */}
                <span className="w-fit px-3 py-1 rounded-full bg-orange/95 text-[10px] font-bold uppercase tracking-wider text-white mb-4">
                  {proj.category}
                </span>

                <h3 className="font-display font-bold text-2xl text-white mb-2 leading-tight group-hover:text-petroleum transition-colors">
                  {proj.title}
                </h3>
                
                <p className="text-xs text-slate-400 font-medium mb-4">
                  {proj.location}
                </p>

                {/* Animated Drawer for project details */}
                <div className="h-0 opacity-0 overflow-hidden group-hover:h-20 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <hr className="border-white/10 my-4" />

                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span>View Project Case Study</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange group-hover:border-orange group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
