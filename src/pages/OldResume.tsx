import { TracingBeam } from "@/components/ui/tracing-beam";
import { Separator } from "@/components/ui/separator";
import {
  personalInfo,
  experienceData,
  projectsData,
  educationData,
  achievementsData,
  certificationsData,
  skillSummaryData,
} from "@/config/data";

export default function OldResume(): JSX.Element {
  return (
    <>
      <TracingBeam className="px-6 pb-20">
        <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-4 space-x-3 pt-4">
          {/* Resume Card */}
          <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6">
            {/* Header Section: Name & Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
                {personalInfo.name}
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300">
                {personalInfo.title}
              </p>
              <div className="text-sm mt-2 space-x-3 text-gray-600">
                <a href={`tel:+91${personalInfo.phone}`}>
                  <i className="fas fa-phone"></i> {personalInfo.phone}
                </a>
                <a href={`mailto:${personalInfo.email}`}>
                  <i className="fas fa-envelope"></i> {personalInfo.email}
                </a>
                <a href={personalInfo.linkedinUrl}>
                  <i className="fab fa-linkedin"></i> {personalInfo.linkedin}
                </a>
                <a href={personalInfo.githubUrl}>
                  <i className="fab fa-github"></i> {personalInfo.github}
                </a>
              </div>
            </div>
            <Separator className="my-4" />

            {/* Professional Experience Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">
                Professional Experience
              </h2>
              {experienceData.map((exp, idx) => (
                <div className="mb-6" key={idx}>
                  <h3 className="text-xl">
                    {exp.certificateUrl ? (
                      <a href={exp.certificateUrl}>{exp.company}</a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {exp.title} | {exp.from} - {exp.to}
                    {exp.location ? ` | ${exp.location}` : ""}
                  </p>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="list-disc pl-5 mt-2 text-sm font-extralight">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            {/* Personal Projects Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Personal Projects</h2>
              {projectsData
                .filter((p) => p.bullets && p.bullets.length > 0)
                .map((project, idx) => (
                  <div className="mb-6" key={idx}>
                    <h3 className="text-xl">
                      <a
                        href={project.github || project.liveUrl}
                        className="text-blue-600"
                      >
                        {project.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                    <p className="mt-2">
                      <strong>Technologies Used:</strong>{" "}
                      {project.techStack.join(", ")}
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                      {project.bullets!.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </section>

            {/* Technical Skills Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">
                Technical Skills and Interests
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {skillSummaryData.slice(0, 4).map((cat, idx) => (
                    <p key={idx}>
                      <strong>{cat.category}:</strong> {cat.items.join(", ")}
                    </p>
                  ))}
                </div>
                <div>
                  {skillSummaryData.slice(4).map((cat, idx) => (
                    <p key={idx}>
                      <strong>{cat.category}:</strong> {cat.items.join(", ")}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Achievements</h2>
              {achievementsData.map((a, idx) => (
                <div className="mb-6" key={idx}>
                  <p>
                    <strong>{a.title}</strong>{" "}
                    {a.url ? (
                      <a href={a.url} className="text-blue-600">
                        {a.platform}
                      </a>
                    ) : (
                      a.platform
                    )}{" "}
                    - {a.year}
                  </p>
                </div>
              ))}
            </section>

            {/* Education Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Education</h2>
              {educationData.map((edu, idx) => (
                <div className="mb-6" key={idx}>
                  <h3 className="text-xl font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.degree} | {edu.score} | {edu.year}
                  </p>
                </div>
              ))}
            </section>

            {/* Certifications Section */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Certifications</h2>
              <ul className="list-disc pl-5">
                {certificationsData.map((cert, idx) => (
                  <li key={idx}>
                    <a href={cert.url} className="text-blue-600">
                      {cert.title} - {cert.platform}
                    </a>{" "}
                    - {cert.year}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </TracingBeam>
    </>
  );
}
