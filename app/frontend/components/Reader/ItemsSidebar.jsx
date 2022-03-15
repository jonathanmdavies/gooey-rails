import React from "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { item_path, feed_item_path } from "@/routes";

export default function ItemsSidebar() {
  const { items, feed } = usePage().props;
  const { url } = usePage();

  const dynamicItemPath = (itemId) => {
    if (feed) {
      return feed_item_path(feed.id, itemId);
    }
    return item_path(itemId);
  };

  return (
    <div className=" w-80 overflow-y-scroll border-r border-slate-100">
      <div className="divide-y divide-slate-100 overflow-y-scroll">
        {items.map(({ id, title, published_at }) => (
          <div key={id} className="w-full">
            <Link
              href={dynamicItemPath(id)}
              preserveScroll
              preserveState
              className={` ${
                url === dynamicItemPath(id) ? "bg-white" : ""
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
