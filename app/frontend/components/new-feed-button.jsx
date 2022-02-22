import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusSmIcon, RssIcon } from "@heroicons/react/solid";
import { useForm } from "@inertiajs/inertia-react";
import { feeds_path } from "@/routes";

export default function NewFeedButton() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const { data, setData, post, processing, transform, errors } = useForm({
    url: "",
  });

  function submit(e) {
    e.preventDefault();

    transform(() => ({ feed: { ...data } }));
    post(feeds_path());
  }

  useEffect(() => {
    console.log(errors);
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 active:scale-95"
      >
        <PlusSmIcon className="h-6 w-6 text-white" />
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Dialog.Overlay className="fixed inset-0 bg-slate-500 bg-opacity-50 backdrop-blur-sm transition-opacity " />
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <form
              onSubmit={submit}
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div className="border-b border-slate-200 bg-gradient-to-tl from-slate-100 to-slate-50 p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500">
                  <RssIcon className="h-4 w-4 text-white" />
                </div>
                <div className="mt-2 sm:mt-4">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-medium text-slate-800"
                  >
                    Add a New Feed
                  </Dialog.Title>
                  <div className="mt-px">
                    <p className="font-mono text-xs text-slate-500">
                      Paste in a Feed URL
                    </p>
                  </div>
                </div>
              </div>
              <div onSubmit={submit} className="p-6">
                <div className="relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600">
                  <label
                    htmlFor="name"
                    className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
                  >
                    URL
                  </label>
                  <input
                    value={data.url}
                    onChange={(e) => setData("url", e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 text-sm text-slate-800 placeholder-gray-500 focus:ring-0"
                    placeholder="https://daringfireball.net/feed"
                  />
                </div>

                <div className="">{errors.url && <p>{errors.url}</p>}</div>
              </div>
              <div className="p-6 pt-0 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  disabled={processing}
                  type="submit"
                  className="rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 px-5 py-2 font-mono text-xs font-medium text-white hover:bg-cyan-700"
                >
                  Add Feed
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-slate-200 px-5 py-2 font-mono text-xs font-medium text-slate-800 hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
