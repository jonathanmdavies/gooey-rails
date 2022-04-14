import React from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { usePage, Link } from "@inertiajs/inertia-react";
import {
  CogIcon,
  LogoutIcon,
  RefreshIcon,
  UserIcon,
} from "@heroicons/react/solid";
import toast, { Toaster } from "react-hot-toast";
import { Menu } from "@headlessui/react";
import {
  destroy_account_session_path,
  feeds_path,
  unread_items_path,
  refresh_path,
} from "@/routes";
import FlashMessages from "@/components/FlashMessages";
import NewFeedButton from "@/components/NewFeedButton";
import Dropdown from "../components/Dropdown/Index";
import Toast from "@/components/Toast";

export default function Authenticated({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <FlashMessages />
      <div className="">{children}</div>
      <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
    </div>
  );
}

function Header() {
  const { url } = usePage();

  const refreshFeeds = () => {
    Inertia.visit(refresh_path(), {
      method: "post",
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.custom((t) => (
          <Toast toast={t} icon="RefreshIcon" type="success">
            Checking for new items...
          </Toast>
        ));
        setTimeout(() => {
          Inertia.reload();
        }, 5000);
      },
    });
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white py-2 px-4">
      <div className="flex w-40 items-center">
        <Dropdown
          button={
            <button
              type="button"
              className="settings-menu-button mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 transition focus:outline-none active:scale-95"
            >
              <CogIcon className="h-5 w-5 text-slate-600" />
              <span className="sr-only">Settings</span>
            </button>
          }
        >
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "bg-slate-800 text-white" : "bg-white text-slate-700"
                } group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800 hover:text-white focus:outline-none`}
                href={destroy_account_session_path()}
                as="button"
                method="delete"
              >
                <LogoutIcon className="mr-2 h-4 w-4" />
                Log out
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "bg-slate-800 text-white" : "bg-white text-slate-700"
                } group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800 hover:text-white focus:outline-none`}
                href="/"
                as="button"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                My Account
              </Link>
            )}
          </Menu.Item>
        </Dropdown>
      </div>

      <div className="flex items-center space-x-2">
        <Link
          href={unread_items_path()}
          className={`${
            !url.startsWith("/manage")
              ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white hover:text-slate-100"
              : "text-slate-500"
          } rounded-full  px-6 py-1.5 text-sm font-medium  transition  active:scale-95`}
        >
          Read
        </Link>

        <Link
          href={feeds_path()}
          className={`${
            url.startsWith("/manage")
              ? "bg-gradient-to-br from-slate-800 to-slate-700 text-white hover:text-slate-100"
              : "text-slate-500"
          } rounded-full px-6 py-1.5 text-sm font-medium transition active:scale-95`}
        >
          Manage
        </Link>
      </div>

      <div className="flex w-40 items-center justify-end space-x-2">
        <button
          onClick={() => refreshFeeds()}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 active:scale-95"
        >
          <RefreshIcon className="h-4 w-4 text-white" />
        </button>
        <NewFeedButton />
      </div>
    </header>
  );
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};
