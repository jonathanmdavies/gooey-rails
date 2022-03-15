import { useState, useEffect } from "react";

export function useIsVisible(ref) {
  const [isVisible, setisVisible] = useState(false);

  const handleObserve = (entries) => {
    const [entry] = entries;
    setisVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve, { threshold: 1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
}

export function useResizableX(ref, key) {
  const getLocalState = () => localStorage.getItem(key);

  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [width, setWidth] = useState(getLocalState);

  const start = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(ref.current.offsetWidth);
  };

  const resize = (e) => {
    const diff = e.clientX - initialPos;
    const newSize = initialSize + diff;
    setWidth(`${newSize}px`);
  };

  const end = () => {
    window.localStorage.setItem(key, width);
  };

  return { start, resize, end, width };
}
