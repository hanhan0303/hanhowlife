import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
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
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      console.error('登入失敗');
      setLoginState(err.response.data);
      return; // 登入失敗就不要往下做
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>登入帳號</h2>
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
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
              >
                登入
              </button>
            </div>
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={goToFront}
              >
                回到前台
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
