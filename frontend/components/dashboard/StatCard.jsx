"use client";

export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className={`${color} rounded-xl shadow p-6`}>
      <p className="text-gray-100">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3 text-white">
        {value}
      </h2>
    </div>
  );
}