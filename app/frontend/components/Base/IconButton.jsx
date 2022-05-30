import React, { forwardRef } from "react";
import propTypes from "prop-types";
import DynamicIcon from "@/components/DynamicIcon";
import { classNames } from "@/utils";

const sizes = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
};

const colors = {
  lightSlate: "bg-slate-200 text-slate-800 hover:bg-slate-300",
  darkSlate: "bg-slate-800 text-slate-100 hover:bg-slate-900",
  cyan: "bg-gradient-to-br from-cyan-600 to-cyan-500",
};

const IconButton = forwardRef(
  (
    { onClick, label, icon, size, color, disabled, className, ...rest },
    ref
  ) => {
    const colorClasses = colors[color];
    const sizeClasses = sizes[size];
    const iconSize = iconSizes[size];

    return (
      <button
        disabled={disabled}
        ref={ref}
        type="button"
        onClick={onClick}
        className={classNames(
          `flex items-center justify-center rounded-xl active:scale-95`,
          colorClasses,
          sizeClasses,
          disabled && "cursor-not-allowed opacity-70 active:scale-100",
          className
        )}
        {...rest}
      >
        <DynamicIcon icon={icon} className={classNames(iconSize)} />
        <span className="sr-only">{label}</span>
      </button>
    );
  }
);

IconButton.propTypes = {
  onClick: propTypes.func,
  label: propTypes.string.isRequired,
  className: propTypes.string,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  color: propTypes.oneOf(["lightSlate", "cyan", "darkSlate"]),
  icon: propTypes.string.isRequired,
  disabled: propTypes.bool,
};

IconButton.defaultProps = {
  onClick: () => {},
  className: "",
  size: "md",
  color: "lightSlate",
  disabled: false,
};

export default IconButton;
