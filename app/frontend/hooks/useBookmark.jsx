import React from "react";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { item_bookmark_path } from "@/routes";
import Toast from "@/components/Toast";

export default function useBookmark(item) {
  const bookmarked = item.bookmarked_at;

  const createBookmark = () => {
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

  const destroyBookmark = () => {
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

  return { bookmarked, createBookmark, destroyBookmark };
}
