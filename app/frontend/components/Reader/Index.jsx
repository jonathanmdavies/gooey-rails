import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import FeedSidebar from "@/components/Reader/FeedSidebar";
import FeedItemPanel from "@/components/Reader/FeedItemPanel";
import ItemsSidebar from "@/components/Reader/ItemsSidebar";

export default function Reader() {
  const { items } = usePage().props;

  return (
    <div className="flex h-screen">
      <FeedSidebar />
      <ItemsSidebar />
      {items.length > 0 && <FeedItemPanel item={items[0]} />}
    </div>
  );
}
