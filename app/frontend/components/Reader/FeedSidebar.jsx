import React, { Fragment, useRef } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import {
  ChevronRightIcon,
  CollectionIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { items_path, unread_items_path } from "@/routes";

export default function FeedSidebar() {
  const accordianRef = useRef(null);
  const { feeds } = usePage().props;
  const { url } = usePage();

  return (
    <div className="relative w-80 border-r border-slate-100 bg-slate-50">
      <div className="sticky top-2 p-4">
        <div>
          <div className="flex space-x-2 rounded-full border border-slate-100 bg-white p-1 shadow-sm">
            <Link
              href={unread_items_path()}
              preserveState
              preserveScroll
              className={`${
                url.startsWith("/unread") || url === "/"
                  ? "text-slate-100"
                  : " text-slate-400"
              } relative flex w-full items-center justify-center rounded-full py-2 transition active:scale-95 active:text-cyan-500`}
            >
              {url.startsWith("/unread") || url === "/" ? (
                <motion.div
                  layoutId="bg"
                  className="absolute z-10 h-full w-full rounded-full bg-gradient-to-br from-slate-700 to-slate-800"
                />
              ) : null}

              <EyeIcon className="z-20 h-4 w-4" />
              <span className="sr-only">Unread Items</span>
            </Link>
            <Link
              href={items_path()}
              preserveState
              preserveScroll
              className={`${
                !url.startsWith("/unread") && url !== "/"
                  ? " text-slate-100"
                  : " text-slate-400"
              } relative flex w-full items-center justify-center rounded-full py-2 transition active:scale-95 active:text-cyan-500`}
            >
              {!url.startsWith("/unread") && url !== "/" ? (
                <motion.div
                  layoutId="bg"
                  className="absolute z-10 h-full w-full rounded-full bg-gradient-to-br from-slate-700 to-slate-800"
                />
              ) : null}
              <CollectionIcon className="z-20 h-4 w-4" />
              <span className="sr-only">All Items</span>
            </Link>
          </div>
          <div className="mt-4 overflow-y-scroll">
            <div className="">
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
                          <div className="">
                            {feed.first_item_url && (
                              <Link
                                href={feed.first_item_url}
                                preserveScroll
                                key={feed.id}
                                className={`${
                                  url.includes(`feeds/${feed.id}/`)
                                    ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                                } sidebar-item-link flex w-full items-center justify-between rounded-full px-4 py-1.5 text-sm transition-all duration-300`}
                              >
                                <span className="mr-2 min-w-0 truncate text-sm font-medium">
                                  {feed.name}
                                </span>
                                <span
                                  className={`${
                                    url.includes(`feeds/${feed.id}/`)
                                      ? "text-slate-100"
                                      : "text-slate-500"
                                  } ml-auto text-xs font-medium `}
                                >
                                  {feed.unread_items_count}
                                </span>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
