import React from "react";
import PropTypes from "prop-types";
import { usePage, Link } from "@inertiajs/inertia-react";
import { CogIcon, RefreshIcon } from "@heroicons/react/solid";

import {
  destroy_account_session_path,
  feeds_path,
  unread_items_path,
  refresh_path,
} from "@/routes";
import FlashMessages from "@/components/FlashMessages";
import NewFeedButton from "@/components/NewFeedButton";
import Dropdown from "@/components/Dropdown";

export default function Authenticated({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <FlashMessages />
      <div className="">{children}</div>
    </div>
  );
}

function Header() {
  const {
    current_account: { email },
  } = usePage().props;
  const { url } = usePage();

  const primaryNavigationItems = [
    {
      label: email,
      icon: "UserIcon",
      href: "/",
      method: "get",
    },
  ];

  const secondaryNavigationItems = [
    {
      label: "Log out",
      icon: "LogoutIcon",
      href: destroy_account_session_path(),
      method: "delete",
    },
  ];

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white py-2 px-4">
      <div className="flex w-40 items-center">
        <Dropdown
          button={
            <button
              type="button"
              className="settings-menu-button mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 transition active:scale-95"
            >
              <CogIcon className="h-6 w-6 text-slate-600" />
              <span className="sr-only">Settings</span>
            </button>
          }
          primaryItems={primaryNavigationItems}
          secondaryItems={secondaryNavigationItems}
          position="left-0 z-10 mt-1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Link
          href={unread_items_path()}
          className={`${
            !url.startsWith("/manage")
              ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white hover:text-slate-100"
              : "text-slate-500"
          } rounded-full  px-6 py-2 text-sm font-medium  transition  active:scale-95`}
        >
          Read
        </Link>

        <Link
          href={feeds_path()}
          className={`${
            url.startsWith("/manage")
              ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white hover:text-slate-100"
              : "text-slate-500"
          } rounded-full px-6 py-2 text-sm font-medium transition active:scale-95`}
        >
          Manage
        </Link>
      </div>

      <div className="flex w-40 justify-end space-x-2">
        <Link
          href={refresh_path()}
          as="button"
          method="post"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 active:scale-95"
        >
          <RefreshIcon className="h-4 w-4 text-white" />
        </Link>
        <NewFeedButton />
      </div>
    </header>
  );
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};
