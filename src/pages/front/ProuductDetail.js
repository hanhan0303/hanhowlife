import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import InfoIcon from '../../assets/info-icon.png';
import SwiperPerView from '../../components/SwiperPerView';
import BgNotice from '../../assets/crystal-care.jpg';
import LoadingAnimation from '../../components/LoadingAnimation';
import { addCartItem, fetchProduct } from '../../apis';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [mainIndex, setMainIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const { getCart } = useOutletContext();

  const handleMouseEnter = (index) => {
    setMainIndex(index);
  };

  const getProduct = async (id) => {
    try {
      const res = await fetchProduct(id);
      setProduct(res.data.product);
      console.log('用ID取得產品資料成功', res);
    } catch (err) {
      console.error('用ID取得產品資料失敗', err);
    }
  };
  const addToCart = async () => {
    const cartQuantity = Number(inputRef.current.value);

    setIsLoading(true);
    try {
      const res = await addCartItem(product.id, cartQuantity);
      console.log('加入購物車成功', res);
      getCart();
      setIsLoading(false);
    } catch (err) {
      console.error('加入購物車失敗', err);
      setIsLoading(false);
    }
  };
  console.log('data.product', product);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct(id);
  }, [id]);

  if (!product)
    return (
      <div className="min-height">
        <LoadingAnimation />
      </div>
    );

  return (
    <>
      <div className="min-height">
        {/* Product Details 商品圖片內容*/}
        <div className="product container row g-0 px-md-3 mx-auto">
          <div className="product-photos col-md-6 row g-0 align-self-start p-3 p-md-0">
            <div className="photo-lg col-12">
              <span
                className="photo-img"
                style={{
                  backgroundImage: `url(${product?.imageUrl})`,
                }}
              />
            </div>
            {Array.isArray(product?.imagesUrl) &&
              product.imagesUrl.slice(0, 3).map((url, index) => (
                <div
                  className={`photo-sm col-4 ${
                    mainIndex === index ? 'active' : ''
                  }`}
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <span
                    className="photo-img"
                    style={{
                      backgroundImage: `url(${url})`,
                    }}
                  ></span>
                </div>
              ))}
          </div>
          <div className="product-content col-md-6 text-center text-md-start">
            <div className="path d-block mb-4 fs-7">
              <Link to="/" className="breadcrumb-link">
                首頁
              </Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="breadcrumb-link">
                所有商品
              </Link>
              <span className="mx-2">/</span>
              <span className="breadcrumb-link active">{product.category}</span>
            </div>
            <h1>{product.title}</h1>
            <p className="product-desc">{product.content}</p>
            <p className="product-desc-secondary m-0">{product.description}</p>
            <p className="product-price mt-4">
              {product.price < product.origin_price ? (
                <>
                  <span>${product.price}</span>
                  <small className="del">$ {product.origin_price} NTD</small>
                </>
              ) : (
                <>
                  <small>$ {product.price} NTD</small>
                </>
              )}

              <small className="fs-7 ms-2 text-secondary">
                / {product.unit}
              </small>
            </p>
            <div className="product-btns col-md-9 d-md-flex">
              <input
                type="number"
                min="1"
                max="30"
                className="form-control product-quantity text-center text-md-start"
                inputMode="numeric"
                defaultValue={1}
                ref={inputRef}
              />

              <button
                className="product-addBtn btn btn-primary col-12 col-md-7 ms-md-2 p-3 mt-3 mt-md-0"
                type="button"
                onClick={() => addToCart()}
                disabled={isLoading}
              >
                <span className={` ${isLoading ? 'd-none fade' : 'show'}`}>
                  加入購物車
                </span>
                <div
                  className={`bounceBall ${isLoading ? 'show' : 'd-none fade'}`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Product Description 注意事項 */}
        <div className="product-info">
          <div className="container mx-auto p-3 py-md-0">
            <div className="product-info-text p-3 px-md-0 py-md-5 lh-lg">
              <h2 className="fs-5 text-primary">水晶保養與淨化方式</h2>
              <p className="mb-4">
                HanHowLife
                所使用的天然水晶皆經挑選與淨化，但水晶如同我們的身體，也需要定期清理與休息。建議以下方式保養水晶飾品：
              </p>
              <ul className="list-unstyled fa-ul m-0 mt-3">
                <li className="list-item">
                  <span className="fa-li">
                    <img src={InfoIcon} className="info-icon" />
                  </span>
                  避免長時間曝曬與碰水（如泡溫泉、洗澡、游泳時請取下）
                </li>
                <li className="list-item">
                  <span className="fa-li">
                    <img src={InfoIcon} className="info-icon" />
                  </span>
                  配戴一段時間後可進行淨化，建議方式：
                  <ul>
                    <li>白水晶團／晶洞淨化</li>
                    <li>曬月光（不建議曝曬日光）</li>
                    <li>使用音叉、頌缽或純淨意念祝福</li>
                  </ul>
                </li>
                <li className="list-item">
                  <span className="fa-li">
                    <img src={InfoIcon} className="info-icon" />
                  </span>
                  避免與化學物質接觸，如香水、清潔劑等
                </li>
                <li className="list-item">
                  <span className="fa-li">
                    <img src={InfoIcon} className="info-icon" />
                  </span>
                  建議每週定期與水晶對話，感謝它的陪伴與支持。
                </li>
              </ul>
            </div>
            <div className="bg-notice">
              <img className="object-cover" src={BgNotice} alt="" />
            </div>
          </div>
        </div>
        {/* Related Products 相關商品*/}
        <div className="related-products container px-3 mb-5">
          <h2 className="fs-4 text-center my-5">相關商品</h2>
          <SwiperPerView spaceBetween="30" category={product.category} />
        </div>
      </div>
    </>
  );
}
