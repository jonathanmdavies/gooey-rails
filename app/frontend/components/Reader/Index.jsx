import React from "react";
import FeedSidebar from "@/components/Reader/FeedSidebar";
import FeedItems from "@/components/Reader/FeedItems";
import FeedItemPanel from "@/components/Reader/FeedItemPanel";

export default function Reader() {
  return (
    <div className="flex h-screen">
      <FeedSidebar />
      <FeedItems />
      <FeedItemPanel />
    </div>
  );
}
