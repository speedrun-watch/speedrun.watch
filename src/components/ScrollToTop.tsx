import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the previous scroll position on client-side navigation, so
// a <Link> can change the page while leaving you scrolled halfway down. Reset to
// the top whenever the path changes (but honor in-page #anchor links).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
