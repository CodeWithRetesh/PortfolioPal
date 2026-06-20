"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function ProjectDetails() {
  const params = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      loadProject();
    }
  }, [params]);

  async function loadProject() {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:5000/api/v1/ai/projects/project/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProject(data.project);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:5000/api/v1/pdf/project/${project.id}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("PDF download failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `${project.project_data?.title || "project"}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("PDF Download Failed");
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8 text-white">
        Project not found
      </div>
    );
  }

  const p = project.project_data;

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">

        <h1 className="text-5xl font-bold">
          {p.title}
        </h1>

        <button
          onClick={downloadPDF}
          className="bg-green-600 px-5 py-2 rounded text-white mt-4"
        >
          Download PDF
        </button>

        <p className="text-gray-400 mt-4">
          {p.abstract}
        </p>

      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Problem Statement
        </h2>

        <p>{p.problemStatement}</p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Objectives
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          {p.objectives?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Features
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          {p.features?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Modules
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {p.modules?.map((module, index) => (
            <div
              key={index}
              className="border border-zinc-700 rounded-lg p-4"
            >
              <h3 className="font-bold text-xl">
                {module.name}
              </h3>

              <p className="text-gray-400 mt-2">
                {module.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <strong>Frontend:</strong>{" "}
            {p.techStack?.frontend}
          </div>

          <div>
            <strong>Backend:</strong>{" "}
            {p.techStack?.backend}
          </div>

          <div>
            <strong>Database:</strong>{" "}
            {p.techStack?.database}
          </div>

          <div>
            <strong>AI:</strong>{" "}
            {p.techStack?.ai}
          </div>

        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          API Endpoints
        </h2>

        <div className="space-y-4">
          {p.apiEndpoints?.map((api, index) => (
            <div
              key={index}
              className="border border-zinc-700 p-4 rounded"
            >
              <p>
                <strong>{api.method}</strong>{" "}
                {api.path}
              </p>

              <p className="text-gray-400">
                {api.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">
          Future Enhancements
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          {p.futureEnhancements?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-4">
          Conclusion
        </h2>

        <p>{p.conclusion}</p>
      </div>

    </div>
  );
}