import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('emmaToken='))
    ?.split('=')[1];

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: 'tenderiloveu@gmail.com',
    password: '123456789',
  });

  const [loginState, setLoginState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const goToFront = () => {
    navigate('/');
  };

  const submit = async (e) => {
    try {
      // 驗證登入，登入取得 token
      const res = await axios.post('/v2/admin/signin', data);
      const { token, expired } = res.data;

      //用cookie存token
      document.cookie = `emmaToken=${token}; expires=${new Date(expired)}`;

      // 設定 token 到 axios 全域 headers
      axios.defaults.headers.common['Authorization'] = token;

      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      console.error('登入失敗');
      setLoginState(err.response.data);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          // 設定 token 到 axios 全域 headers
          axios.defaults.headers.common['Authorization'] = token;
          await axios.post('/v2/api/user/check');
          navigate('/admin/products');
        } catch (err) {
          if (!err.response.data.success) {
            axios.defaults.headers.common['Authorization'] = '';
            document.cookie = 'emmaToken=;';
          }
        }
      })();
    }
  }, [token]);

  return (
    <>
      <div className="admin-bg">
        <div className="container">
          <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-6 login-box">
              <h2 className="mb-2">登入帳號</h2>
              <div
                className={`alert alert-danger ${
                  loginState.message ? 'd-block' : 'd-none'
                }`}
                role="alert"
              >
                {loginState.message}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label w-100">
                  Email
                  <input
                    id="email"
                    className="form-control"
                    name="username"
                    type="email"
                    placeholder="Email Address"
                    value={data.username}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label w-100">
                  密碼
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="name@example.com"
                    value={data.password}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={submit}
                >
                  登入
                </button>
              </div>
              <div className="mb-2">
                <a className="goToFront-btn" role="button" onClick={goToFront}>
                  回到前台
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
