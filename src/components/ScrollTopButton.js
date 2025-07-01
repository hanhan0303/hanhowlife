import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="scrollTop"
      role="button"
      onClick={scrollToTop}
      style={{
        display: show ? 'block' : 'none',
      }}
    >
      <i className="bi bi-rocket scrollTop-btn"></i>
    </div>
  );
}
