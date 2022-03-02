import React from "react";
import FeedSidebar from "@/components/Reader/FeedSidebar";
import FeedItemPanel from "@/components/Reader/FeedItemPanel";

export default function Reader() {
  return (
    <div className="flex">
      <FeedSidebar />
      <FeedItemPanel>
        <p>content goes here</p>
      </FeedItemPanel>
    </div>
  );
}
