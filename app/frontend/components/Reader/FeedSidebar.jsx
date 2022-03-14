import React, { Fragment, useRef } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import {
  ChevronRightIcon,
  CollectionIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Tab, Disclosure } from "@headlessui/react";
import { items_path, feed_item_path } from "@/routes";

export default function FeedSidebar() {
  const accordianRef = useRef(null);
  const { feeds } = usePage().props;
  const { url } = usePage();

  return (
    <div className="relative w-80 overflow-y-scroll border-r border-slate-100 bg-slate-50">
      <div className="sticky top-2 p-4">
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-full border border-slate-100 bg-white p-1 shadow-sm">
            <Tab className="flex w-full items-center justify-center rounded-full border border-slate-100 bg-gradient-to-br from-slate-700 to-slate-800 py-2 font-mono text-sm font-semibold text-slate-100 transition hover:text-slate-200 active:scale-95">
              <EyeIcon className="h-4 w-4 " />
              <span className="sr-only">Unread Items</span>
            </Tab>
            <Tab className="flex w-full items-center justify-center rounded-full bg-slate-50 py-2 font-mono text-sm font-semibold text-slate-400 transition active:scale-95 active:text-cyan-500">
              <CollectionIcon className="h-4 w-4" />
              <span className="sr-only">All Items</span>
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-4 overflow-y-scroll">
            <Tab.Panel className="">
              <Link
                href={items_path()}
                className={`${
                  url.startsWith("/items")
                    ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                } flex w-full items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition `}
              >
                All Unread
              </Link>
              <Disclosure
                as="div"
                defaultOpen
                className="mb-4 mt-8 active:outline-none"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between px-4 hover:text-slate-700">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        All Feeds
                      </span>
                      <ChevronRightIcon
                        className={`${
                          open ? "rotate-90" : "rotate-180"
                        }  h-4 w-4 text-slate-500 transition-all`}
                      />
                    </Disclosure.Button>

                    <Disclosure.Panel
                      as="div"
                      className=" space-y-3 overflow-hidden"
                    >
                      <div ref={accordianRef} className="mt-2 space-y-2">
                        {feeds.map((feed) => (
                          <Link
                            href={feed_item_path(feed.id, feed.first_item)}
                            preserveScroll
                            key={feed.id}
                            className={`${
                              url.startsWith(
                                feed_item_path(feed.id, feed.first_item)
                              )
                                ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                            } sidebar-item-link flex w-full items-center justify-between rounded-full px-4 py-2 text-sm font-semibold  transition `}
                          >
                            <span className="text-sm font-medium">
                              {feed.name}
                            </span>
                            <span className="ml-auto font-mono text-xs font-semibold text-slate-400">
                              10
                            </span>
                          </Link>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
