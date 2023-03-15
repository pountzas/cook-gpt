"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function SunMotion() {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <motion.div
        //spin infinent

        animate={{ rotate: 300 }}
        // transition={{ repeat: Infinity }}
      >
        <SunIcon className="w-8 h-8" />
      </motion.div>
      <h2>Examples</h2>
    </div>
  );
}

export default SunMotion;
