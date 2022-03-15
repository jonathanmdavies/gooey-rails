import React from "react";
import FeedSidebar from "@/components/Reader/FeedSidebar";
import FeedItemPanel from "@/components/Reader/FeedItemPanel";
import ItemsSidebar from "@/components/Reader/ItemsSidebar";

export default function Reader() {
  return (
    <div className="flex h-screen">
      <FeedSidebar />
      <ItemsSidebar />
      <FeedItemPanel />
    </div>
  );
}
