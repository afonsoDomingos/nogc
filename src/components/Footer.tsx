"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle bottom-right glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-petroleum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tier 1: Links and Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-petroleum to-darkblue border border-white/10 shadow-md">
                <span className="font-display font-extrabold text-sm text-white">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base leading-tight tracking-wider text-white">
                  NOGC
                </span>
                <span className="text-[9px] text-slate-400 font-semibold tracking-widest uppercase">
                  National Oil & Gas
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              National Oil & Gas Company SA is Mozambique's premier corporate energy supplier. We integrate upstream exploration with downstream infrastructure and renewable energy systems.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange hover:border-orange/30 transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange hover:border-orange/30 transition-all duration-300"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-orange hover:border-orange/30 transition-all duration-300"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#home" className="text-xs text-slate-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs text-slate-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-xs text-slate-400 hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#projects" className="text-xs text-slate-400 hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#esg" className="text-xs text-slate-400 hover:text-white transition-colors">
                  ESG Commitments
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Operations</h4>
            <ul className="space-y-2.5">
              <li className="text-xs text-slate-400">Oil Exploration & Drilling</li>
              <li className="text-xs text-slate-400">Natural Gas & LNG Processing</li>
              <li className="text-xs text-slate-400">International Petroleum Trading</li>
              <li className="text-xs text-slate-400">Industrial Energy Infrastructure</li>
              <li className="text-xs text-slate-400">Renewable Grid Installations</li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">HQ Contact Info</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-normal">
                  Avenida 25 de Setembro Nº571, Fomento, Matola, Moçambique
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-petroleum shrink-0" />
                <a href="tel:+258843019001" className="text-xs text-slate-400 hover:text-white transition-colors">
                  (+258) 843019001
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange shrink-0" />
                <a href="mailto:aguinaldo.emilio@nogc.co.mz" className="text-xs text-slate-400 hover:text-white transition-colors">
                  aguinaldo.emilio@nogc.co.mz
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-petroleum shrink-0" />
                <a href="https://www.nogc.co.mz" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors">
                  www.nogc.co.mz
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-white/5 my-8" />

        {/* Tier 2: Copyright & Regulatory */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {currentYear} National Oil & Gas Company SA (NOGC). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-slate-500 hover:text-slate-300 font-medium transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] text-slate-500 hover:text-slate-300 font-medium transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[10px] text-slate-500 hover:text-slate-300 font-medium transition-colors">
              Regulatory Disclosure
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
