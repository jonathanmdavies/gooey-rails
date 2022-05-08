/* eslint-disable react/no-danger */
import React from "react";
import {
  ExternalLinkIcon,
  EyeOffIcon,
  EyeIcon,
  StarIcon,
} from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { item_read_path, item_bookmark_path } from "@/routes";
import Tooltip from "@/components/Tooltip";
import Toast from "@/components/Toast";

export default function FeedItemPanel() {
  const { item, feed } = usePage().props;

  if (!item) {
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
            <h1 className="truncate text-sm font-semibold text-slate-700">
              {feed.name}
            </h1>
          </div>
          <div className="ml-3 flex space-x-2">
            <ToggleBookmarkButton />

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
      <article className="prose prose-slate prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:text-cyan-500 w-full max-w-3xl self-center  p-6">
        <h1>{item.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </article>
    </div>
  );
}

function ToggleBookmarkButton() {
  const { item } = usePage().props;
  const bookmarked = item.bookmarked_at;

  const bookmark = () => {
    Inertia.visit(item_bookmark_path(item.id), {
      method: "post",
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.custom((t) => (
          <Toast toast={t} icon="CheckCircleIcon" type="success">
            Saved for later
          </Toast>
        ));
      },
    });
  };

  const removeBookmark = () => {
    Inertia.visit(item_bookmark_path(item.id), {
      method: "delete",
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.custom((t) => (
          <Toast toast={t} icon="CheckCircleIcon" type="success">
            No longer saved for later
          </Toast>
        ));
      },
    });
  };

  if (bookmarked) {
    return (
      <Tooltip content="Remove Bookmark">
        <button
          type="button"
          onClick={() => removeBookmark()}
          className="group flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-amber-500 transition hover:text-amber-400 active:scale-95"
        >
          <span className="sr-only">Remove Bookmark</span>
          <StarIcon className="h-4 w-4 transition group-hover:scale-95" />
        </button>
      </Tooltip>
    );
  }

  if (!bookmarked) {
    return (
      <Tooltip content="Bookmark">
        <button
          type="button"
          onClick={() => bookmark()}
          className="group flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-white transition hover:text-amber-200 active:scale-95"
        >
          <span className="sr-only">Bookmark</span>
          <StarIcon className="h-4 w-4 transition group-hover:scale-95" />
        </button>
      </Tooltip>
    );
  }
}

function ToggleReadButton() {
  const { item } = usePage().props;
  const read = item.read_at;

  const markAsRead = () => {
    Inertia.visit(item_read_path(item.id), {
      method: "post",
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.custom((t) => (
          <Toast toast={t} icon="CheckCircleIcon" type="success">
            Marked as Read
          </Toast>
        ));
      },
    });
  };

  const markAsUnread = () => {
    Inertia.visit(item_read_path(item.id), {
      method: "delete",
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.custom((t) => (
          <Toast toast={t} icon="CheckCircleIcon" type="success">
            Marked as Unread
          </Toast>
        ));
      },
    });
  };

  return (
    <>
      {read && (
        <Tooltip content="Mark as Unread">
          <button
            type="button"
            onClick={() => markAsUnread()}
            className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition hover:text-cyan-50 active:scale-95"
          >
            <span className="sr-only">Mark as unread</span>
            <EyeOffIcon className="h-4 w-4 group-hover:scale-95" />
          </button>
        </Tooltip>
      )}

      {!read && (
        <Tooltip content="Mark as Read">
          <button
            type="button"
            onClick={() => markAsRead()}
            className="group flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white transition active:scale-95"
          >
            <span className="sr-only">Mark as read</span>
            <EyeIcon className="h-4 w-4 transition group-hover:scale-95" />
          </button>
        </Tooltip>
      )}
    </>
  );
}
