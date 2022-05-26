import React from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import { usePage, Link } from "@inertiajs/inertia-react";
import {
  LogoutIcon,
  UserIcon,
  LightningBoltIcon,
} from "@heroicons/react/solid";
import toast, { Toaster } from "react-hot-toast";
import { Menu } from "@headlessui/react";
import {
  destroy_account_session_path,
  feeds_path,
  refresh_path,
  dashboard_path,
} from "@/routes";
import FlashMessages from "@/components/FlashMessages";
import NewFeedButton from "@/components/NewFeedButton";
import Dropdown from "../components/Dropdown/Index";
import Toast from "@/components/Toast";
import LinkButton from "../components/Base/LinkButton";
import IconButton from "../components/Base/IconButton";

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
        <Dropdown button={<IconButton label="Settings" icon="CogIcon" />}>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "bg-slate-800 text-white" : "bg-white text-slate-700"
                } group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800 hover:text-white focus:outline-none`}
                href={dashboard_path()}
                as="button"
              >
                <LightningBoltIcon className="mr-2 h-4 w-4" />
                Dashboard
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
        </Dropdown>
      </div>

      <div className="flex items-center space-x-2">
        <LinkButton
          color={!url.startsWith("/manage") ? "darkSlate" : "lightSlate"}
          href="/"
        >
          Read
        </LinkButton>

        <LinkButton
          href={feeds_path()}
          color={url.startsWith("/manage") ? "darkSlate" : "lightSlate"}
        >
          Manage
        </LinkButton>
      </div>

      <div className="flex w-40 items-center justify-end space-x-2">
        <IconButton
          onClick={() => refreshFeeds()}
          icon="RefreshIcon"
          label="Refresh all feeds"
          color="darkSlate"
        />

        <NewFeedButton />
      </div>
    </header>
  );
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};
