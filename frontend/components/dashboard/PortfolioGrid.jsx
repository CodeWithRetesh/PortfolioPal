"use client";

import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid({
  portfolios,
}) {
  if (portfolios.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">
        No Portfolios Found.
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
        />
      ))}

    </div>
  );
}