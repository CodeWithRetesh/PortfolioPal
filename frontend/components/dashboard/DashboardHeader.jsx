"use client";

import Button from "../common/Button";

export default function DashboardHeader({
  user,
  onLogout,
  onNewPortfolio,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome {user?.full_name || "User"} 👋
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onNewPortfolio} variant="primary">
          <a
         href="/dashboard/resume-builder"
         >
        <Button variant="success">
           AI Resume Builder
        </Button>
        </a>
        </Button>

        <Button onClick={onLogout} variant="danger">
          Logout
        </Button>
      </div>
    </div>
  );
}