import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import DynamicIcon from "@/components/DynamicIcon";

export default function Toast({ toast, icon, children, type }) {
  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ scale: 0, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          exit={{ scale: 0, y: 20, opacity: 0 }}
          className=""
        >
          <div className="mb-4 flex w-auto items-center rounded-full bg-slate-800 px-4 py-2 text-center text-white">
            <DynamicIcon
              icon={icon}
              className={`${
                type === "success" ? "text-emerald-300" : "text-rose-300"
              } mr-1 h-4 w-4`}
            />
            <p className="text-xs font-medium">{children}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    visible: PropTypes.bool,
  }).isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};
