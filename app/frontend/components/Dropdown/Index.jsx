import React, { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  useFloating,
  shift,
  autoPlacement,
  offset,
  autoUpdate,
} from "@floating-ui/react-dom";
import propTypes from "prop-types";

import ReactPortal from "@/components/Portal";

export default function Dropdown({
  button,
  children,
  alignment = "left-start",
}) {
  const { x, y, reference, floating, strategy, update, refs } = useFloating({
    middleware: [shift(), offset(5), autoPlacement({ alignment })],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return undefined;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference, refs.floating, update]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button ref={reference} as={Fragment}>
        {button}
      </Menu.Button>
      <ReactPortal>
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
          }}
          className="w-56"
        >
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="trasform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right rounded-lg border border-slate-100 bg-white shadow-sm focus:outline-none">
              <div className="m-2 space-y-2">{children}</div>
            </Menu.Items>
          </Transition>
        </div>
      </ReactPortal>
    </Menu>
  );
}

Dropdown.propTypes = {
  button: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  alignment: propTypes.string,
};

Dropdown.defaultProps = {
  alignment: "left-start",
};
