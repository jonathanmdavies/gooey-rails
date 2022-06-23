import React, { Fragment } from "react";
import propTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import DynamicIcon from "../DynamicIcon";

export default function Modal({
  open,
  icon,
  close,
  title,
  subtitle,
  children,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" fixed inset-0 bg-slate-500 bg-opacity-50 backdrop-blur backdrop-filter transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg ">
                <div
                  id="modal"
                  className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-tl from-slate-100 to-slate-50 p-6"
                >
                  {/* <div className="w-86 absolute top-0 right-0 z-20 h-32 rounded-full bg-gradient-to-r from-cyan-200 via-rose-200 to-violet-200 opacity-70 blur-2xl" /> */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500">
                    <DynamicIcon icon={icon} className="h-4 w-4 text-white" />
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-medium text-slate-800"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-px">
                      <p className="font-mono text-xs text-slate-500">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  open: propTypes.bool.isRequired,
  icon: propTypes.string.isRequired,
  close: propTypes.func.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};
