import { useState, useEffect } from "react";

export default function useIsVisible(ref) {
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
