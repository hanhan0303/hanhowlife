import { useEffect, useRef, useState } from 'react';

export default function FadeInBox({
  children,
  as: Tag = 'div',
  className = '',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // 只觀察一次
        }
      },
      {
        threshold: 0.1, // 元素顯示 10% 以上才觸發
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const combinedClassName = `${className} ${
    isVisible ? 'fade-in' : 'fade-out'
  }`.trim();

  return (
    <>
      <Tag ref={ref} className={combinedClassName}>
        {children}
      </Tag>
    </>
  );
}
