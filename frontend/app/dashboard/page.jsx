"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const portfolioRes = await api.get("/portfolios/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data.user);
        setPortfolios(portfolioRes.data.portfolios);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Welcome {user?.full_name}
        </h1>
        <p className="text-gray-400 mb-8">{user?.email}</p>

        <h2 className="text-2xl font-semibold mb-4">My Portfolios</h2>

        <div className="grid gap-4">
          {portfolios.length === 0 ? (
            <p className="text-gray-400">No portfolios found.</p>
          ) : (
            portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-5"
              >
                <h3 className="text-xl font-semibold">{portfolio.title}</h3>
                <p className="text-gray-400 mt-2">{portfolio.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}