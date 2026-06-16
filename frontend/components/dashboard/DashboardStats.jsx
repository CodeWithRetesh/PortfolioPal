"use client";

import StatCard from "./StatCard";

export default function DashboardStats({
  total,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-5 mb-8">

      <StatCard
        title="Total Portfolios"
        value={total}
        color="bg-blue-600"
      />

      <StatCard
        title="Published"
        value={total}
        color="bg-green-600"
      />

      <StatCard
        title="Drafts"
        value={0}
        color="bg-gray-700"
      />

    </div>
  );
}