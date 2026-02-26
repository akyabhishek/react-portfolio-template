import { motion } from "framer-motion";
import CVNav from "@/components/modern-resume/CVNav";
import CVHero from "@/components/modern-resume/CVHero";
import CVExperience from "@/components/modern-resume/CVExperience";
import CVSkills from "@/components/modern-resume/CVSkills";
import CVProjects from "@/components/modern-resume/CVProjects";
import CVEducation from "@/components/modern-resume/CVEducation";
import CVFooter from "@/components/modern-resume/CVFooter";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function ModernResume() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white selection:bg-purple-500/30 selection:text-white font-['Inter',_sans-serif] antialiased">
      {/* Scroll progress bar */}
      <ScrollProgress className="h-[3px] bg-gradient-to-r from-purple-500 via-emerald-500 to-blue-500" />

      <CVNav />
      <CVHero />

      {/* Sections with subtle separator gradients */}
      <div className="relative">
        {/* Background noise texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.015]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
        </div>

        {/* Purple glow behind Experience */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100/40 dark:from-purple-900/20 via-transparent to-transparent pointer-events-none" />
          <CVExperience />
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </motion.div>

        {/* Emerald glow behind Skills */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/40 dark:from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
          <CVSkills />
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </motion.div>

        {/* Blue glow behind Projects */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 dark:from-blue-900/20 via-transparent to-transparent pointer-events-none" />
          <CVProjects />
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </motion.div>

        {/* Orange glow behind Education */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-100/30 dark:from-orange-900/15 via-transparent to-transparent pointer-events-none" />
          <CVEducation />
        </div>
      </div>

      <CVFooter />
    </div>
  );
}
