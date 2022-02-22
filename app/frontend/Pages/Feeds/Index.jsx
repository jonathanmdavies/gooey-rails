import React from "react";
import Authenticated from "@/Layouts/Authenticated";

export default function Index() {
  return (
    <Authenticated>
      <div className="h-screen">
        <h1>Feeds</h1>
      </div>
    </Authenticated>
  );
}
