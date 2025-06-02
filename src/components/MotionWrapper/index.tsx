"use client";

import { AnimatePresence, motion } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  duration?: number;
}

export default function MotionWrapper({
  children,
  duration = 1,
}: MotionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration }}
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