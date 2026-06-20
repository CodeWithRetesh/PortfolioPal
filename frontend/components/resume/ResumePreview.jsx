"use client";

import { forwardRef } from "react";

const ResumePreview = forwardRef(({ resume }, ref) => {
  if (!resume) return null;

  return (
    <div
      ref={ref}
      className="bg-white text-black p-8 rounded-xl shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6">
        Professional Resume
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Professional Summary
        </h2>
        <p className="mt-2">{resume.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {(
            Array.isArray(resume.skills)
              ? resume.skills
              : typeof resume.skills === "string"
              ? resume.skills.split(",")
              : []
          ).map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              {typeof skill === "string" ? skill.trim() : skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2">
          Experience
        </h2>

{Array.isArray(resume.experience) &&
    resume.experience.map((exp, index) => (
    <div key={index} className="mt-4">
            <h3 className="font-bold">{exp.title}</h3>
            <p>{exp.company}</p>

        {exp.startDate && exp.endDate && (
        <p className="text-sm text-gray-600">
        {exp.startDate} - {exp.endDate}
        </p>
        )}

    <ul className="list-disc ml-6 mt-2">
    {exp.description?.map((item, i) => (
    <li key={i}>{item}</li>
  ))}
  </ul>
  </div>
  ))}
  </section>

<section>
  <h2 className="text-xl font-semibold border-b pb-2">
    Projects
    </h2>

{Array.isArray(resume.projects) && (
    resume.projects.map((project, index) => (
    <div key={index} className="mt-4">
         <h3 className="font-bold">{project.title}</h3>
          <p>{project.description}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;