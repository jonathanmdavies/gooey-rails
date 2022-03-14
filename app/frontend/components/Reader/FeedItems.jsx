import React, { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Draggable from "react-draggable";

import { feed_item_path, item_path } from "@/routes";

function useResizableX(ref, key) {
  const getLocalState = () => localStorage.getItem(key);

  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [width, setWidth] = useState(getLocalState);

  const start = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(ref.current.offsetWidth);
  };

  const resize = (e) => {
    const diff = e.clientX - initialPos;
    const newSize = initialSize + diff;
    setWidth(`${newSize}px`);
  };

  const end = () => {
    window.localStorage.setItem(key, width);
  };

  return { start, resize, end, width };
}

export default function FeedItems() {
  const { items, item, feed } = usePage().props;

  const currentItem = item;

  const dynamicItemPath = (currentItemId) => {
    if (feed) {
      return feed_item_path(feed.id, currentItemId);
    }
    return item_path(currentItemId);
  };

  const resizeable = useRef(null);
  const { start, resize, width, end } = useResizableX(
    resizeable,
    "feed-sidebar"
  );

  return (
    <div
      ref={resizeable}
      style={{ width }}
      className="relative w-80 overflow-y-scroll border-r border-slate-100"
    >
      <button type="button" className="absolute right-0 flex h-full">
        <Draggable axis="x" onStart={start} onDrag={resize} onStop={end}>
          <div className="z-20 h-full w-1 cursor-col-resize transition hover:bg-cyan-500/50" />
        </Draggable>
      </button>
      <div className="divide-y divide-slate-100 overflow-y-scroll">
        {items.map(({ id, title, published_at }) => (
          <div key={id} className="w-full">
            <Link
              href={dynamicItemPath(id)}
              preserveScroll
              preserveState
              className={`${
                currentItem?.id === id ? "bg-white" : "bg-slate-50"
              } block p-3 transition hover:bg-slate-100 active:bg-white active:hover:bg-white`}
            >
              <h3 className="truncate text-sm font-medium text-slate-700">
                {title}
              </h3>
              <span className="mt-2 block font-mono text-xs text-slate-500">
                {" "}
                {new Date(published_at).toLocaleDateString()}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
