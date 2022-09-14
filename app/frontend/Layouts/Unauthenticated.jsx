import React from "react";
import PropTypes from "prop-types";
import BackgroundImage from "../images/unauthenticated_background.jpg";

export default function Unauthenticated({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h1 className="mb-8 font-mono font-medium uppercase tracking-wide text-slate-800 lg:hidden">
            RSS Reader
          </h1>
          <div className="">{children}</div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 items-center justify-center lg:flex">
        <img
          src={BackgroundImage}
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <h1 className="z-10 font-mono text-xl font-semibold uppercase tracking-wide text-white opacity-80">
          RSS Reader Example for Review Apps
        </h1>
      </div>
    </div>
  );
}
Unauthenticated.propTypes = {
  children: PropTypes.node.isRequired,
};
