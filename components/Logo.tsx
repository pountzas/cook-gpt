"use client";

import { motion } from "framer-motion";
import CookGPTLogo from "../public/assets/svg/CookGPTLogo";

function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", damping: 10, stiffness: 400 }}
      className="motion"
    >
      <CookGPTLogo size={250} />
    </motion.div>
  );
}

export default Logo;
