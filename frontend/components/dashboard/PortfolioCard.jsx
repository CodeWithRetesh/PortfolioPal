"use client";

import {
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

export default function PortfolioCard({
  portfolio,
}) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl border p-6 transition">

      <h2 className="text-2xl font-bold">
        {portfolio.title}
      </h2>

      <p className="text-gray-500 mt-3">
        {portfolio.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-5">

        {portfolio.tech_stack
          ?.split(",")
          .map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm"
            >
              {tech.trim()}
            </span>
          ))}

      </div>

      <div className="flex gap-3 mt-6">

        <a
          href={portfolio.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-black text-white rounded-lg py-2 flex justify-center items-center gap-2"
        >
          <FaGithub />
          GitHub
        </a>

        <a
          href={portfolio.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex justify-center items-center gap-2"
        >
          <FaGlobe />
          Live
        </a>

      </div>

    </div>
  );
}