"use client";

import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Portfolios",
      icon: FolderOpen,
    },
    {
      name: "AI Generator",
      icon: Sparkles,
    },
    {
      name: "Resume Builder",
      icon: FileText,
    },
    {
      name: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Portfolio
        <span className="text-blue-500">
          Pal
        </span>
      </h1>

      <nav className="space-y-3">

        {menu.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 hover:bg-zinc-800 transition"
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}

      </nav>

      <button className="flex items-center gap-3 mt-16 text-red-400">
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}