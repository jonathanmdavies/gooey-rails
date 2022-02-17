import React from "react";

export default function Unauthenticated({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h1 className="mb-8 font-mono font-medium uppercase tracking-wide text-slate-800 lg:hidden">
            Gooey Reader
          </h1>
          <div className="">{children}</div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 items-center justify-center lg:flex">
        <span className="absolute inset-x-1/2 h-screen w-px bg-slate-200"></span>
        <h1 className="z-20 -mr-3 bg-white  p-4 font-mono font-medium uppercase tracking-wide text-slate-800">
          Gooey Reader
        </h1>
      </div>
    </div>
  );
}
