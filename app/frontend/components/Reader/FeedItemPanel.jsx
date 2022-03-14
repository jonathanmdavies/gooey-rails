/* eslint-disable react/no-danger */
import React, { useEffect } from "react";
import { ExternalLinkIcon, EyeOffIcon, StarIcon } from "@heroicons/react/solid";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { feed_item_path } from "@/routes";

export default function FeedItemPanel() {
  const { item } = usePage().props;

  function downHandler({ key }) {
    if (key === "j") {
      Inertia.visit(feed_item_path(item.feed_id, item.next), {
        preserveState: true,
        preserveScroll: true,
      });
    }

    if (key === "k") {
      Inertia.visit(feed_item_path(item.feed_id, item.previous), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  });

  if (item) {
    return (
      <div className="flex flex-1 flex-col self-stretch overflow-y-scroll bg-white">
        <div className="sticky top-0 border-b border-slate-100 bg-slate-50/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-2">
            <div className="">
              <h1 className="font-mono text-sm font-semibold text-slate-800">
                {item.title}
              </h1>
              <h6 className="font-mono text-xs text-slate-400">
                {new Date(item.published_at).toLocaleDateString()}
              </h6>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
              >
                <StarIcon className="h-4 w-4 text-white" />
              </button>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
              >
                <EyeOffIcon className="h-4 w-4 text-white" />
              </button>
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-400 text-white hover:text-slate-200 active:scale-95"
              >
                <ExternalLinkIcon className="h-4 w-4 " />
              </button>
            </div>
          </div>
        </div>
        <div className="prose prose-cyan max-w-3xl self-center p-6">
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    );
  }

  return <div className="">nothing to see here.</div>;
}
