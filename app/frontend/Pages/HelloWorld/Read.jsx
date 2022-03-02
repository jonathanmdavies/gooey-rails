import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import Reader from "@/components/Reader/Index";

export default function Read() {
  return (
    <Authenticated>
      <Reader />
    </Authenticated>
  );
}
