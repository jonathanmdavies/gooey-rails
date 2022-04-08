import React, { Fragment } from "react";
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
  const refreshFeed = (feed_id) => {
    Inertia.visit(feed_refresh_path(feed_id), {
      preserveScroll: true,
      preserveState: true,
      method: "post",
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
          <DotsHorizontalIcon className="h-4 w-4 text-slate-100 hover:text-slate-50" />
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
