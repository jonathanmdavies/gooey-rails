import React from "react";
import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/solid";
import SelectMenu from "../../components/select-menu";
import NewFeedButton from "../../components/new-feed-button";

export default function ({ hello }) {
  const feeds = [
    {
      name: "Daring Fireball",
      url: "https://daringfireball.net/feeds/json",
      status: "Active",
      group: "Apple",
      favicon: "https://daringfireball.net/graphics/apple-touch-icon.png",
    },
    {
      name: "The Verge",
      url: "https://theverge.com/feeds/index.xml",
      status: "Active",
      group: "Apple",
      favicon:
        "https://cdn.vox-cdn.com/uploads/chorus_asset/file/9672633/VergeOG.0_1200x627.0.png",
    },
  ];
  return (
    <div className="">
      {/* heading */}
      <header className="flex items-center justify-between border-b border-slate-100 bg-white py-2 px-4">
        <div className="w-60">
          <div className="flex items-center">
            <img
              src="images/avatar.jpg"
              alt=""
              className="mr-1 h-8 w-8 rounded-full"
            />
            <div className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2">
              <span className="block text-sm font-semibold text-slate-700">
                Jonathan Davies
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <a href="#" className="px-6 py-2 text-sm font-medium text-slate-500">
            Read
          </a>
          <a
            href="#"
            className="rounded-full bg-slate-800 px-5 py-2 text-sm font-medium text-white hover:bg-slate-900"
          >
            Manage
          </a>
        </div>

        <div className="flex w-60 justify-end space-x-3">
          <NewFeedButton />
          <div className="h-8 w-8 rounded-full bg-cyan-600"></div>
        </div>
      </header>

      {/* page content */}

      <div className="container mx-auto mt-12">
        {/* <div className="">
          <h2 className="text-2xl font-bold text-slate-800">Your Feeds</h2>
          <p className="font-mono text-sm text-slate-500">
            Easily manage all the feeds you are subscribed to.
          </p>
        </div> */}

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
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
            <div className="col-span-2">
              <SelectMenu />
            </div>
          </div>

          {/* table */}
          <div className="flex flex-col border-t border-slate-200">
            <div className="-my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
              <div className="align-midde inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 font-mono">
                      <tr>
                        <th scope="col" className="w-12 px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            className="mb-px inline-block rounded border-slate-300"
                          />
                        </th>
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
                      {feeds.map((feed) => (
                        <tr key={feed.name}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              type="checkbox"
                              className="mb-px inline-block rounded border-slate-300"
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                <img
                                  src={feed.favicon}
                                  alt=""
                                  className="center h-10 w-10 object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-slate-800">
                                  {feed.name}
                                </div>
                                <div className="text-sm text-slate-400">
                                  {feed.url}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex items-center rounded-full border border-emerald-500 bg-green-50 py-2 px-4">
                              <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                              <span className=" text-sm font-medium text-emerald-500">
                                {feed.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="inline-flex items-center rounded-full bg-indigo-50 py-2 px-4">
                              <span className="text-sm font-medium text-indigo-500">
                                {feed.group}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end">
                              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
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
  );
}
