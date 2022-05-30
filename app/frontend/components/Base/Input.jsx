import React from "react";
import propTypes from "prop-types";
import { ExclamationIcon } from "@heroicons/react/outline";
import { classNames } from "@/utils";

export default function Input({
  value,
  onChange,
  label,
  type = "text",
  name,
  id,
  errors,
  ...rest
}) {
  return (
    <div className="">
      <div
        className={classNames(
          "relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600",
          errors.length > 0 && "border-rose-300 focus-within:border-rose-400"
        )}
      >
        <label
          htmlFor={id}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
        >
          {label}
        </label>
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          id={id}
          className="block w-full border-0 p-0 pr-6 text-sm text-slate-800 placeholder-slate-500 focus:ring-0 focus-visible:ring-0"
          {...rest}
        />
        {errors.length > 0 && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationIcon className="h-4 w-4 text-rose-400" />
          </div>
        )}
      </div>
      {errors && (
        <p className="mt-2 text-xs text-rose-500" id={`${id}-error`}>
          {errors[0]}
        </p>
      )}
    </div>
  );
}

Input.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  errors: propTypes.arrayOf(propTypes.string),
};

Input.defaultProps = {
  errors: [],
};
