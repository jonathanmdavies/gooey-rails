import React, { useRef } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import Draggable from "react-draggable";
import { useResizableX } from "@/utils/hooks";

export default function ItemsSidebar() {
  const { items } = usePage().props;
  const { url } = usePage();

  const resizeable = useRef(null);
  const { start, resize, width, end } = useResizableX(
    resizeable,
    "items-column"
  );

  return (
    <div
      ref={resizeable}
      style={{ width }}
      className="relative flex w-80 flex-row-reverse justify-between overflow-y-scroll border-r border-slate-100"
    >
      <div className="absolute right-0 z-20 h-full cursor-col-resize transition hover:bg-cyan-500/50">
        <Draggable axis="x" onStart={start} onDrag={resize} onStop={end}>
          <div className="h-full w-[3px]" />
        </Draggable>
      </div>

      <div className="w-full divide-y divide-slate-100 overflow-y-scroll">
        {items.map(({ id, title, published_at, item_path }) => (
          <div key={id} className="w-full">
            <Link
              href={item_path}
              preserveScroll
              preserveState
              className={` ${
                url === item_path ? "bg-white" : ""
              } block p-3 transition hover:bg-white active:bg-white`}
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
