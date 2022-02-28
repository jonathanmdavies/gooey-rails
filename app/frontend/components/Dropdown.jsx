import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import propTypes from "prop-types";
import DynamicIcon from "@/components/DynamicIcon";

export default function Dropdown({
  button,
  primaryItems,
  secondaryItems,
  position,
}) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="trasform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`${position} absolute w-56 origin-top-left overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm`}
        >
          <div className="">
            {primaryItems.map((item) => (
              <Menu.Item key={item.label}>
                <Link
                  href={item.href}
                  method={item.method}
                  as="button"
                  className="group flex w-full items-center border-t border-slate-100 px-4 py-2 font-mono text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <DynamicIcon
                    icon={item.icon}
                    className="mr-2 h-4 w-4 text-slate-500"
                  />
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
            {secondaryItems.map((item) => (
              <Menu.Item key={item.label}>
                <Link
                  href={item.href}
                  method={item.method}
                  as="button"
                  className="group flex w-full items-center border-t border-slate-100 px-4 py-2 font-mono text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                >
                  <DynamicIcon
                    icon={item.icon}
                    className="mr-2 h-4 w-4 text-rose-400"
                  />
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

Dropdown.propTypes = {
  button: propTypes.node.isRequired,
  primaryItems: propTypes.arrayOf(propTypes.object),
  secondaryItems: propTypes.arrayOf(propTypes.object),
  position: propTypes.string.isRequired,
};

Dropdown.defaultProps = {
  primaryItems: [],
  secondaryItems: [],
};
