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
        <h1 className="z-10 font-mono text-base font-semibold uppercase tracking-wide text-white opacity-80">
          Reader
        </h1>
        <div class="absolute h-40 w-40">
          <div class="absolute h-40 w-40 transform-gpu animate-move rounded-full bg-cyan-500 opacity-50 mix-blend-multiply blur-xl"></div>
          <div class="animation-delay-2000 absolute h-40 w-40 transform-gpu animate-move rounded-full bg-indigo-300 opacity-50 mix-blend-multiply blur-xl"></div>
          <div class="animation-delay-4000 absolute h-40 w-40 transform-gpu animate-move rounded-full bg-rose-300 opacity-30 mix-blend-multiply blur-xl"></div>
        </div>
      </div>
    </div>
  );
}
