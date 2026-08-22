import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 | Page Not Found";
    return () => {
      document.title = "Abhishek Kumar Yadav";
    };
  }, []);

  return (
    <div className="h-[calc(100dvh-5rem)] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      <div className="text-center w-full max-w-sm sm:max-w-md">
        <div className="relative mb-8 sm:mb-10 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[8rem] sm:text-[12rem] md:text-[14rem] font-black select-none text-gray-900 dark:text-white leading-none pointer-events-none"
          >
            404
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="absolute text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Page not found
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-sm sm:text-[15px] font-light leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Either this page ran away, or you made a typo. My money's on you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[13px] font-medium tracking-wide hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FiArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Go Back
          </button>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[13px] font-medium tracking-wide hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FiHome size={14} />
            Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
