/* eslint-disable react/no-danger */
import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import Tooltip from "@/components/Tooltip";
import Toast from "@/components/Toast";
import IconButton from "@/components/Base/IconButton";
import { item_read_path, item_bookmark_path } from "@/routes";

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
                className="group flex h-7 w-7 items-center justify-center rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 active:scale-95"
              >
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
      <article className="prose prose-slate w-full max-w-3xl self-center p-6 prose-a:text-cyan-600 prose-a:no-underline  hover:prose-a:text-cyan-500">
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
        <IconButton
          onClick={() => removeBookmark()}
          icon="StarIcon"
          size="md"
          label="Remove Bookmark"
          className="text-amber-500 hover:text-amber-400"
        />
      </Tooltip>
    );
  }

  if (!bookmarked) {
    return (
      <Tooltip content="Bookmark">
        <IconButton
          label="Bookmark"
          onClick={() => bookmark()}
          icon="StarIcon"
          size="md"
          className="hover:text-amber-400"
        />
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
          <IconButton
            label="Mark as unread"
            onClick={() => markAsUnread()}
            icon="EyeOffIcon"
          />
        </Tooltip>
      )}

      {!read && (
        <Tooltip content="Mark as Read">
          <IconButton
            label="Mark as read"
            onClick={() => markAsRead()}
            icon="EyeIcon"
          />
        </Tooltip>
      )}
    </>
  );
}
