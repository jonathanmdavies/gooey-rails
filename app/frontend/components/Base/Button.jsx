import React, { forwardRef } from "react";
import propTypes from "prop-types";
import DynamicIcon from "../DynamicIcon";

import { classNames } from "@/utils";

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

const Button = forwardRef(
  (
    { onClick, children, icon, size, color, disabled, className, ...rest },
    ref
  ) => {
    const colorClasses = colors[color];
    const sizeClasses = sizes[size];
    const iconSize = iconSizes[size];

    return (
      <button
        disabled={disabled}
        type="button"
        ref={ref}
        onClick={onClick}
        className={classNames(
          `flex cursor-pointer items-center justify-center rounded-xl font-mono font-medium transition active:scale-95`,
          colorClasses,
          sizeClasses,
          disabled && "cursor-not-allowed opacity-70 active:scale-100",
          className
        )}
        {...rest}
      >
        {icon && <DynamicIcon icon={icon} className={classNames(iconSize)} />}
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  onClick: propTypes.func,
  children: propTypes.node.isRequired,
  className: propTypes.string,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  color: propTypes.oneOf(["lightSlate", "cyan", "darkSlate"]),
  icon: propTypes.string,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  icon: "",
  onClick: () => {},
  className: "",
  size: "sm",
  color: "lightSlate",
  disabled: false,
};

export default Button;
