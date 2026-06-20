"use client";

import { useRef, useState } from "react";
import Cookies from "js-cookie";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ResumePreview from "@/components/resume/ResumePreview";

export default function ResumeBuilderPage() {
  const resumeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateResume() {
    console.log("Generate button clicked");
    
    try {
      setLoading(true);

      const token = Cookies.get("token");

      const response = await fetch(
        "http://localhost:5000/api/v1/resume/generate",
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

      console.log("FULL RESPONSE:", data);
      console.log("RESUME:", data.resume);

      if (data.success) {
      console.log(data);
      alert(JSON.stringify(data, null, 2));
      setResume(data.resume);
       }

   else {
        alert(data.message || "Resume generation failed");
      }
    } catch (error) {
      console.error(error);
      alert("Resume generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    try {
      if (!resumeRef.current) {
        alert("Resume not ready");
        return;
      }

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error(error);
      alert("PDF Download Failed");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        AI Resume Builder 📄
      </h1>

      <div className="grid gap-4">
        <input
          placeholder="Name"
          className="p-3 rounded bg-zinc-900"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Skills"
          className="p-3 rounded bg-zinc-900"
          rows={3}
          onChange={(e) =>
            setFormData({
              ...formData,
              skills: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Education"
          className="p-3 rounded bg-zinc-900"
          rows={3}
          onChange={(e) =>
            setFormData({
              ...formData,
              education: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Experience"
          className="p-3 rounded bg-zinc-900"
          rows={4}
          onChange={(e) =>
            setFormData({
              ...formData,
              experience: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Projects"
          className="p-3 rounded bg-zinc-900"
          rows={4}
          onChange={(e) =>
            setFormData({
              ...formData,
              projects: e.target.value,
            })
          }
        />

        <button
          onClick={generateResume}
          className="bg-blue-600 py-3 rounded"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {resume && (
        <div className="mt-6">
          <button
            onClick={downloadPDF}
            className="bg-green-600 px-4 py-2 rounded mb-4"
          >
            Download PDF
          </button>

          <ResumePreview ref={resumeRef} resume={resume} />
        </div>
      )}
    </div>
  );
}