"use client";

import { useEffect, useState } from "react";
import { Mail, Clock, RefreshCw, User, FileText, CheckCircle2 } from "lucide-react";

interface InboxMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsDashboard() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMsg, setActiveMsg] = useState<InboxMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        if (data.length > 0) {
          setActiveMsg(data[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching inbox:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400 gap-3">
        <RefreshCw className="w-5 h-5 animate-spin text-petroleum" />
        <span>Loading inbox messages...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-white">Contact Inbox</h1>
          <p className="text-sm text-slate-400 mt-1">
            Read and manage inquiries submitted by visitors via the corporate contact form
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-slate-300 bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Inbox</span>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl">
          <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white">No messages found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            When users submit the contact form on the home page, their inquiries will show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Messages list (Left) */}
          <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {messages.map((msg) => {
              const isActive = activeMsg?._id === msg._id;
              const dateStr = new Date(msg.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              
              return (
                <div
                  key={msg._id}
                  onClick={() => setActiveMsg(msg)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? "bg-slate-900/80 border-petroleum/60 shadow-lg"
                      : "bg-slate-900/30 border-white/5 hover:bg-slate-900/50"
                  }`}
                >
                  {/* Left orange highlight bar for selected */}
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange" />}

                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-semibold text-sm text-white truncate max-w-[180px]">
                      {msg.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 shrink-0 font-medium">
                      <Clock className="w-3 h-3" />
                      {dateStr}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-semibold truncate mb-1.5">
                    {msg.subject || "No Subject"}
                  </p>
                  
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Message Reader (Right) */}
          <div className="lg:col-span-7">
            {activeMsg && (
              <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6">
                
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/5 pb-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-white">
                      <User className="w-4 h-4 text-orange" />
                      <h2 className="font-semibold text-lg">{activeMsg.name}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs hover:text-petroleum transition-colors">
                      <Mail className="w-3.5 h-3.5 text-petroleum" />
                      <a href={`mailto:${activeMsg.email}`}>{activeMsg.email}</a>
                    </div>
                  </div>

                  <div className="text-slate-500 text-xs font-semibold bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(activeMsg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold border-b border-white/5 pb-2">
                    <FileText className="w-4 h-4 text-orange" />
                    <span>Subject: {activeMsg.subject || "No Subject"}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/5 min-h-[200px]">
                    <p className="text-slate-300 text-sm font-light leading-relaxed whitespace-pre-wrap">
                      {activeMsg.message}
                    </p>
                  </div>
                </div>

                {/* Footer utility buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <a
                    href={`mailto:${activeMsg.email}?subject=RE: ${encodeURIComponent(
                      activeMsg.subject || "NOGC Inquiry"
                    )}`}
                    className="px-6 py-3 rounded-xl font-semibold text-xs tracking-wider text-white bg-petroleum hover:bg-orange transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply by Email</span>
                  </a>
                </div>

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
