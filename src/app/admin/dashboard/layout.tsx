"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Mail, LogOut, ArrowLeft, Loader } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        
        if (res.ok && data.authenticated) {
          setAuthorized(true);
        } else {
          router.push("/admin");
        }
      } catch (err) {
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth", { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 gap-3">
        <Loader className="w-6 h-6 animate-spin text-petroleum" />
        <span>Verifying credentials...</span>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  const navItems = [
    { label: "Content Editor", href: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Contact Inbox", href: "/admin/dashboard/contacts", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-white font-sans">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 flex flex-col justify-between py-6 px-4 hidden md:flex shrink-0">
        <div className="flex flex-col gap-8">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-petroleum to-darkblue border border-white/10 shadow-md">
              <span className="font-display font-extrabold text-sm text-white">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-white">NOGC Admin</span>
              <span className="text-[8px] text-slate-500 font-semibold uppercase tracking-widest">Portal Manager</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-petroleum text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col gap-2">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to site</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors w-full text-left cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden bg-slate-900 border-b border-white/5 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-petroleum to-darkblue border border-white/10">
              <span className="font-display font-extrabold text-sm text-white">N</span>
            </div>
            <span className="font-display font-bold text-sm tracking-wider">NOGC Admin</span>
          </div>

          <div className="flex items-center gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg ${pathname === item.href ? "text-petroleum" : "text-slate-400"}`}
                title={item.label}
              >
                {item.icon}
              </a>
            ))}
            <button onClick={handleLogout} className="p-2 rounded-lg text-rose-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic page render */}
        <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
