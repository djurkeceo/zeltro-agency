import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(max-width: 768px)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }

    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
