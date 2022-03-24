import React, { useRef } from "react";
import { usePage } from "@inertiajs/inertia-react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
} from "@heroicons/react/solid";
import Authenticated from "@/Layouts/Authenticated";

export default function Index() {
  const { items } = usePage().props;

  const scrollContainer = useRef(null);

  const goRight = (e) => {
    e.preventDefault();
    scrollContainer.current.scrollBy({ left: 480, behavior: "smooth" });
  };

  const goLeft = (e) => {
    e.preventDefault();
    scrollContainer.current.scrollBy({
      left: -480,
      behavior: "smooth",
    });
  };

  return (
    <Authenticated>
      <div className="mx-auto max-w-7xl px-6">
        <div className="my-12 flex items-center justify-between border-b border-slate-100 pb-12">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-700">
              Welcome, Jonathan
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-400">
              12 Items Publised Today
            </p>
          </div>

          <ul className="flex divide-x">
            <li className="px-2">
              <div className="text-2xl font-bold text-slate-700">
                150 <span className="text-sm text-slate-400">Items</span>
              </div>
              <div className="text-xs font-medium text-slate-400">
                Read this month
              </div>
            </li>
            <li className="px-2">
              {" "}
              <div className="text-2xl font-bold text-slate-700">38</div>
              <div className="text-xs font-medium text-slate-400">
                Unread Bookmarks
              </div>
            </li>
          </ul>
        </div>

        <div className="my-12">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Recently Published
            </h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={(e) => goLeft(e)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 transition hover:bg-slate-300 active:scale-95"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => goRight(e)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 transition hover:bg-slate-300 active:scale-95"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <ul
            ref={scrollContainer}
            className="no-scrollbar flex snap-x space-x-8 overflow-x-scroll py-6"
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="relative h-48 w-[380px] flex-shrink-0 snap-start overflow-hidden rounded-xl bg-slate-100 p-8 shadow shadow-cyan-500/10"
              >
                <div className="z-20 flex h-full flex-col justify-between">
                  <div className="">
                    <h4 className="text-sm font-medium text-slate-400">
                      {item.feed.name}
                    </h4>
                    <h3 className="mt-1 font-semibold text-slate-700 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-mono text-xs text-slate-500">
                      {new Date(item.published_at).toLocaleDateString()}
                    </p>
                    <button type="button">
                      <StarIcon className="h-4 w-4 text-cyan-500" />
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 z-10 h-12 w-60 rounded-full bg-gradient-to-r from-cyan-200 via-rose-200 to-violet-200 opacity-60 blur-2xl" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Authenticated>
  );
}
