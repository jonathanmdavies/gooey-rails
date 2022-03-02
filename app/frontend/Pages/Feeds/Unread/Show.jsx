/* eslint-disable react/no-danger */
import React, { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { usePage } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Sidebar from "@/components/Reader/Sidebar";

export default function Read() {
  const [show, setShow] = useState(true);
  const { item } = usePage().props;

  return (
    <Authenticated>
      <div className="h-screen">
        <div className="">
          <div className="flex">
            <Transition
              show={show}
              as="div"
              enter="transition-all ease-in duration-500"
              enterFrom="max-w-0 transition-all"
              enterTo="max-w-80 transition-all"
              leave="transition-all ease-out duration-500"
              leaveFrom="max-w-80 transition-all"
              leaveTo="max-w-0 transition-all"
            >
              {show && (
                <div
                  className={`${
                    show ? "w-80" : "max-w-0"
                  } relative border-r border-slate-100 px-3 pt-2`}
                >
                  <div className="absolute inset-y-0 -right-3 flex h-screen flex-col justify-center">
                    <button
                      type="button"
                      onClick={() => setShow(false)}
                      className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-50"
                    >
                      <ChevronDoubleLeftIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <Sidebar />
                </div>
              )}
            </Transition>
            <div className="flex h-screen flex-1 flex-col overflow-y-scroll bg-white">
              <div className="sticky top-0 border-b border-slate-100 bg-slate-50/90  px-6 py-2 backdrop-blur-sm">
                <div className="mx-auto flex max-w-3xl items-center justify-between">
                  <div className="truncate">
                    <h1 className="font-mono text-sm font-semibold text-slate-800">
                      {item.title}
                    </h1>
                    <h6 className="font-mono text-xs text-slate-400">
                      {new Date(item.published_at).toLocaleDateString()}
                    </h6>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
                    >
                      <StarIcon className="h-4 w-4 text-white" />
                    </button>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
                    >
                      <EyeOffIcon className="h-4 w-4 text-white" />
                    </button>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-400 text-white hover:text-slate-200 active:scale-95"
                    >
                      <ExternalLinkIcon className="h-4 w-4 " />
                    </button>
                  </div>
                </div>
              </div>

              <div className="prose prose-cyan max-w-3xl self-center">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
