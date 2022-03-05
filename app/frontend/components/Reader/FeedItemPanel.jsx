/* eslint-disable react/no-danger */
import React from "react";
import propTypes from "prop-types";
import { ExternalLinkIcon, EyeOffIcon, StarIcon } from "@heroicons/react/solid";

export default function FeedItemPanel({
  item: { content, title, published_at },
}) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="sticky top-0 border-b border-slate-100 bg-slate-50/90  px-6 py-2 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="">
            <h1 className="font-mono text-sm font-semibold text-slate-800">
              {title}
            </h1>
            <h6 className="font-mono text-xs text-slate-400">
              {new Date(published_at).toLocaleDateString()}
            </h6>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
            >
              <StarIcon className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 transition active:scale-95"
            >
              <EyeOffIcon className="h-4 w-4 text-white" />
            </button>
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-400 text-white hover:text-slate-200 active:scale-95"
            >
              <ExternalLinkIcon className="h-4 w-4 " />
            </button>
          </div>
        </div>
      </div>
      <div className="prose prose-cyan max-w-3xl self-center">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

FeedItemPanel.propTypes = {
  item: propTypes.shape({
    content: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    published_at: propTypes.string.isRequired,
  }).isRequired,
};
