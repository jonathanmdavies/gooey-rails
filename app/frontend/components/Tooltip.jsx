import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useFloating, shift, flip, offset } from "@floating-ui/react-dom";
import propTypes from "prop-types";

export default function Tooltip({ tooltipContent, button }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const { x, y, reference, floating, strategy } = useFloating({
    placement: "top",
    middleware: [shift(), flip(), offset(4)],
  });

  return (
    <div className="relative">
      <Transition
        show={showTooltip}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
          className="absolute w-auto whitespace-nowrap rounded-xl bg-slate-800 px-3 py-2 text-center font-mono text-xs font-medium text-white transition"
        >
          {tooltipContent}
        </div>
      </Transition>

      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        ref={reference}
        className=""
      >
        {button}
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  tooltipContent: propTypes.string.isRequired,
  button: propTypes.element.isRequired,
};
