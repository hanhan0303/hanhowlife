import naturalIngredientsImg from '../../assets/index-natural-ingredients.jpg';
import crystalIcon from '../../assets/crystal.png';
import starIcon from '../../assets/star.png';
import healthyDeliciousImg from '../../assets/index-healthy-delicious.jpg';
import SwiperPerView from '../../components/SwiperPerView';
import FadeInBox from '../../components/FadeInBox';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="container-fluid px-0  min-height">
        <div className="bg-cover index-banner">
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-center text-white">
              將自然能量，溫柔帶進你的生活日常
            </h1>
            <Link
              to="/products"
              className="btn btn-outline-light px-5 mx-auto mt-3 fs-5"
              role="button"
            >
              探索能量好物
            </Link>
          </div>
        </div>
        <div className="container px-3 intro-section">
          <h2 className="fs-4 text-center p-5">讓生活回到最純粹的頻率</h2>
          <FadeInBox as="div" className="row g-3 mb-5">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                className=" object-cover intro-section-img"
                src={naturalIngredientsImg}
                alt="天然水晶能量"
              />
            </div>
            <div className="col-12 col-md-6 p-3 p-md-5 d-flex justify-content-center align-items-center flex-column text-center lh-lg">
              <h4 className="fs-5 text-primary">堅持天然與純淨</h4>
              <p className="mb-1"> 精選具頻率感應的天然水晶與礦石 </p>
              <p className="mb-1"> 每件飾品皆淨化處理，導入溫柔意圖 </p>
              <p className="mb-0"> 不為裝飾而設計，只為喚醒你的內在力量 </p>
              <div className="mt-3 d-flex justify-content-center align-items-center">
                <img className="cookie-icon me-3" src={crystalIcon} />
                <img className="cookie-icon me-3" src={starIcon} />
                <img className="cookie-icon" src={starIcon} />
              </div>
            </div>
          </FadeInBox>
          <FadeInBox as="div" className="row g-3 mb-5 flex-md-row-reverse">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <img
                className=" object-cover intro-section-img"
                src={healthyDeliciousImg}
                alt="能量蠟燭與能量油"
              />
            </div>
            <div className="col-12 col-md-6 p-3 p-md-5 d-flex justify-content-center align-items-center flex-column text-center lh-lg">
              <h4 className="fs-5 text-primary">從心開始的療癒</h4>
              <p className="mb-1"> 能量油以植物精華製成，協助情緒釋放與轉化 </p>
              <p className="mb-1"> 蠟燭設計結合意圖引導，點燃時為自己許願 </p>
              <p className="mb-0"> 每一件作品，都是與自己連結的起點 </p>
              <div className="mt-3 d-flex justify-content-center align-items-center">
                <img className="cookie-icon me-3" src={starIcon} />
                <img className="cookie-icon me-3" src={crystalIcon} />
                <img className="cookie-icon" src={starIcon} />
              </div>
            </div>
          </FadeInBox>
        </div>
        <div className="px-3 py-5 hot-section">
          <FadeInBox as="div" className="container">
            <h2 className="fs-4 text-center mb-5">熱銷商品</h2>
            <SwiperPerView spaceBetween="30" category="熱銷" />
          </FadeInBox>
        </div>
        <div className="bg-primary">
          <div className="py-3">
            <ul className="info-block text-light">
              <li className=" py-4 px-md-3">
                <div className="info-icon">
                  <i className="bi bi-truck"></i>
                </div>
                <div className="info-text">
                  <h4>免運費</h4>
                  <small>消費滿 $1000 免運費</small>
                </div>
              </li>
              <li className=" py-4 px-md-3">
                <div className="info-icon">
                  <i className="bi bi-gift"></i>
                </div>
                <div className="info-text">
                  <h4>加碼送</h4>
                  <small>凡購買皆送手鍊清潔布</small>
                </div>
              </li>
              <li className=" py-4 px-md-3">
                <div className="info-icon">
                  <i className="bi bi-coin"></i>
                </div>
                <div className="info-text">
                  <h4>付款方式</h4>
                  <small>多元付款方式</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
