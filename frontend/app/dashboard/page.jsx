"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PortfolioGrid from "@/components/dashboard/PortfolioGrid";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadDashboard() {
    try {
      const token = Cookies.get("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const userRes = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok || !userData.success) {
        Cookies.remove("token");
        router.replace("/login");
        return;
      }

      setUser(userData.user);

      const portfolioRes = await fetch(
        "http://localhost:5000/api/v1/portfolios/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const portfolioData = await portfolioRes.json();

      if (portfolioRes.ok && portfolioData.success) {
        setPortfolios(portfolioData.portfolios || []);
      } else {
        setPortfolios([]);
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
      Cookies.remove("token");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    Cookies.remove("token");
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8 bg-slate-950">
        <DashboardHeader
          user={user}
          onLogout={logout}
          onNewPortfolio={() => alert("Coming Soon 🚀")}
        />

        <DashboardStats total={portfolios.length} />

        <QuickActions />

        <div className="mt-10">
          <PortfolioGrid portfolios={portfolios} />
        </div>

        <div className="mt-6">
          <a
            href="/dashboard/resume-builder"
            className="inline-block bg-purple-600 px-4 py-2 rounded"
          >
            AI Resume Builder
          </a>
        </div>
      </main>
    </div>
  );
}