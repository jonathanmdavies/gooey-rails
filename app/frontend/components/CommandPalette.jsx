import React, { Fragment, useEffect, useState } from "react";
import propTypes from "prop-types";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import {
  ExclamationIcon,
  RssIcon,
  SupportIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import useKeyPress from "../hooks/useKeyPress";
import { classNames } from "@/utils";
import DynamicIcon from "@/components/DynamicIcon";
import createActions from "@/utils/createActions";
import { api_command_palette_feeds_path } from "@/routes";

async function getFeeds() {
  const response = await fetch(api_command_palette_feeds_path());
  return response.json();
}

function transformFeeds() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    getFeeds().then((data) => {
      setFeeds(
        data.map((feed) => ({
          ...feed,
          action: () => {
            Inertia.visit(feed.first_item_url);
          },
        }))
      );
    });
  }, []);

  return feeds;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  useKeyPress(
    "k",
    () => {
      setOpen(true);
    },
    true
  );

  const [rawQuery, setRawQuery] = useState("");
  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");

  // Get and Filter Actions
  const { item } = usePage().props;
  const [actions, setActions] = useState([]);

  useEffect(() => {
    setActions(createActions(item));
  }, [item]);

  let filteredActions = [];

  if (rawQuery === "#") {
    filteredActions = actions;
  } else {
    filteredActions =
      query === "" || rawQuery.startsWith(">")
        ? []
        : actions.filter(({ name }) => name.toLowerCase().includes(query));
  }

  // Get and Filter Feeds
  const feeds = transformFeeds();
  let filteredFeeds = [];

  if (rawQuery === ">") {
    filteredFeeds = feeds;
  } else {
    filteredFeeds =
      query === "" || rawQuery.startsWith("#")
        ? []
        : feeds.filter(({ name }) => name.toLowerCase().includes(query));
  }

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setRawQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-slate-100 overflow-hidden rounded-xl bg-white shadow-2xl shadow-cyan-500/40 ring-opacity-5 transition-all">
              <Combobox
                onChange={(comboboxItem) => {
                  comboboxItem.action();
                  setOpen(false);
                }}
              >
                <Header rawQuery={rawQuery} />
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-6 h-5 w-5 text-slate-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    name="search"
                    className="h-12 w-full border-0 bg-transparent pl-14 pr-8 text-slate-700 placeholder-slate-400 focus:ring-0 sm:text-sm"
                    placeholder="Go to a feed or perform an action..."
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                {(filteredActions.length > 0 || filteredFeeds.length > 0) && (
                  <Combobox.Options
                    static
                    className="combobox-options max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto px-6 py-4 pb-6"
                  >
                    {filteredActions.length > 0 && (
                      <li>
                        <h2 className="font-mono text-xs  font-semibold uppercase text-slate-600">
                          Actions
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredActions.map((action) => (
                            <Combobox.Option
                              key={action.name}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-xl px-4 py-2",
                                  active && "white bg-slate-50"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <div
                                    className={classNames(
                                      "flex h-6 w-6 items-center justify-center rounded-lg border  transition",
                                      active
                                        ? "border-cyan-400 shadow shadow-cyan-400/40"
                                        : "border-slate-300"
                                    )}
                                  >
                                    <DynamicIcon
                                      icon={action.icon}
                                      className={classNames(
                                        "h-3 w-3 flex-none text-slate-400 transition",
                                        active && "text-cyan-400 "
                                      )}
                                    />
                                  </div>
                                  <span
                                    className={classNames(
                                      "truncat ml-3 flex-auto",
                                      active
                                        ? "text-slate-700"
                                        : "text-slate-500"
                                    )}
                                  >
                                    {action.name}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                    {filteredFeeds.length > 0 && (
                      <li>
                        <h2 className="font-mono text-xs  font-semibold uppercase text-slate-600">
                          Feeds
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-slate-700">
                          {filteredFeeds.map((feed) => (
                            <Combobox.Option
                              key={feed.id}
                              value={feed}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-xl px-4 py-2",
                                  active && "white bg-slate-50"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <div
                                    className={classNames(
                                      "flex h-6 w-6 items-center justify-center rounded-lg border  transition",
                                      active
                                        ? "border-cyan-400 shadow shadow-cyan-400/40"
                                        : "border-slate-300"
                                    )}
                                  >
                                    <RssIcon
                                      className={classNames(
                                        "h-3 w-3 flex-none text-slate-400 transition",
                                        active && "text-cyan-400 "
                                      )}
                                    />
                                  </div>
                                  <span
                                    className={classNames(
                                      "truncat ml-3 flex-auto",
                                      active
                                        ? "text-slate-700"
                                        : "text-slate-500"
                                    )}
                                  >
                                    {feed.name}
                                  </span>

                                  <div className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500">
                                    {feed.unread_items_count} Unread
                                  </div>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === "?" && <Help rawQuery={rawQuery} />}

                {query !== "" &&
                  rawQuery !== "?" &&
                  filteredFeeds.length === 0 &&
                  filteredActions.length === 0 && <NoResults />}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Header({ rawQuery }) {
  return (
    <div className="flex items-baseline bg-slate-50 px-6 py-4">
      <h2 className="font-mono text-xs font-medium uppercase text-slate-600">
        Command Palette
      </h2>
      <div className="ml-auto flex flex-wrap items-center font-mono text-xs text-slate-600">
        Type{" "}
        <kbd
          className={classNames(
            "mx-1 flex h-5 w-5 items-center justify-center rounded border font-medium sm:mx-2",
            rawQuery.startsWith("#")
              ? "border-cyan-400 text-cyan-500"
              : "border-slate-400 text-slate-500"
          )}
        >
          #
        </kbd>{" "}
        <span className="inline">for actions,</span>
        <kbd
          className={classNames(
            "mx-1 flex h-5 w-5 items-center justify-center rounded border font-medium sm:mx-2",
            rawQuery.startsWith(">")
              ? "border-cyan-400 text-cyan-500"
              : "border-slate-400 text-slate-500"
          )}
        >
          &gt;
        </kbd>{" "}
        for feeds.
      </div>
    </div>
  );
}

Header.propTypes = {
  rawQuery: propTypes.string.isRequired,
};

function NoResults() {
  return (
    <div className="py-14 px-6 text-center text-sm sm:px-14">
      <ExclamationIcon
        className="mx-auto h-6 w-6 text-slate-400"
        aria-hidden="true"
      />
      <p className="mt-4 font-semibold text-slate-900">No results found</p>
      <p className="mt-2 text-slate-500">
        We couldn’t find anything with that term. Please try again.
      </p>
    </div>
  );
}

function Help() {
  return (
    <div className="py-14 px-6 text-center text-sm sm:px-14">
      <SupportIcon
        className="mx-auto h-6 w-6 text-slate-400"
        aria-hidden="true"
      />
      <p className="mt-4 font-semibold text-slate-900">Help with searching</p>
      <p className="mt-2 text-slate-500">
        Use this tool to quickly navigate or perform actions like bookmarking
        items, or marking them as read.
      </p>
    </div>
  );
}
