"use client";

import { useEffect, useState } from "react";
import { Upload, Save, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function AdminContentDashboard() {
  const [content, setContent] = useState<any>(null);
  const [hero, setHero] = useState<any>({
    tag_en: "",
    tag_pt: "",
    titleLine1_en: "",
    titleLine1_pt: "",
    titleLine2_en: "",
    titleLine2_pt: "",
    sub_en: "",
    sub_pt: "",
    bgImage: "",
  });
  
  const [activeTab, setActiveTab] = useState<"hero" | "raw">("hero");
  const [rawJson, setRawJson] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      if (res.ok && !data.fallback) {
        setContent(data.data);
        setHero(data.data.hero || {});
        setRawJson(JSON.stringify(data.data, null, 2));
      } else {
        // Use static placeholders template
        const defaults = {
          hero: {
            tag_en: "Mozambique's Energy Partner",
            tag_pt: "Parceiro Energético de Moçambique",
            titleLine1_en: "Powering Mozambique's",
            titleLine1_pt: "Impulsionando o Futuro",
            titleLine2_en: "Energy Future",
            titleLine2_pt: "Energético de Moçambique",
            sub_en: "Delivering innovative, reliable, and sustainable solutions in the Oil & Gas industry, steering Mozambique toward industrial leadership and economic development.",
            sub_pt: "Fornecendo soluções inovadoras, fiáveis e sustentáveis na indústria de Petróleo & Gás, conduzindo Moçambique para a liderança industrial e desenvolvimento económico.",
            bgImage: "/hero_offshore.png"
          },
          services: [],
          projects: [],
          news: []
        };
        setContent(defaults);
        setHero(defaults.hero);
        setRawJson(JSON.stringify(defaults, null, 2));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setHero({ ...hero, bgImage: data.url });
        setMessage({ type: "success", text: "Image uploaded successfully to Cloudinary!" });
      } else {
        setMessage({ type: "error", text: data.error || "Image upload failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong during upload." });
    } finally {
      setUploading(false);
    }
  };

  const saveHeroContent = async () => {
    setSaving(true);
    setMessage(null);

    const updatedContent = {
      ...content,
      hero,
    };

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContent),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Hero banner content saved successfully!" });
        setContent(data.data);
        setRawJson(JSON.stringify(data.data, null, 2));
      } else {
        setMessage({ type: "error", text: data.error || "Save failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Could not save content. Server error." });
    } finally {
      setSaving(false);
    }
  };

  const saveRawJson = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const parsed = JSON.parse(rawJson);
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Structured site content saved successfully!" });
        setContent(data.data);
        setHero(data.data.hero || {});
      } else {
        setMessage({ type: "error", text: data.error || "Save failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Invalid JSON format. Please verify syntax." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400 gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-petroleum" />
        <span>Loading current portal configurations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Content Editor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your corporate texts, banner images, and structured JSON site variables
          </p>
        </div>
      </div>

      {/* Message Notifications */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Navigation tabs */}
      <div className="flex border-b border-white/5 gap-2">
        <button
          onClick={() => setActiveTab("hero")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === "hero" ? "border-orange text-orange" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Hero Banner Configuration
        </button>
        <button
          onClick={() => setActiveTab("raw")}
          className={`px-6 py-3 font-semibold text-sm border-b-2 transition-all ${
            activeTab === "raw" ? "border-orange text-orange" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Structured Section Editor (JSON)
        </button>
      </div>

      {/* TAB CONTENT: HERO */}
      {activeTab === "hero" && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* English Texts */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-orange uppercase tracking-widest border-b border-white/5 pb-2">
                English Copy
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tagline</label>
                <input
                  type="text"
                  name="tag_en"
                  value={hero.tag_en}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title Line 1</label>
                <input
                  type="text"
                  name="titleLine1_en"
                  value={hero.titleLine1_en}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title Line 2</label>
                <input
                  type="text"
                  name="titleLine2_en"
                  value={hero.titleLine2_en}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subtitle</label>
                <textarea
                  name="sub_en"
                  rows={3}
                  value={hero.sub_en}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm resize-none"
                />
              </div>
            </div>

            {/* Portuguese Texts */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-orange uppercase tracking-widest border-b border-white/5 pb-2">
                Portuguese Copy
              </h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tagline (PT)</label>
                <input
                  type="text"
                  name="tag_pt"
                  value={hero.tag_pt}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title Line 1 (PT)</label>
                <input
                  type="text"
                  name="titleLine1_pt"
                  value={hero.titleLine1_pt}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Title Line 2 (PT)</label>
                <input
                  type="text"
                  name="titleLine2_pt"
                  value={hero.titleLine2_pt}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subtitle (PT)</label>
                <textarea
                  name="sub_pt"
                  rows={3}
                  value={hero.sub_pt}
                  onChange={handleHeroChange}
                  className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm resize-none"
                />
              </div>
            </div>

          </div>

          <hr className="border-white/5" />

          {/* Banner Media Config */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-orange uppercase tracking-widest border-b border-white/5 pb-2">
              Banner Media (Cloudinary Upload)
            </h3>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Image Preview */}
              <div className="relative w-40 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0 flex items-center justify-center">
                {hero.bgImage ? (
                  <img src={hero.bgImage} alt="Hero banner preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-500">No Image</span>
                )}
              </div>

              <div className="space-y-3 flex-grow">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Image Source URL</label>
                  <input
                    type="text"
                    name="bgImage"
                    value={hero.bgImage}
                    onChange={handleHeroChange}
                    placeholder="https://cloudinary.com/..."
                    className="w-full px-5 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-petroleum text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="relative cursor-pointer px-6 py-3 rounded-xl font-semibold text-xs tracking-wider text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4 text-orange" />
                    <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                  {uploading && <div className="w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" />}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              onClick={saveHeroContent}
              disabled={saving}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white bg-petroleum hover:bg-orange transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Hero Section"}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RAW JSON (Services/Projects/News edits) */}
      {activeTab === "raw" && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-orange uppercase tracking-widest">
              Direct Document Edit (JSON)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This panel lets you directly modify arrays of Services, Projects, and News. Verify JSON syntax and brace closures before saving.
            </p>
          </div>

          <div>
            <textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              rows={24}
              className="w-full p-6 rounded-2xl bg-slate-950 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-petroleum leading-relaxed resize-y"
            />
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              onClick={saveRawJson}
              disabled={saving}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white bg-petroleum hover:bg-orange transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Dynamic Settings"}</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
