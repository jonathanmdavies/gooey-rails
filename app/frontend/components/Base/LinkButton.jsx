import React from "react";
import propTypes from "prop-types";
import { InertiaLink } from "@inertiajs/inertia-react";
import DynamicIcon from "@/components/DynamicIcon";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

const sizes = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

const iconSizes = {
  sm: "h-4 w-4 mr-1",
  md: "h-5 w-5 mr-2",
  lg: "h-6 w-6 mr-2",
};

const colors = {
  lightSlate: "bg-slate-200 text-slate-800 hover:bg-slate-300",
  darkSlate: "bg-slate-800 text-slate-100 hover:bg-slate-900",
  cyan: "bg-cyan-500 text-slate-100 hover:bg-cyan-600",
};

export default function LinkButton({
  href,
  children,
  icon,
  size,
  color,
  disabled,
  className = "",
  ...rest
}) {
  const colorClasses = colors[color];
  const sizeClasses = sizes[size];
  const iconSize = iconSizes[size];

  return (
    <InertiaLink
      disabled={disabled}
      href={href}
      className={classNames(
        `inline-flex cursor-pointer items-center justify-center rounded-xl font-mono font-medium transition active:scale-95`,
        colorClasses,
        sizeClasses,
        disabled && "cursor-not-allowed opacity-70 active:scale-100",
        className
      )}
      {...rest}
    >
      {icon && (
        <DynamicIcon
          icon={icon}
          className={(classNames(iconSize), !children && "mr-0")}
        />
      )}
      {children}
    </InertiaLink>
  );
}

LinkButton.propTypes = {
  onClick: propTypes.func,
  className: propTypes.string,
  children: propTypes.node,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  color: propTypes.oneOf(["lightSlate", "cyan", "darkSlate"]),
  icon: propTypes.string,
  disabled: propTypes.bool,
  href: propTypes.string.isRequired,
};

LinkButton.defaultProps = {
  icon: "",
  onClick: () => {},
  size: "sm",
  color: "lightSlate",
  disabled: false,
  className: "",
  children: null,
};
