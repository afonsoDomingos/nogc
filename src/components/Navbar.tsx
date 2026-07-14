"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("navHome"), href: "#home" },
    { label: t("navAbout"), href: "#about" },
    { label: t("navServices"), href: "#services" },
    { label: t("navWhy"), href: "#why-choose-us" },
    { label: t("navProjects"), href: "#projects" },
    { label: t("navEsg"), href: "#esg" },
    { label: t("navNews"), href: "#news" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 glass-panel shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logooficial.png"
                alt="NOGC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight tracking-wider text-white group-hover:text-petroleum transition-colors duration-300">
                NOGC
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                National Oil & Gas
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-orange transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-orange hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "pt" : "en")}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-petroleum" />
              <span>{language === "en" ? "PT" : "EN"}</span>
            </button>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold tracking-wide text-white rounded-full bg-gradient-to-r from-petroleum to-darkblue hover:from-orange hover:to-orange border border-white/10 transition-all duration-300 shadow-md hover:shadow-orange/20 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {t("navContact")} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === "en" ? "pt" : "en")}
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-petroleum" />
              <span>{language === "en" ? "PT" : "EN"}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-full max-w-xs glass-panel shadow-2xl transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "0px", height: "100vh" }}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-slate-800" />
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl bg-orange hover:bg-orange/95 transition-all text-center shadow-lg"
            >
              {t("navContact")} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
