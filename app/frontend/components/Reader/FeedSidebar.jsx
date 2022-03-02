import React, { Fragment, useRef } from "react";
import {
  ChevronRightIcon,
  CollectionIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Tab, Disclosure, Transition } from "@headlessui/react";

export default function FeedSidebar() {
  const accordianRef = useRef(null);

  const feeds = [
    {
      name: "Daring Fireball",
      url: "https://daringfireball.net/feeds/json",
      status: "Active",
      group: "Apple",
      favicon: "https://daringfireball.net/graphics/apple-touch-icon.png",
      unread: 5,
    },
    {
      name: "The Verge",
      url: "https://theverge.com/feeds/index.xml",
      status: "Active",
      group: "Apple",
      favicon:
        "https://cdn.vox-cdn.com/uploads/chorus_asset/file/9672633/VergeOG.0_1200x627.0.png",
      unread: 25,
    },
  ];
  return (
    <div className="relative w-80 border-r border-slate-100 px-3 pt-2">
      <div className="sticky top-2">
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
              <Disclosure as="div" defaultOpen className="mb-4">
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
                    <Transition
                      as={Fragment}
                      enter="transition-all ease-in duration-500"
                      enterFrom="max-h-0 transition-all"
                      enterTo="max-h-40 transition-all"
                      leave="transition-all ease-out duration-500"
                      leaveFrom="max-h-40 transition-all"
                      leaveTo="max-h-0 transition-all"
                    >
                      <Disclosure.Panel
                        as="div"
                        className="mx-7 space-y-3 overflow-hidden"
                      >
                        <div ref={accordianRef} className="space-y-3 py-4">
                          {feeds.map((feed) => (
                            <div key={feed.id} className="flex items-center">
                              <img
                                src={feed.favicon}
                                alt=""
                                className="mr-2 h-4 w-4 rounded-full object-cover"
                              />
                              <span className="text-sm font-medium text-slate-700">
                                {feed.name}
                              </span>
                              <span className="ml-auto font-mono text-xs font-semibold text-slate-400">
                                {feed.unread}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </Transition>
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
    </div>
  );
}
