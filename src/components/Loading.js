import Lottie from 'lottie-react';
import animationData from '../assets/loadingText.json';
import { useEffect, useState } from 'react';

export default function Loading({ isLoading }) {
  const [hideClass, setHideClass] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isLoading) {
      timeout = setTimeout(() => {
        setHideClass(true);
      }, 1200);
    } else {
      setHideClass(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <>
      <div
        className={`loading ${isLoading ? '' : 'loading-hide'} ${
          hideClass ? 'd-none' : ''
        }`}
      >
        <Lottie
          className="loading-animation"
          animationData={animationData}
          autoplay
        />
      </div>
    </>
  );
}
