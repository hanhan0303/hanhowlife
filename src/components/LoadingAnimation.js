import Lottie from 'lottie-react';
import animationData from '../assets/loading.json';

export default function LoadingAnimation() {
  return (
    <>
      <div className="loading">
        <Lottie
          className="loading-animation"
          animationData={animationData}
          autoplay
        />
      </div>
    </>
  );
}
