import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { usePage, InertiaLink } from "@inertiajs/inertia-react";
import { Menu, Transition } from "@headlessui/react";
import {
  CogIcon,
  LightningBoltIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { destroy_account_session_path } from "@/routes";
import FlashMessages from "@/components/FlashMessages";

export default function Authenticated({ children }) {
  return (
    <div className="h-screen">
      <Header />
      <FlashMessages />
      <div className="">{children}</div>
    </div>
  );
}

function Header() {
  const { current_account } = usePage().props;

  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white py-2 px-4">
      <div className="flex w-40 items-center">
        <Menu as="div" className="relative h-8">
          <Menu.Button
            id="settings-menu"
            className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 transition active:scale-95"
          >
            <CogIcon className="h-6 w-6 text-slate-600" />
            <span className="sr-only">Settings</span>
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
            <Menu.Items className="absolute left-0 z-10 mt-1 w-56 origin-top-left rounded-lg border border-slate-100 bg-white shadow-sm">
              <div className="">
                <Menu.Item>
                  <a
                    href="/"
                    className="group flex items-center px-4 py-2 font-mono text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <UserIcon className="mr-2 h-4 w-4 text-slate-500" />
                    {current_account.email}
                  </a>
                </Menu.Item>

                <Menu.Item>
                  <InertiaLink
                    href={destroy_account_session_path()}
                    method="delete"
                    as="button"
                    className="group flex items-center border-t border-slate-100 px-4 py-2 font-mono text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                  >
                    <LogoutIcon className="mr-2 h-4 w-4 text-rose-700" />
                    Log out
                  </InertiaLink>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="flex items-center space-x-2">
        <InertiaLink
          href="/"
          className="rounded-full bg-gradient-to-br from-slate-800 to-slate-700 px-6 py-2 text-sm font-medium text-white transition hover:text-slate-100 active:scale-95"
        >
          Read
        </InertiaLink>
        <InertiaLink
          href="/feeds"
          className="px-6 py-2 text-sm font-medium text-slate-500"
        >
          Manage
        </InertiaLink>
      </div>

      <div className="flex w-40 justify-end space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500">
          <LightningBoltIcon className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}

Authenticated.propTypes = {
  children: PropTypes.node.isRequired,
};
