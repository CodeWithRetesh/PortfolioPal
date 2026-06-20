"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/ai/projects/my-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects || []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error(error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id) {
    const confirmDelete = confirm("Delete this project?");
    if (!confirmDelete) return;

    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:5000/api/v1/ai/projects/project/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchProjects();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  if (loading) {
    return (
      <p className="p-8 text-white">
        Loading...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        My AI Projects 🚀
      </h1>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No saved projects found.
        </p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
            >
              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="text-gray-400 mt-2">
                {project.domain}
              </p>

              <p className="text-gray-500 mt-1">
                {project.difficulty}
              </p>

              <div className="flex gap-4 mt-4">
                <a
                  href={`/dashboard/my-projects/${project.id}`}
                  className="bg-blue-600 px-4 py-2 rounded text-white"
                >
                  View
                </a>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="bg-red-600 px-4 py-2 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}