import { Helmet } from "react-helmet";
import { skillsData } from "@/config/skillsData";
import { slugify } from "@/utils/utils";

export default function SkillsPage() {
  return (
    <>
      <Helmet>
        <title>Skills – Technical Expertise & Proficiency</title>
        <meta
          name="description"
          content="A full breakdown of my technical skills across languages, frameworks, databases, DevOps, tools and more."
        />
        <meta
          name="keywords"
          content="skills, technical skills, programming languages, frameworks, tools, proficiency"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://abhishekkumaryadav.in/skills" />
      </Helmet>

      <main className="mt-14 min-h-screen px-4 py-10 max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            My technical skills and expertise
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {skillsData.map((category) => (
            <section
              key={category.category}
              id={slugify(category.category)}
              className="scroll-mt-24"
            >
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 mb-5">
                {category.categoryIcon && (
                  <span className="text-emerald-600 text-2xl">
                    {category.categoryIcon}
                  </span>
                )}
                {category.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.items.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors duration-200"
                  >
                    {skill.icon && (
                      <span className="text-3xl text-black dark:text-gray-200 flex-shrink-0 mt-0.5">
                        {skill.icon}
                      </span>
                    )}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          {skill.level}
                        </span>
                        {skill.experience && (
                          <span className="text-[11px] text-slate-500 dark:text-gray-500">
                            · {skill.experience}
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed mt-1">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
