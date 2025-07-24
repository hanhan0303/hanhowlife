import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import AddOneBtn from './AddOneBtn';
import { useEffect, useState } from 'react';
import {fetchProducts} from "../apis";

export default function SwiperPerView({ spaceBetween, category }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetchProducts(category)
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        loop={!!products.length}
        modules={[Autoplay]}
        className="productsSwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {products?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Link
                className="product-img px-3"
                role="button"
                to={`/product/${item.id}`}
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                {item.price < item.origin_price ? (
                  <span className="sale">On Sale</span>
                ) : (
                  ''
                )}
                <small className="link-btn">查看內容</small>
              </Link>
              <div className="product-body p-3">
                <p className="product-title m-0">{item.title}</p>
                <p className="product-price mt-1">
                  {item.price < item.origin_price ? (
                    <span>${item.price}</span>
                  ) : (
                    ''
                  )}
                  <small
                    className={item.price < item.origin_price ? 'del' : ''}
                  >
                    ${item.origin_price} NTD
                  </small>
                </p>
                <AddOneBtn
                  btnClass="btn btn-sm btn-outline-primary mx-auto fs-6"
                  item={item}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
