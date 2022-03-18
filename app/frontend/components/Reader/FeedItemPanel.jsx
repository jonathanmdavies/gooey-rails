/* eslint-disable react/no-danger */
import React from "react";
import {
  ExternalLinkIcon,
  EyeOffIcon,
  EyeIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { Link, usePage } from "@inertiajs/inertia-react";
import { item_read_path } from "@/routes";
import Tooltip from "../Tooltip";

export default function FeedItemPanel() {
  const { item } = usePage().props;

  if (item === undefined) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <h2 className="text-sm font-medium text-slate-700">
          Select an item to start reading!
        </h2>
      </div>
    );
  }
  return (
    <div className="flex h-screen flex-1 flex-col overflow-y-scroll bg-white">
      <div className="sticky top-0 border-b border-slate-100 bg-slate-50/90 py-2 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <div className="min-w-0 py-3">
            <h1 className="truncate font-mono text-sm font-semibold text-slate-800">
              {item.title}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Tooltip content="Bookmark">
              <button
                type="button"
                className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition hover:text-cyan-50 active:scale-95"
              >
                <StarIcon className="h-4 w-4 transition group-hover:scale-95" />
              </button>
            </Tooltip>

            <ToggleReadButton />
            <Tooltip content="Read Original">
              <a
                href={item.permalink}
                rel="noreferrer"
                target="_blank"
                className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition hover:text-cyan-50 active:scale-95"
              >
                <ExternalLinkIcon className="h-4 w-4 transition group-hover:scale-95" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="prose prose-cyan max-w-3xl self-center p-6">
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </div>
    </div>
  );
}

function ToggleReadButton() {
  const { item } = usePage().props;

  const read = item.read_at !== null;
  return (
    <>
      {read && (
        <Tooltip content="Mark as Unread">
          <Link
            preserveState
            preserveScroll
            href={item_read_path(item.id)}
            method="delete"
            as="button"
            className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition hover:text-cyan-50 active:scale-95"
          >
            <span className="sr-only">Mark as unread</span>
            <EyeOffIcon className="h-4 w-4 group-hover:scale-95" />
          </Link>
        </Tooltip>
      )}
      {!read && (
        <Tooltip content="Mark as Read">
          <Link
            preserveState
            preserveScroll
            href={item_read_path(item.id)}
            method="post"
            as="button"
            className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition active:scale-95"
          >
            <span className="sr-only">Mark as read</span>
            <EyeIcon className="h-4 w-4 transition group-hover:scale-95" />
          </Link>
        </Tooltip>
      )}
    </>
  );
}
