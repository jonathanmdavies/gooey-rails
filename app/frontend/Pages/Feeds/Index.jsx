import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import { SearchIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

import Authenticated from "@/Layouts/Authenticated";

export default function Index() {
  const { feeds } = usePage().props;
  return (
    <Authenticated>
      <div className="mb-12">
        <div className="container mx-auto my-12 max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-8 gap-6 bg-slate-50 p-6">
              <div className="col-span-4">
                <label
                  htmlFor="email"
                  className="block font-mono text-sm font-medium text-gray-700"
                >
                  Search for a feed
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-lg border-gray-300 pl-10 text-sm focus:border-cyan-600 focus:ring-0 focus:ring-cyan-600"
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
                            Feed
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-sm font-semibold text-slate-800"
                          >
                            Status
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
                            <td className="whitespace-nowrap px-6 py-4">
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
                              <div
                                className={`${
                                  status === "Active"
                                    ? "border-emerald-300 bg-green-50"
                                    : "border-rose-200 bg-rose-50"
                                } inline-flex items-center rounded-full border py-2 px-4`}
                              >
                                <div
                                  className={`${
                                    status === "Active"
                                      ? "bg-emerald-400"
                                      : "bg-rose-400"
                                  } mr-2 h-2 w-2 rounded-full`}
                                />
                                <span
                                  className={`${
                                    status === "Active"
                                      ? "text-emerald-400"
                                      : "text-rose-400"
                                  } font-mono text-xs font-medium`}
                                >
                                  {status}
                                </span>
                              </div>
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
                                <button
                                  type="button"
                                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800"
                                >
                                  <span className="sr-only">Edit</span>
                                  <DotsHorizontalIcon className="h-4 w-4 text-slate-100 hover:text-slate-50" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
