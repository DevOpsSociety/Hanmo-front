"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function MotionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 1 }}
        variants={{
          initial: {
            opacity: 0,
          },
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
