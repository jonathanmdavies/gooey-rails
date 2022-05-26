import React from "react";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import Toast from "@/components/Toast";
import { item_read_path } from "@/routes";

export default function useMarkAsRead(item) {
  const read = item.read_at;

  const createRead = () => {
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

  const destroyRead = () => {
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

  return { read, createRead, destroyRead };
}
