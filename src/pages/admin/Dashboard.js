import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import Message from '../../components/Message';
import {
  initState,
  MessageContext,
  messageReducer,
} from '../../store/messageStore';
import ScrollTopButton from '../../components/ScrollTopButton';
import { checkAdmin, logoutAdmin } from '../../apis';
import { LOCALSTORAGE_KEY } from '../../constants';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const reducer = useReducer(messageReducer, initState);
  const navigate = useNavigate();

  // 每次初始化就從localStorage取出token，這樣已經登入過一次就不必再次登入
  const token = localStorage.getItem(LOCALSTORAGE_KEY);

  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await logoutAdmin();
      console.log('登出成功', res);
      localStorage.removeItem(LOCALSTORAGE_KEY);
      navigate('/login');
    } catch (err) {
      console.error('登出失敗');
    } finally {
      setIsLoading(false);
    }
  };

  const goToFront = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }

    (async () => {
      try {
        await checkAdmin();
      } catch (err) {
        if (!err.response.data.success) {
          localStorage.removeItem(LOCALSTORAGE_KEY);
          navigate('/login');
        }
      }
    })();
  }, [navigate, token]);

  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />
        <header className="admin-header bg-dark container-fluid">
          <p className="text-white mb-0">HANHOWLIFE 後台管理系統</p>
          <div className="header-btn">
            <button
              type="button"
              className="btn btn-sm btn-light me-2"
              onClick={logout}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : '登出'}
            </button>

            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={goToFront}
            >
              回到前台
            </button>
          </div>
        </header>
        <div className="d-flex admin-cont">
          <div className="admin-nav">
            <ul className="list-group list-group-flush">
              <NavLink
                className="list-group-item list-group-item-action py-3"
                to="/admin/products"
              >
                <i className="bi bi-box-seam-fill me-2"></i>
                產品列表
              </NavLink>
              <NavLink
                className="list-group-item list-group-item-action py-3"
                to="/admin/coupons"
              >
                <i className="bi bi-ticket-perforated-fill me-2" />
                優惠卷列表
              </NavLink>
              <NavLink
                className="list-group-item list-group-item-action py-3"
                to="/admin/orders"
              >
                <i className="bi bi-receipt me-2" />
                訂單列表
              </NavLink>
            </ul>
          </div>
          <div className="w-100">{token && <Outlet />}</div>
        </div>
      </MessageContext.Provider>
      <ScrollTopButton />
    </>
  );
}
