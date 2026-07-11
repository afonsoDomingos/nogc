"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-petroleum/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info block (Left) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-orange block mb-3">
                {t("contactTag")}
              </span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
                {t("contactTitleLine1")} <br />
                <span className="text-petroleum text-glow-petroleum">{t("contactTitleLine2")}</span>
              </h2>
              <p className="text-slate-300 font-light leading-relaxed mb-8">
                {t("contactSub")}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 shadow-md">
                    <Phone className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t("contactPhone")}</h4>
                    <p className="text-sm font-semibold text-white hover:text-orange transition-colors">
                      <a href="tel:+258843019001">(+258) 843019001</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 shadow-md">
                    <Mail className="w-5 h-5 text-petroleum" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t("contactEmail")}</h4>
                    <p className="text-sm font-semibold text-white hover:text-petroleum transition-colors">
                      <a href="mailto:aguinaldo.emilio@nogc.co.mz">aguinaldo.emilio@nogc.co.mz</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 shadow-md">
                    <MapPin className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{t("contactAddress")}</h4>
                    <p className="text-sm font-semibold text-slate-200">
                      Avenida 25 de Setembro Nº571, Fomento, Matola, Moçambique
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form block (Right) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 md:p-10 rounded-3xl glass-panel relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {t("contactLabelName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contactPlaceholderName")}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-petroleum transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {t("contactLabelEmail")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contactPlaceholderEmail")}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-petroleum transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {t("contactLabelSubject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder={t("contactPlaceholderSubject")}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-petroleum transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {t("contactLabelMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contactPlaceholderMessage")}
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-petroleum transition-colors text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className="w-full md:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-white bg-gradient-to-r from-petroleum to-darkblue hover:from-orange hover:to-orange transition-all duration-300 border border-white/10 shadow-lg hover:shadow-orange/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("contactBtnSending")}
                      </>
                    ) : (
                      <>
                        {t("contactBtnSend")}
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Submission State feedback overlays */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center text-center p-8 z-20"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
                    <h3 className="font-display font-bold text-2xl text-white mb-2">{t("contactSuccessTitle")}</h3>
                    <p className="text-sm text-slate-400 max-w-sm">
                      {t("contactSuccessDesc")}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-xs font-semibold text-orange underline uppercase tracking-widest hover:text-white"
                    >
                      {t("contactSuccessBtn")}
                    </button>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{t("contactErrorFields")}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
