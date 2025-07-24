import { useState } from 'react';
export default function News() {
  const [newsModalShow, setNewsModalShow] = useState(false);
  const [newsHide, setNewsHide] = useState(false);
  const [copied, setCopied] = useState(false);
  const couponCode = 'vip888';

  const closeNews = () => {
    setNewsHide(true);
  };

  const closeNewsModal = () => {
    setNewsModalShow(false);
  };

  const showNewsModal = () => {
    if (newsModalShow) {
      setNewsModalShow(false);
      return;
    }
    setNewsModalShow(true);
  };

  // 複製優惠碼功能
  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('複製失敗：', err);
      });
  };

  return (
    <>
      <div className={`coupon-news ${newsHide ? 'd-none' : ''}`}>
        <div className="news">
          <div className="newsCont">
            <p>想要取得商品購物優惠嗎?</p>
            <button
              type="button"
              className="btn btn-sm"
              onClick={showNewsModal}
            >
              馬上領取
            </button>
            <button
              className="newsCont-closeBtn btn"
              type="button"
              onClick={closeNews}
            >
              X
            </button>
          </div>
        </div>
        <div className={`newsModal ${newsModalShow ? 'show' : ''}`}>
          <div className="newsModal-cont border border-info border-5 mt-3">
            <div className="newsModal-header">
              <h5 className="newsModal-title fw-bold">
                — HanHowLife 全新開幕 —
              </h5>
              <button
                className="newsModal-closeBtn btn"
                type="button"
                onClick={closeNewsModal}
              >
                X
              </button>
            </div>
            <div className="newsModal-body">
              <div className="img-couponAlert d-flex flex-column justify-content-center align-items-center text-white">
                <p className="bg-secondary bg-opacity-50 text-center fw-bold p-3 py-4 mb-3">
                  歡慶 HanHowLife 盛大開幕
                  <br /> 全館結帳不限金額，立即享 8 折優惠！
                </p>
                <button
                  type="button"
                  className="btn btn-info py-2 px-5 text-white"
                  onClick={handleCopyCode}
                >
                  複製優惠碼
                </button>
                {copied && (
                  <div
                    style={{
                      position: 'fixed',
                      top: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      zIndex: 9999,
                      opacity: 0.9,
                    }}
                  >
                    🎉 優惠碼已複製！
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
