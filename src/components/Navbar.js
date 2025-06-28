import { NavLink } from 'react-router-dom';
import LogoImg from '../assets/logo.jpg';
import { useState } from 'react';
import News from './News';

export default function Navbar({ cartData }) {
  const [navShow, setNavShow] = useState(false);

  const closeMobNav = () => {
    setNavShow(false);
  };

  const totalQty = cartData?.carts?.reduce((acc, item) => {
    return acc + item.qty;
  }, 0);
  console.log('購物車數量', totalQty);
  const showMobNav = () => {
    if (navShow) {
      setNavShow(false);
      return;
    }
    setNavShow(true);
  };

  return (
    <>
      <header className="sticky-top container-fluid header-navbar px-0">
        {/* <News /> */}
        <nav className="navbar px-0 navbar-expand-md navbar-light">
          <div className="container py-2 px-3 text-secondary d-flex justify-content-end">
            <NavLink to="/" className="navbar-brand me-auto">
              <img src={LogoImg} className="logoImg me-3" />
            </NavLink>

            <div
              className={`collapse navbar-collapse ${navShow ? 'show' : ''}`}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link ps-0"
                    to="/about"
                    onClick={closeMobNav}
                  >
                    關於我們
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link ps-0"
                    to="/products"
                    onClick={closeMobNav}
                  >
                    能量商品
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link ps-0"
                    to="/service"
                    onClick={closeMobNav}
                  >
                    常見問題
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex nav-icons">
              <NavLink to="/cart" className="nav-link position-relative">
                <i className="bi bi-bag"></i>

                {totalQty !== 0 && (
                  <span
                    className={`position-absolute badge ${
                      totalQty ? '' : 'd-none'
                    }`}
                  >
                    {totalQty}
                  </span>
                )}
              </NavLink>
            </div>
            <button
              className="navbar-toggler border-0"
              type="button"
              onClick={() => {
                showMobNav();
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
        <div className={`overlay ${navShow ? 'show' : ''}`}></div>
      </header>
    </>
  );
}
