"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

interface ProjectItem {
  title_en: string;
  title_pt: string;
  category_en: string;
  category_pt: string;
  location_en: string;
  location_pt: string;
  description_en: string;
  description_pt: string;
  image: string;
}

interface ProjectsProps {
  content?: ProjectItem[];
}

export default function Projects({ content }: ProjectsProps) {
  const { language, t } = useLanguage();

  const defaultProjects = [
    {
      title: t("proj1Title"),
      category: t("proj1Cat"),
      location: t("proj1Loc"),
      description: t("proj1Desc"),
      image: "/project_lng.png",
    },
    {
      title: t("proj2Title"),
      category: t("proj2Cat"),
      location: t("proj2Loc"),
      description: t("proj2Desc"),
      image: "/project_drilling.png",
    },
    {
      title: t("proj3Title"),
      category: t("proj3Cat"),
      location: t("proj3Loc"),
      description: t("proj3Desc"),
      image: "/project_solar.png",
    },
  ];

  const projectsList = content && content.length > 0
    ? content.map((item) => ({
        title: language === "en" ? item.title_en : item.title_pt,
        category: language === "en" ? item.category_en : item.category_pt,
        location: language === "en" ? item.location_en : item.location_pt,
        description: language === "en" ? item.description_en : item.description_pt,
        image: item.image,
      }))
    : defaultProjects;

  return (
    <section id="projects" className="py-24 bg-slate-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange block mb-3">
              {t("projectsTag")}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white">
              {t("projectsTitle")}
            </h2>
          </div>
          <p className="text-slate-400 font-light max-w-md mt-4 md:mt-0">
            {t("projectsSub")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsList.map((proj, idx) => (
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
                  <span>{t("projCaseStudy")}</span>
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
