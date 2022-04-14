import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { feed_path, feed_refresh_path } from "@/routes";
import DynamicIcon from "@/components/DynamicIcon";
import Toast from "@/components/Toast";

import Dropdown from "@/components/Dropdown/Index";

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
    <Dropdown
      button={
        <button
          type="button"
          className="feed-menu-button flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-bl from-slate-800 to-slate-700 outline-none transition active:scale-95"
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
      }
    >
      <Menu.Item>
        {({ active }) => (
          <button
            type="button"
            onClick={() => refreshFeed(id)}
            className={`${
              active ? "bg-slate-800 text-white" : "bg-white text-slate-700"
            } group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800 hover:text-white focus:outline-none`}
          >
            <DynamicIcon icon="RefreshIcon" className="mr-2 h-4 w-4" />
            Refresh
          </button>
        )}
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <Link
            href={feed_path(id)}
            method="delete"
            as="button"
            className={`${
              active ? "bg-slate-800 text-white" : "bg-white text-slate-700"
            } group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800 hover:text-white focus:outline-none`}
          >
            <DynamicIcon icon="TrashIcon" className="mr-2 h-4 w-4" />
            Unsubscribe
          </Link>
        )}
      </Menu.Item>
    </Dropdown>
  );
}

FeedDropdown.propTypes = {
  id: PropTypes.number.isRequired,
};
