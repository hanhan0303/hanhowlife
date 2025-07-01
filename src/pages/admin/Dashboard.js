import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Message from '../../components/Message';
import {
  initState,
  MessageContext,
  messageReducer,
} from '../../store/messageStore';
import ScrollTopButton from '../../components/ScrollTopButton';

export default function Dashboard() {
  const reducer = useReducer(messageReducer, initState);
  const navigate = useNavigate();

  // 每次初始化就從cookie取出token，這樣已經登入過一次就不必再次登入
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('emmaToken='))
    ?.split('=')[1];

  const logout = () => {
    document.cookie = 'emmaToken=;';
    navigate('/login');
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
        // 設定 token 到 axios 全域 headers
        axios.defaults.headers.common['Authorization'] = token;

        await axios.post('/v2/api/user/check');
      } catch (err) {
        if (!err.response.data.success) {
          axios.defaults.headers.common['Authorization'] = '';
          document.cookie = 'emmaToken=;';
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
            >
              登出
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
