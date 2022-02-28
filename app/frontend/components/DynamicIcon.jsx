import React from "react";
import * as Heroicons from "@heroicons/react/solid";
import propTypes from "prop-types";

export default function DynamicIcon({ icon, className }) {
  const Icon = Heroicons[icon];

  return <Icon className={className} aria-hidden="true" />;
}

DynamicIcon.propTypes = {
  icon: propTypes.string.isRequired,
  className: propTypes.string.isRequired,
};
