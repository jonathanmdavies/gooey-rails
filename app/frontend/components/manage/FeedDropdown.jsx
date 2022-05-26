import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";
import { feed_path, feed_refresh_path } from "@/routes";
import DynamicIcon from "@/components/DynamicIcon";
import Toast from "@/components/Toast";
import IconButton from "@/components/Base/IconButton";
import Dropdown from "@/components/Dropdown/Index";

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
    <Dropdown
      button={<IconButton label="Edit Feed" icon="DotsHorizontalIcon" />}
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
