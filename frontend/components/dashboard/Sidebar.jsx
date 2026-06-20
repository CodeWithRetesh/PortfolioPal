"use client";

import Link from "next/link";
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
      path: "/dashboard",
    },
    {
      name: "My Portfolios",
      icon: FolderOpen,
      path: "/dashboard",
    },
    {
      name: "AI Portfolio Builder",
      icon: Sparkles,
      path: "/dashboard/ai-portfolio-builder",
    },
    {
      name: "My Projects",
      icon: FolderOpen,
      path: "/dashboard/my-projects",
    },
    {
      name: "AI Project Writer",
      icon: Sparkles,
      path: "/dashboard/ai-project-writer",
    },
    {
      name: "Resume Builder",
      icon: FileText,
      path: "/dashboard/resume-builder",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        Portfolio
        <span className="text-blue-500">Pal</span>
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 hover:bg-zinc-800 transition"
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <button className="flex items-center gap-3 mt-16 text-red-400">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}