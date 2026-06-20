"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function AIPortfolioBuilderPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    domain: "",
    tone: "",
    targetAudience: "",
    skills: "",
    experience: "",
    projects: "",
    goals: "",
  });

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generatePortfolio() {
    try {
      setLoading(true);

      const token = Cookies.get("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/portfolio-builder/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setPortfolio(data.portfolio);
      } else {
        alert(data.message || "Portfolio generation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Portfolio generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function copyPortfolioJson() {
    try {
      if (!portfolio) return;
      await navigator.clipboard.writeText(
        JSON.stringify(portfolio, null, 2)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
      alert("Copy failed");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">
          AI Portfolio Builder 🚀
        </h1>

        <p className="text-slate-400 mb-8">
          Generate a complete portfolio blueprint from your profile, skills, and projects.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">
              Input Details
            </h2>

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <input
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
              placeholder="Role (e.g. Full Stack Developer)"
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <input
              value={formData.domain}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  domain: e.target.value,
                })
              }
              placeholder="Domain (e.g. AI, Web Dev, ML)"
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <input
              value={formData.tone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tone: e.target.value,
                })
              }
              placeholder="Tone (e.g. professional, modern, bold)"
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <input
              value={formData.targetAudience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetAudience: e.target.value,
                })
              }
              placeholder="Target Audience"
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <textarea
              value={formData.skills}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value,
                })
              }
              placeholder="Skills"
              rows={3}
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <textarea
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value,
                })
              }
              placeholder="Experience"
              rows={4}
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <textarea
              value={formData.projects}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projects: e.target.value,
                })
              }
              placeholder="Projects"
              rows={4}
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <textarea
              value={formData.goals}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  goals: e.target.value,
                })
              }
              placeholder="Portfolio Goals"
              rows={3}
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 outline-none"
            />

            <button
              onClick={generatePortfolio}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 py-3 rounded-lg font-semibold"
            >
              {loading ? "Generating..." : "Generate Portfolio"}
            </button>
          </div>

          <div className="space-y-6">
            {portfolio ? (
              <>
                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {portfolio.title}
                      </h2>
                      <p className="text-slate-400 mt-2">
                        {portfolio.tagline}
                      </p>
                    </div>

                    <button
                      onClick={copyPortfolioJson}
                      className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"
                    >
                      {copied ? "Copied" : "Copy JSON"}
                    </button>
                  </div>

                  <p className="mt-5 text-slate-300 leading-7">
                    {portfolio.summary}
                  </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Hero Section
                  </h3>
                  <p className="font-semibold text-lg">
                    {portfolio.hero?.headline}
                  </p>
                  <p className="text-slate-400 mt-2">
                    {portfolio.hero?.subheadline}
                  </p>
                  <p className="text-blue-400 mt-3">
                    CTA: {portfolio.hero?.cta}
                  </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(portfolio.skills) &&
                      portfolio.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-slate-800 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Featured Projects
                  </h3>

                  <div className="space-y-4">
                    {Array.isArray(portfolio.featuredProjects) &&
                      portfolio.featuredProjects.map((project, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800"
                        >
                          <h4 className="font-semibold text-lg">
                            {project.title}
                          </h4>
                          <p className="text-slate-400 mt-2">
                            {project.description}
                          </p>
                          <p className="text-slate-500 mt-2 text-sm">
                            Impact: {project.impact}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Experience Highlights
                  </h3>

                  <div className="space-y-4">
                    {Array.isArray(portfolio.experienceHighlights) &&
                      portfolio.experienceHighlights.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800"
                        >
                          <h4 className="font-semibold">
                            {item.role}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {item.company}
                          </p>
                          <ul className="list-disc ml-5 mt-3 text-slate-300 space-y-1">
                            {Array.isArray(item.bullets) &&
                              item.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Extra Sections
                  </h3>

                  <div className="space-y-3">
                    {Array.isArray(portfolio.sections) &&
                      portfolio.sections.map((section, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800"
                        >
                          <h4 className="font-semibold">
                            {section.title}
                          </h4>
                          <p className="text-slate-400 mt-2">
                            {section.content}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    Theme & SEO
                  </h3>

                  <p className="text-slate-300">
                    Primary: {portfolio.theme?.primaryColor}
                  </p>
                  <p className="text-slate-300">
                    Secondary: {portfolio.theme?.secondaryColor}
                  </p>
                  <p className="text-slate-300">
                    Accent: {portfolio.theme?.accentColor}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {Array.isArray(portfolio.seoKeywords) &&
                      portfolio.seoKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-slate-800 text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-slate-400">
                Generated portfolio preview will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}