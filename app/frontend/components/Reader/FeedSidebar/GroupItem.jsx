import React, { useState } from "react";
import propTypes from "prop-types";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { classNames } from "@/utils";

export default function GroupItem({ group }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li className="flex w-full items-center rounded-xl px-4 py-1.5 text-slate-600 backdrop-blur transition-all hover:cursor-pointer hover:bg-white/30">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mr-1 text-slate-400 transition hover:text-slate-500"
      >
        <ChevronRightIcon
          className={classNames("h-4 w-4 transition ", expanded && "rotate-90")}
        />
      </button>
      <span className="text-sm text-slate-600">{group.name}</span>
    </li>
  );
}

GroupItem.propTypes = {
  group: propTypes.shape({
    name: propTypes.string.isRequired,
    position: propTypes.number.isRequired,
  }).isRequired,
};
