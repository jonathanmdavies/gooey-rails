/* eslint-disable react/no-danger */
import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import Tooltip from "@/components/Tooltip";
import IconButton from "@/components/Base/IconButton";
import useBookmark from "@/hooks/useBookmark";
import useMarkAsRead from "@/hooks/useMarkAsRead";
import useOpenLink from "@/hooks/useOpenLink";

export default function FeedItemPanel() {
  const { item, feed } = usePage().props;
  const { openLink } = useOpenLink(item);

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
              <IconButton icon="ExternalLinkIcon" onClick={openLink} />
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
  const { bookmarked, createBookmark, destroyBookmark } = useBookmark(item);

  if (bookmarked) {
    return (
      <Tooltip content="Remove Bookmark">
        <IconButton
          onClick={() => destroyBookmark()}
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
          onClick={() => createBookmark()}
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
  const { read, createRead, destroyRead } = useMarkAsRead(item);

  if (read) {
    return (
      <Tooltip content="Mark as Unread">
        <IconButton
          label="Mark as unread"
          onClick={() => destroyRead()}
          icon="EyeOffIcon"
        />
      </Tooltip>
    );
  }

  if (!read) {
    return (
      <Tooltip content="Mark as Read">
        <IconButton
          label="Mark as read"
          onClick={() => createRead()}
          icon="EyeIcon"
        />
      </Tooltip>
    );
  }
}
