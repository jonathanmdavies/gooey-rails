import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { feed_path, feed_refresh_path } from "@/routes";
import DynamicIcon from "@/components/DynamicIcon";
import Toast from "@/components/Toast";

export default function FeedDropdown({ id }) {
  const [loading, setLoading] = useState(false);

  const refreshFeed = (feed_id) => {
    Inertia.visit(feed_refresh_path(feed_id), {
      preserveScroll: true,
      preserveState: true,
      method: "post",
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onSuccess: (page) => {
        toast.custom((t) => (
          <Toast toast={t} icon="RefreshIcon" type="success">
            {page.props.flash.success}
          </Toast>
        ));
      },
    });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <button
          type="button"
          className="feed-menu-button flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-bl from-slate-800 to-slate-700 transition active:scale-95"
        >
          <span className="sr-only">Edit</span>
          {loading && (
            <svg
              className="h-3 w-3 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-50"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!loading && (
            <DotsHorizontalIcon className="h-4 w-4 text-slate-100" />
          )}
        </button>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="trasform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-7 right-0 z-20 w-56 origin-top-left overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
          <div className="">
            <Menu.Item>
              <button
                type="button"
                onClick={() => refreshFeed(id)}
                className="group flex w-full items-center border-t border-slate-100 px-4 py-2 font-mono text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <DynamicIcon
                  icon="RefreshIcon"
                  className="mr-2 h-4 w-4 text-slate-500"
                />
                Refresh
              </button>
            </Menu.Item>
            <Menu.Item>
              <Link
                href={feed_path(id)}
                method="delete"
                as="button"
                className="group flex w-full items-center border-t border-slate-100 px-4 py-2 font-mono text-sm font-medium text-rose-700 transition hover:bg-rose-50"
              >
                <DynamicIcon
                  icon="TrashIcon"
                  className="mr-2 h-4 w-4 text-rose-400"
                />
                Unsubscribe
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

FeedDropdown.propTypes = {
  id: PropTypes.number.isRequired,
};
