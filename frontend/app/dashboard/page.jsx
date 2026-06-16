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

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    //-------------------
    // USER
    //-------------------

    const userRes = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await userRes.json();

    if (userData.success) {
      setUser(userData.user);
    }

    //-------------------
    // PORTFOLIOS
    //-------------------

    const portfolioRes = await fetch(
      "http://localhost:5000/api/v1/portfolios",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const portfolioData =
      await portfolioRes.json();

    if (portfolioData.success) {
      setPortfolios(
        portfolioData.portfolios
      );
    }
  }

  function logout() {
    Cookies.remove("token");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <main className="flex-1 p-8">

        <DashboardHeader
          user={user}
          onLogout={logout}
          onNewPortfolio={() =>
            alert("Coming Soon 🚀")
          }
        />

        <DashboardStats
          total={portfolios.length}
        />

        <QuickActions />

        <div className="mt-10">

          <PortfolioGrid
            portfolios={portfolios}
          />

        </div>

      </main>

    </div>
  );
}