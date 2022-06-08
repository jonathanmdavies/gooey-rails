import useMarkAsRead from "@/hooks/useMarkAsRead";
import useBookmark from "@/hooks/useBookmark";
import useOpenLink from "@/hooks/useOpenLink";

function itemActions(item) {
  const { read, createRead, destroyRead } = useMarkAsRead(item);
  const { bookmarked, createBookmark, destroyBookmark } = useBookmark(item);
  const { openLink } = useOpenLink(item);

  return [
    {
      name: "Mark as Read",
      icon: "EyeIcon",
      show: !read,
      action: () => {
        createRead();
      },
    },
    {
      name: "Mark as Unread",
      icon: "EyeOffIcon",
      show: read,
      action: () => {
        destroyRead();
      },
    },
    {
      name: "Bookmark",
      icon: "StarIcon",
      show: !bookmarked,
      action: () => {
        createBookmark();
      },
    },
    {
      name: "Remove Bookmark",
      icon: "StarIcon",
      show: bookmarked,
      action: () => {
        destroyBookmark();
      },
    },
    {
      name: "Open Original",
      icon: "ExternalLinkIcon",
      show: true,
      action: () => {
        openLink();
      },
    },
  ].filter((action) => action.show);
}

export default function createActions(item) {
  if (item) {
    return itemActions(item);
  }

  return [];
}
