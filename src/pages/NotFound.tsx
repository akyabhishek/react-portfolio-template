import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Page Not Found";
    return () => {
      document.title = "Abhishek Kumar Yadav";
    };
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* 404 watermark + heading */}
        <div className="relative mb-6 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.04, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[12rem] md:text-[16rem] font-black select-none text-gray-900 dark:text-white leading-none pointer-events-none"
          >
            404
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="absolute text-2xl md:text-3xl font-semibold tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Page not found
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 dark:text-gray-500 text-[14px] font-light leading-relaxed mb-10"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Link
            to="/home"
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-[13px] font-medium tracking-wide hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 transition-all duration-300"
          >
            Back to Home
            <FiArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
