import React, { Fragment, useRef } from "react";
import {
  ChevronRightIcon,
  CollectionIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Tab, Disclosure } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { unread_index_path, feed_unread_index_path } from "@/routes";

export default function Sidebar() {
  const accordianRef = useRef(null);
  const { feeds, feed } = usePage().props;

  return (
    <div className="sticky top-2 overflow-y-scroll">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-full border border-slate-100 bg-white p-1">
          <Tab className="flex w-full items-center justify-center rounded-full border border-slate-100 bg-gradient-to-br from-slate-700 to-slate-800 py-2 font-mono text-sm font-semibold text-slate-100 transition hover:text-slate-200 active:scale-95">
            <EyeIcon className="h-4 w-4 " />
            <span className="sr-only">Unread Items</span>
          </Tab>
          <Tab className="flex w-full items-center justify-center rounded-full bg-gray-50 py-2 font-mono text-sm font-semibold text-slate-400 transition active:scale-95 active:text-cyan-500">
            <CollectionIcon className="h-4 w-4" />
            <span className="sr-only">All Items</span>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel className="">
            <div className="mx-2">
              <Link
                href={unread_index_path()}
                className="block w-full rounded-lg bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
              >
                All Unread
              </Link>
            </div>
            <Disclosure as="div" defaultOpen className="mt-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center px-2">
                    <ChevronRightIcon
                      className={`${
                        open ? "rotate-90" : ""
                      } mr-1  h-4 w-4 transition-all `}
                    />
                    <span className="font-mono text-sm font-medium text-slate-800">
                      All Feeds
                    </span>
                  </Disclosure.Button>
                  {/* <Transition
                    appear={true}
                    as={Fragment}
                    enter="transition-all ease-in duration-500"
                    enterFrom="max-h-0 transition-all"
                    enterTo="max-h-40 transition-all"
                    leave="transition-all ease-out duration-500"
                    leaveFrom="max-h-40 transition-all"
                    leaveTo="max-h-0 transition-all"
                  > */}
                  <Disclosure.Panel
                    as="div"
                    className="mx-2 space-y-3 overflow-hidden"
                  >
                    <div ref={accordianRef} className="mt-4 space-y-1">
                      {feeds.map(({ id, name, unread }) => (
                        <Link
                          href={feed_unread_index_path(id)}
                          className={`${
                            feed?.id === id ? "bg-cyan-100" : ""
                          } flex items-center rounded-lg px-3 py-2`}
                          preserveState
                        >
                          <span className="text-sm font-medium text-slate-700 transition-all active:scale-95">
                            {name}
                          </span>
                          <span className="ml-auto font-mono text-xs font-semibold text-slate-400">
                            {unread}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </Disclosure.Panel>
                  {/* </Transition> */}
                </>
              )}
            </Disclosure>
            <div className="flex items-center px-2">
              <ChevronRightIcon className="mr-1 h-4 w-4" />
              <span className="font-mono text-sm font-medium text-slate-800">
                Groups
              </span>
            </div>
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
