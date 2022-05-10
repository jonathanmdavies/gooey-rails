import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link, usePage } from "@inertiajs/inertia-react";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import Authenticated from "@/Layouts/Authenticated";
import { item_path } from "@/routes";
import DynamicIcon from "@/components/DynamicIcon";

export default function Show() {
  const {
    items,
    items_published_today,
    unread_items_count,
    unread_bookmarks_count,
    current_account,
    bookmarked_items,
  } = usePage().props;
  const firstName = current_account.first_name;

  return (
    <Authenticated>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between border-b border-slate-100 pb-12">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-700">
              Welcome, {firstName}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-400">
              {items_published_today} New Items Published Today
            </p>
          </div>

          <ul className="flex divide-x divide-slate-200">
            <li className="pr-4">
              <div className="text-2xl font-bold text-slate-700">
                {unread_items_count}
              </div>
              <div className="text-xs font-medium text-slate-400">
                Unread Items
              </div>
            </li>
            <li className="pl-4">
              <div className="text-2xl font-bold text-slate-700">
                {unread_bookmarks_count}
              </div>
              <div className="text-xs font-medium text-slate-400">
                Unread Bookmarks
              </div>
            </li>
          </ul>
        </div>

        <div className="my-12 mx-auto">
          <div className="mb-4 flex justify-between">
            <SectionHeading icon="NewspaperIcon">
              Recently Published
            </SectionHeading>
          </div>

          <ul className="no-scrollbar flex snap-x space-x-8 overflow-x-scroll">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item_path(item.id)}
                  className="relative block h-48 w-[370px] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-slate-100 p-8 shadow-sm transition"
                >
                  <div className="z-20 flex h-full flex-col justify-between">
                    <div className="">
                      <h4 className="text-sm font-medium text-slate-400">
                        {item.feed.name}
                      </h4>
                      <h3 className="line-clamp-2 mt-1 font-semibold text-slate-700">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-mono text-xs text-slate-500">
                        Published {item.published_at_in_words} ago
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 z-10 h-12 w-60 rounded-full bg-gradient-to-r from-cyan-200 via-rose-200 to-violet-200 opacity-60 blur-2xl" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="col-span-1">
            <BookmarkedItems bookmarked_items={bookmarked_items} />
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

function BookmarkedItems({ bookmarked_items }) {
  const [filter, setFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState(bookmarked_items);

  useEffect(() => {
    if (filter === "all") {
      setFilteredItems(bookmarked_items);
    } else if (filter === "unread") {
      setFilteredItems(bookmarked_items.filter((item) => !item.read_at));
    } else if (filter === "read") {
      setFilteredItems(bookmarked_items.filter((item) => item.read_at));
    } else {
      throw new Error("Unknown filter – not implemented");
    }
  }, [filter]);

  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between">
        <SectionHeading icon="StarIcon">Recently Bookmarked</SectionHeading>

        <span className="relative z-0 inline-flex">
          <button
            onClick={() => setFilter("all")}
            type="button"
            className={`${
              filter === "all"
                ? " border-cyan-600 font-medium text-slate-600"
                : "border-transparent text-xs text-slate-500"
            } relative mx-2 border-b-2 py-0.5 text-xs transition`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            type="button"
            className={`${
              filter === "unread"
                ? "border-cyan-500 font-medium text-slate-600"
                : "border-transparent text-xs text-slate-500"
            } relative  mx-2 border-b-2 py-0.5 text-xs text-slate-500 transition`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            type="button"
            className={`${
              filter === "read"
                ? "border-cyan-500 font-medium text-slate-600"
                : "border-transparent text-xs text-slate-500"
            } relative ml-2 border-b-2 py-0.5 text-xs text-slate-500`}
          >
            Read
          </button>
        </span>
      </div>
      <ul className="divide-y divide-slate-100">
        {filteredItems.map((item) => (
          <li key={item.id} className="py-2">
            <Link
              href={item_path(item.id)}
              className="group flex items-center justify-between"
            >
              <div className="truncate">
                <span className="text-sm font-medium text-slate-600 transition group-hover:text-slate-500">
                  {item.title}
                </span>
                <p className="mt-1 text-xs text-slate-500">{item.feed.name}</p>
              </div>
              <ArrowCircleRightIcon className="ml-2 h-4 w-4 flex-shrink-0 text-slate-300 transition group-hover:text-slate-400" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

BookmarkedItems.propTypes = {
  bookmarked_items: propTypes.arrayOf(propTypes.object).isRequired,
};

function SectionHeading({ children, icon }) {
  return (
    <h2 className="flex items-center text-lg font-semibold text-slate-700">
      <DynamicIcon icon={icon} className="mr-1 h-5 w-5 text-slate-700" />
      {children}
    </h2>
  );
}

SectionHeading.propTypes = {
  icon: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};