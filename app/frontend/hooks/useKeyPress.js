import { useEffect } from "react";

export default function useKeyPress(keyCode, callback, withMetaKey = false) {
  function handleKeyDown(e) {
    if (keyCode === e.key) {
      if (withMetaKey) {
        if (e.metaKey) {
          callback();
        }
      } else {
        callback();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
