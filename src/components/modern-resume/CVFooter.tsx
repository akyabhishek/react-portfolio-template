import { motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiArrowUp,
} from "react-icons/fi";
import { personalInfo } from "@/config/data";

export default function CVFooter() {
  return (
    <footer className="relative py-24 px-6">
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          >
            <span className="text-gray-900 dark:text-white">Let's Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-500 mb-10 max-w-md mx-auto text-[15px] leading-relaxed font-light"
          >
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950 text-[13px] font-medium tracking-wide hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300"
            >
              <FiMail size={15} />
              Get In Touch
            </a>
            <a
              href={personalInfo.resumePdfUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/[0.1] text-gray-500 dark:text-gray-300 text-[13px] font-light tracking-wide hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
            >
              <FiDownload size={15} />
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <div className="flex justify-center gap-4 mb-14">
            <motion.a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500/30 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-300"
            >
              <FiLinkedin size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
              className="p-3 rounded-full bg-black/5 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 hover:border-pink-300 dark:hover:border-pink-500/30 hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all duration-300"
            >
              <FiMail size={18} />
            </motion.a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors mb-8 uppercase tracking-[0.15em] font-light"
          >
            <FiArrowUp size={12} />
            Back to top
          </button>

          {/* Copyright */}
          <p className="text-[11px] text-gray-400 dark:text-gray-700 font-light tracking-wide">
            © {new Date().getFullYear()} {personalInfo.name}. Built with React &
            Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
