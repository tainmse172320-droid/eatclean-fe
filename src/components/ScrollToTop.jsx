import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Component tự động scroll về đầu trang mỗi khi chuyển route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
