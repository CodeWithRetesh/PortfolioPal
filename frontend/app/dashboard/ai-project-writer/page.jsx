"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function AIProjectWriterPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    difficulty: "",
    techStack: "",
    programmingLanguage: "",
    goal: "",
    targetUsers: "",
    requirements: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function generateProject() {
    try {
      setLoading(true);

      const token = Cookies.get("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/ai/generate-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.message || "Generation failed");
      }
    } catch (error) {
      console.error("Generate Project Error:", error);
      alert("Generation Failed");
    } finally {
      setLoading(false);
    }
  }

  async function saveProject() {
    if (!result) {
      alert("Generate project first");
      return;
    }

    try {
      setSaving(true);

      const token = Cookies.get("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/ai/projects/save-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: result.title || form.title || "Untitled Project",
            domain: form.domain,
            difficulty: form.difficulty,
            content: result,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Project Saved Successfully 🚀");
      } else {
        alert(data.message || "Save failed");
      }
    } catch (error) {
      console.error("Save Project Error:", error);
      alert("Save Failed");
    } finally {
      setSaving(false);
    }
  }

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (value && typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }

    return value || "";
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">
          AI Project Writer 🚀
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="title"
            placeholder="Project Title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />

          <input
            name="domain"
            placeholder="Domain"
            value={form.domain}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />

          <input
            name="difficulty"
            placeholder="Difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />

          <input
            name="techStack"
            placeholder="Tech Stack"
            value={form.techStack}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />

          <input
            name="programmingLanguage"
            placeholder="Programming Language"
            value={form.programmingLanguage}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />

          <input
            name="targetUsers"
            placeholder="Target Users"
            value={form.targetUsers}
            onChange={handleChange}
            className="p-3 rounded border border-gray-500 bg-black text-white"
          />
        </div>

        <textarea
          name="goal"
          placeholder="Project Goal"
          value={form.goal}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-500 bg-black text-white mt-5"
          rows={4}
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={form.requirements}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-500 bg-black text-white mt-5"
          rows={4}
        />

        <button
          onClick={generateProject}
          disabled={loading}
          className="mt-6 bg-blue-600 px-6 py-3 rounded text-white font-semibold"
        >
          {loading ? "Generating..." : "Generate Project"}
        </button>

        {result && (
          <>
            <div className="mt-6">
              <button
                onClick={saveProject}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold"
              >
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>

            <div className="mt-12 space-y-8 text-white">
              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h2 className="text-4xl font-bold mb-4">
                  {renderValue(result.title)}
                </h2>
                <p className="text-gray-300 leading-7">
                  {renderValue(result.abstract)}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Problem Statement
                </h3>
                <p className="text-gray-300 leading-7">
                  {renderValue(result.problemStatement)}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Objectives
                </h3>
                <ul className="list-disc ml-6 text-gray-300 space-y-2">
                  {result.objectives?.map((item, index) => (
                    <li key={index}>{renderValue(item)}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Features
                </h3>
                <ul className="list-disc ml-6 text-gray-300 space-y-2">
                  {result.features?.map((item, index) => (
                    <li key={index}>{renderValue(item)}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Modules
                </h3>
                <ul className="space-y-3 text-gray-300">
                  {result.modules?.map((item, index) => (
                    <li key={index} className="border border-zinc-700 rounded p-3">
                      {typeof item === "object" && item !== null ? (
                        <>
                          <h4 className="font-semibold text-white">
                            {item.name || "Module"}
                          </h4>
                          <p className="text-gray-300">
                            {item.description || renderValue(item)}
                          </p>
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Tech Stack
                </h3>
                <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                  {renderValue(result.techStack)}
                </pre>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  System Architecture
                </h3>
                <p className="text-gray-300 leading-7">
                  {renderValue(result.systemArchitecture)}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Database Schema
                </h3>
                <pre className="text-gray-300 overflow-auto whitespace-pre-wrap text-sm">
                  {renderValue(result.databaseSchema)}
                </pre>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  API Endpoints
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {result.apiEndpoints?.map((item, index) => (
                    <li key={index}>{renderValue(item)}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Future Enhancements
                </h3>
                <ul className="list-disc ml-6 text-gray-300 space-y-2">
                  {result.futureEnhancements?.map((item, index) => (
                    <li key={index}>{renderValue(item)}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900 rounded-xl shadow p-6 border border-zinc-800">
                <h3 className="text-2xl font-bold mb-3">
                  Conclusion
                </h3>
                <p className="text-gray-300 leading-7">
                  {renderValue(result.conclusion)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}