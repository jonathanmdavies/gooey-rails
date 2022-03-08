import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import FeedSidebar from "@/components/Reader/FeedSidebar";
import FeedItemPanel from "@/components/Reader/FeedItemPanel";
import useIsVisible from "@/utils/hooks";

export default function Reader() {
  const { items, pagy } = usePage().props;
  const loadingPill = useRef(null);
  const isVisible = useIsVisible(loadingPill);

  const [scrollItems, setScrollItems] = useState([]);

  useEffect(() => {
    if (!isVisible || pagy.page === pagy.last) {
      return;
    }
    Inertia.visit(pagy.next_url, {
      preserveState: true,
      preserveScroll: true,
    });
  }, [isVisible]);

  useEffect(() => {
    setScrollItems([...scrollItems, ...items]);
  }, [items]);

  return (
    <div className="flex h-screen">
      <FeedSidebar />
      <div className="flex-1 overflow-y-scroll">
        <ul className="">
          {scrollItems?.map((item) => (
            <FeedItemPanel key={item.id} item={item} />
          ))}
        </ul>
        <div className="my-5 flex justify-center">
          {pagy.page === pagy.last && (
            <div className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 font-mono text-sm font-medium text-slate-500">
              <span>No More Items!</span>
            </div>
          )}
          {pagy.page < pagy.last && (
            <div
              ref={loadingPill}
              className="inline-flex animate-pulse items-center justify-center rounded-full bg-slate-100 px-4 py-2 font-mono text-sm font-medium text-slate-500"
            >
              <span>Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
