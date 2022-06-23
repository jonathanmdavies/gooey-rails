import React, { useRef } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  CollectionIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { classNames } from "@/utils";
import { items_path, unread_items_path } from "@/routes";
import BackgroundImage from "@/images/sidebar_background.jpg";
import GroupItem from "./FeedSidebar/GroupItem";
import NewGroupButton from "@/components/Reader/FeedSidebar/NewGroupButton";

export default function FeedSidebar() {
  const accordianRef = useRef(null);
  const { feeds, groups } = usePage().props;
  const { url } = usePage();

  return (
    <div className="relative w-80 border-r border-slate-100">
      <div className="sticky top-2 p-4">
        <div>
          <div className="flex space-x-2 rounded-full border border-slate-100 bg-white p-1">
            <Link
              href={unread_items_path()}
              preserveState
              preserveScroll
              className={classNames(
                "relative flex w-full items-center justify-center rounded-full py-2 transition active:scale-95",
                url.startsWith("/unread") || url === "/"
                  ? "text-slate-100"
                  : " text-slate-400"
              )}
            >
              {(url.startsWith("/unread") || url === "/") && (
                <motion.div
                  layoutId="bg"
                  className="absolute z-10 h-full w-full rounded-full bg-slate-800"
                />
              )}
              <EyeIcon className="z-20 h-4 w-4" />
              <span className="sr-only">Unread Items</span>
            </Link>
            <Link
              href={items_path()}
              preserveState
              preserveScroll
              className={classNames(
                "relative flex w-full items-center justify-center rounded-full py-2 transition active:scale-95",
                !url.startsWith("/unread") && url !== "/"
                  ? " text-slate-100"
                  : " text-slate-400"
              )}
            >
              {!url.startsWith("/unread") && url !== "/" && (
                <motion.div
                  layoutId="bg"
                  className="absolute z-10 h-full w-full rounded-full bg-slate-800"
                />
              )}
              <CollectionIcon className="z-20 h-4 w-4" />
              <span className="sr-only">All Items</span>
            </Link>
          </div>
          <div className="mt-4 overflow-y-scroll">
            <div className="">
              <Disclosure
                as="div"
                defaultOpen
                className="my-4 active:outline-none"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between px-4 hover:text-slate-700">
                      <span className="font-mono text-xs font-bold uppercase tracking-wide text-slate-700">
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
                                    ? "bg-white/60 text-slate-700 backdrop-blur"
                                    : " text-slate-600 backdrop-blur hover:bg-white/30"
                                } sidebar-item-link flex w-full items-center justify-between rounded-xl px-4 py-1.5 transition-all`}
                              >
                                <span className="mr-2 min-w-0 truncate text-sm font-medium">
                                  {feed.name}
                                </span>
                                <span
                                  className={`${
                                    url.includes(`feeds/${feed.id}/`)
                                      ? "text-slate-500"
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

            <div className="">
              <div className="mx-4 flex items-center justify-between">
                <div className="font-mono text-xs font-bold uppercase tracking-wide text-slate-700">
                  Groups
                </div>
                <NewGroupButton />
              </div>
              <ul className="mt-2 space-y-2">
                {groups.map((group) => (
                  <GroupItem key={group.id} group={group} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <img
        src={BackgroundImage}
        className="absolute inset-0 -z-10 h-full w-full object-fill opacity-10"
        alt="Sidebar Background"
      />
    </div>
  );
}
