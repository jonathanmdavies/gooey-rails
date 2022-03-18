/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import Tippy from "@tippyjs/react/headless";
import propTypes from "prop-types";
import { useSpring, motion } from "framer-motion";

export default function Tooltip({ content, children }) {
  const springConfig = { damping: 50, stiffness: 500 };
  const initialScale = 0.2;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }) => {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  return (
    <Tippy
      animation
      onMount={onMount}
      onHide={onHide}
      render={(attrs) => (
        <motion.div
          style={{ scale, opacity }}
          className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 px-3 py-1 text-xs font-medium text-white"
          role="tooltip"
          {...attrs}
        >
          {content}
        </motion.div>
      )}
    >
      {children}
    </Tippy>
  );
}

Tooltip.propTypes = {
  content: propTypes.string.isRequired,
  children: propTypes.element.isRequired,
};
