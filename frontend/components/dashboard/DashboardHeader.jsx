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
          Welcome {user?.full_name} 👋
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onNewPortfolio}>
          + New Portfolio
        </Button>

        <Button
          variant="danger"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>

    </div>
  );
}