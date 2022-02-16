import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const states = [
  { id: 0, name: "All", online: true },
  { id: 1, name: "Active", online: true },
  { id: 2, name: "Inactive", online: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenu() {
  const [selected, setSelected] = useState(states[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            State
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 sm:text-sm">
              <div className="flex items-center">
                <span
                  aria-label={selected.online ? "Online" : "Offline"}
                  className={classNames(
                    selected.online ? "bg-green-400" : "bg-gray-200",
                    "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                  )}
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </div>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {states.map((state) => (
                  <Listbox.Option
                    key={state.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-cyan-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={state}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              state.online ? "bg-green-400" : "bg-gray-200",
                              "inline-block h-2 w-2 flex-shrink-0 rounded-full"
                            )}
                            aria-hidden="true"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {state.name}
                            <span className="sr-only">
                              {" "}
                              is {state.online ? "online" : "offline"}
                            </span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-cyan-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
