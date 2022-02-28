import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import {
  SearchIcon,
  DotsHorizontalIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { feed_path, refresh_feed_path } from "@/routes";

import Authenticated from "@/Layouts/Authenticated";
import Dropdown from "@/components/Dropdown";

export default function Index() {
  const { feeds, pagy } = usePage().props;

  const [sorted, setSorted] = useState({
    column: "",
    order: "",
  });

  useEffect(() => {
    Inertia.get(
      `/feeds`,
      {
        column: sorted.column,
        order: sorted.order,
      },
      {
        only: ["feeds", "pagy"],
        preserveState: true,
      }
    );
  }, [sorted]);

  const sortResults = (column, order) => {
    setSorted({ column, order });
  };

  return (
    <Authenticated>
      <div className="">
        <div className="container mx-auto max-w-7xl">
          <div className="my-12 overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-8 gap-6 bg-slate-50 p-6">
              <div className="col-span-4">
                <label
                  htmlFor="email"
                  className="block font-mono text-sm font-medium text-slate-700"
                >
                  Search for a feed
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon
                      className="h-5 w-5 text-slate-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-lg border-slate-300 pl-10 text-sm focus:border-cyan-600 focus:ring-0 focus:ring-cyan-600"
                    placeholder="Daring Fireball"
                  />
                </div>
              </div>
              <div className="col-span-2" />
            </div>
            <div className="flex flex-col border-t border-slate-200">
              <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
                <div className="align-midde inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50 font-mono">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-semibold text-slate-800"
                          >
                            <SortableButton
                              activeSort={sorted.column}
                              onSort={sortResults}
                              order={sorted.order}
                              column="Name"
                            />
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm "
                          >
                            <SortableButton
                              activeSort={sorted.column}
                              onSort={sortResults}
                              order={sorted.order}
                              column="Status"
                            />
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-semibold text-slate-800"
                          >
                            Category
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {feeds.map(({ id, name, url, status }) => (
                          <tr key={id}>
                            <td className="w-96 whitespace-nowrap px-6 py-4">
                              <div className="flex items-center">
                                <div className="">
                                  <div className="text-sm font-medium text-slate-800">
                                    {name}
                                  </div>
                                  <div className="text-sm text-slate-400">
                                    {url}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <StatusIndicator status={status} />
                            </td>
                            <td className="px-6 py-4">
                              <div className="inline-flex items-center rounded-full bg-sky-50 py-2 px-4">
                                <span className="text-xs font-medium text-sky-500">
                                  Not Implemented
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end">
                                <Dropdown
                                  button={
                                    <button
                                      type="button"
                                      className="feed-menu-button flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-bl from-slate-800 to-slate-700 transition active:scale-95"
                                    >
                                      <span className="sr-only">Edit</span>
                                      <DotsHorizontalIcon className="h-4 w-4 text-slate-100 hover:text-slate-50" />
                                    </button>
                                  }
                                  primaryItems={[
                                    {
                                      label: "Refresh",
                                      href: refresh_feed_path(id),
                                      icon: "RefreshIcon",
                                      method: "patch",
                                    },
                                  ]}
                                  secondaryItems={[
                                    {
                                      label: "Unsubscribe",
                                      href: feed_path(id),
                                      icon: "TrashIcon",
                                      method: "delete",
                                    },
                                  ]}
                                  position="top-7 right-0"
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <nav
                    className="flex items-center justify-between bg-slate-50 px-4 py-3 sm:px-6"
                    aria-label="pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="font-mono text-sm text-slate-500">
                        Showing{" "}
                        <span className="font-medium text-slate-600">
                          {pagy.from}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium text-slate-600">
                          {pagy.to}
                        </span>{" "}
                        of your{" "}
                        <span className="font-medium text-slate-600">
                          {pagy.count}
                        </span>{" "}
                        feeds
                      </p>
                    </div>

                    <div className="space-x-3">
                      <Link
                        as="button"
                        preserveState
                        disabled={pagy.page === pagy.from}
                        href={pagy.prev_url}
                        className={`${
                          pagy.page === pagy.from
                            ? " text-slate-400"
                            : "text-slate-700 hover:text-slate-800"
                        } rounded-full bg-gradient-to-br from-slate-200 to-slate-100 px-5 py-2 font-mono text-xs font-medium active:scale-95`}
                      >
                        Previous
                      </Link>

                      <Link
                        as="button"
                        preserveState
                        disabled={pagy.page === pagy.last}
                        href={pagy.next_url}
                        className={`${
                          pagy.page === pagy.last
                            ? " text-slate-400"
                            : "text-slate-700 hover:text-slate-800"
                        } rounded-full bg-gradient-to-br from-slate-200 to-slate-100 px-5 py-2 font-mono text-xs font-medium active:scale-95`}
                      >
                        Next
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}

function StatusIndicator({ status }) {
  return (
    <div
      className={`${
        status === "Active"
          ? "border-emerald-300 bg-green-50"
          : "border-rose-200 bg-rose-50"
      } inline-flex items-center rounded-full border py-1 px-3`}
    >
      <div
        className={`${
          status === "Active" ? "bg-emerald-400" : "bg-rose-400"
        } mr-2 h-1.5 w-1.5 rounded-full`}
      />
      <span
        className={`${
          status === "Active" ? "text-emerald-400" : "text-rose-400"
        } font-mono text-xs font-medium`}
      >
        {status}
      </span>
    </div>
  );
}

StatusIndicator.propTypes = {
  status: PropTypes.string.isRequired,
};

function SortableButton({ activeSort, onSort, column, order }) {
  return (
    <button
      type="button"
      className="flex items-center font-semibold text-slate-800"
      onClick={() => onSort(column, order === "desc" ? "asc" : "desc")}
    >
      {column}
      {activeSort === column && (
        <ChevronUpIcon
          className={`${
            order === "desc" ? "rotate-180" : ""
          } h-4 w-4 transform transition`}
        />
      )}
    </button>
  );
}

SortableButton.propTypes = {
  column: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  activeSort: PropTypes.string.isRequired,
};
