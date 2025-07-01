import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollTopButton from '../../components/ScrollTopButton';

export default function FrontLayout() {
  const [cartData, setCartData] = useState({});
  const navigate = useNavigate();
  const login = () => {
    navigate('/admin/products');
  };

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
      );
      console.log('取得購物車成功', res);
      setCartData(res.data.data);
    } catch (err) {
      console.log('取得購物車', err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <div className="front">
        <Navbar cartData={cartData} />
        <Outlet context={{ getCart, cartData }}></Outlet>
        <footer className="footer bg-dark py-4 py-md-5 text-light">
          <div className="container row g-0 mx-auto px-3 fs-7 ls-2 text-secondary text-uppercase text-center">
            <div className="footer-text mb-3">
              <p className="mb-1">
                本網站僅供個人作品使用，不提供商業用途
                <span className="mx-2 line">|</span>
                <span role="button" className="footer-loginBtn" onClick={login}>
                  登入後台
                </span>
              </p>
              <small>HanHowLife © 2025 copyright</small>
            </div>
            <ul className="list-unstyled d-flex justify-content-center m-0">
              <li className="footer-icon fs-7">
                <a
                  href="https://www.instagram.com/dreamslover7?igsh=MTh4NXJvbHJ0MmxhcA%3D%3D&utm_source=qr"
                  target="_blank"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="footer-icon fs-7">
                <a
                  href="https://github.com/hanhan0303/hanhowlife"
                  target="_blank"
                >
                  <i className="bi bi-github"></i>
                </a>
              </li>
              <li className="footer-icon fs-7">
                <a href="mailto:tenderilovu@gmail.com" target="_blank">
                  <i className="bi bi-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <ScrollTopButton />
      </div>
    </>
  );
}
