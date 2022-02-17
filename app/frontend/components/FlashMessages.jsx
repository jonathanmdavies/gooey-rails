import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import { EmojiHappyIcon, ExclamationIcon } from "@heroicons/react/solid";

export default function FlashMessages() {
  const { flash } = usePage().props;

  if (flash.alert) {
    return (
      <div className="mb-6 flex items-center rounded-lg bg-rose-50 px-3 py-2 font-mono text-sm font-medium text-rose-600">
        <ExclamationIcon className="mr-1 mt-px h-4 w-4" />
        {flash.alert}
      </div>
    );
  }

  if (flash.success) {
    return (
      <div className="mb-6 flex items-center rounded-lg bg-emerald-50 px-3 py-2 font-mono text-sm font-medium text-emerald-600">
        <EmojiHappyIcon className="mr-1 h-4 w-4" />
        {flash.success}
      </div>
    );
  }

  return <></>;
}
