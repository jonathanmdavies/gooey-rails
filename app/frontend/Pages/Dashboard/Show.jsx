import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { item_path } from "@/routes";

export default function Show() {
  const {
    items,
    items_published_today,
    unread_items_count,
    unread_bookmarks_count,
    current_account,
  } = usePage().props;
  const firstName = current_account.first_name;

  return (
    <Authenticated>
      <div className="mx-auto max-w-7xl px-6">
        <div className="my-12 flex items-center justify-between border-b border-slate-100 pb-12">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-700">
              Welcome, {firstName}
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-400">
              {items_published_today} Items Published Today
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
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Recently Published
            </h2>
          </div>

          <ul className="no-scrollbar mt-4 flex snap-x space-x-8 overflow-x-scroll">
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
      </div>
    </Authenticated>
  );
}
