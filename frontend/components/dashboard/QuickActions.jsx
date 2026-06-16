"use client";

import {
  FolderPlus,
  Sparkles,
  FileText,
} from "lucide-react";

export default function QuickActions() {
  return (
    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <button className="bg-zinc-900 text-white rounded-xl p-6 hover:bg-zinc-800">

        <FolderPlus className="mb-3" />

        Create Portfolio

      </button>

      <button className="bg-zinc-900 text-white rounded-xl p-6 hover:bg-zinc-800">

        <Sparkles className="mb-3" />

        AI Generator

      </button>

      <button className="bg-zinc-900 text-white rounded-xl p-6 hover:bg-zinc-800">

        <FileText className="mb-3" />

        Resume Builder

      </button>

    </div>
  );
}