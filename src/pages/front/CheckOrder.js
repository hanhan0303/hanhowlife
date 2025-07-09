import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Input, Textarea } from '../../components/FormElements';
import { useState } from 'react';

export default function CheckOrder() {
  const { cartData, getCart } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState('vip888');
  const [couponResult, setCouponResult] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address, message } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
        message: message.trim(),
      },
    };

    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form,
    );
    console.log('訂單送出成功', res);
    getCart();
    navigate(`/checkout/${res.data.orderId}`);
  };

  const handleCouponSubmit = async () => {
    const data = {
      data: {
        code: coupon,
      },
    };
    setIsLoading(true);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        data,
      );
      console.log('已套用優惠卷', res);
      setCouponResult(res.data);
    } catch (err) {
      console.log('套用優惠卷失敗', err);
      setCouponResult(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container min-height">
        <div className="row g-0 p-md-3">
          <ul className="steps row g-0 list-unstyled mb-4">
            <li className="col-4 active">
              <small className="ls-3">STEP1</small>
              <span>確認訂單</span>
            </li>
            <li className="col-4">
              <small className="ls-3">STEP2</small>
              <span>建立訂單</span>
            </li>
            <li className="col-4">
              <small className="ls-3">STEP3</small>
              <span>完成訂單</span>
            </li>
          </ul>
        </div>
        <div className="row g-0 justify-content-between">
          <div className="col-md-6 col-lg-5 px-md-3 m-0">
            <h2 className="fs-4 d-flex mb-md-5 mb-3">
              確認訂單內容
              <Link
                className="btn btn-sm btn-outline-primary ms-2 rounded-0"
                to="/cart"
                role="button"
              >
                修改內容
              </Link>
            </h2>
            <ul className="list-unstyled">
              {cartData?.carts?.map((item) => {
                return (
                  <li className="d-flex align-items-center mb-4" key={item.id}>
                    <div
                      className="cart-img"
                      style={{
                        backgroundImage: `url(${item.product.imageUrl})`,
                      }}
                    ></div>
                    <div className="cart-cont col px-md-3 px-2 d-flex">
                      <div className="col-md-7 col-6 pe-2">
                        <p className="m-0">{item.product.title}</p>
                        <small>數量：{item.qty}</small>
                      </div>
                      <div className="col-md-5 col-6 ls-1 text-end">
                        $ {item.final_total} NTD
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="input-group">
              <input
                className={`p-2 coupon-input form-control ${
                  couponResult?.success ? 'use-coupon' : ''
                }`}
                type="text"
                placeholder="輸入優惠碼"
                disabled={couponResult?.success}
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
              <button
                className="product-addBtn btn btn-sm btn-primary px-3"
                type="button"
                onClick={() => handleCouponSubmit()}
                disabled={couponResult?.success}
              >
                <span className={` ${isLoading ? 'd-none fade' : 'show'}`}>
                  套用優惠卷
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
            <small className=" mb-4" style={{ color: '#e35d6a' }}>
              {couponResult?.message}
            </small>
            {couponResult?.success ? (
              <div className="mt-4 d-flex flex-column align-items-end">
                <small className="fs-7 text-muted">
                  總計金額：$ {cartData.final_total} NTD
                </small>
                <p className="text-primary">
                  折扣後金額：$
                  <span className="fs-4 me-1">
                    {Math.round(cartData.final_total * 0.8)}
                  </span>
                  NTD
                </p>
              </div>
            ) : (
              <p className="text-primary mt-4  d-flex justify-content-end align-items-center">
                總計金額：$
                <span className="fs-4 me-1">{cartData.final_total}</span> NTD
              </p>
            )}
          </div>
          <div className="col-md-6 p-md-5 p-3 bg-white min-vh-50">
            <h2>填寫訂購資訊</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="請輸入 Email"
                    errors={errors}
                    register={register}
                    rules={{
                      required: 'Email 為必填',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email 格式不正確',
                      },
                    }}
                  ></Input>
                </li>
                <li className="mb-3">
                  <Input
                    id="name"
                    labelText="收件人姓名"
                    type="text"
                    placeholder="請輸入姓名"
                    errors={errors}
                    register={register}
                    rules={{
                      required: '姓名 為必填',
                    }}
                  ></Input>
                </li>
                <li className="mb-3">
                  <Input
                    id="tel"
                    labelText="聯絡電話"
                    type="tel"
                    errors={errors}
                    register={register}
                    placeholder="請輸入手機號碼"
                    rules={{
                      required: '手機號碼 為必填',
                      pattern: {
                        value: /^09\d{8}$/,
                        message: '請輸入正確的手機號碼',
                      },
                    }}
                  ></Input>
                </li>
                <li className="mb-3">
                  <Input
                    id="address"
                    labelText="收件地址"
                    type="address"
                    errors={errors}
                    register={register}
                    placeholder="請輸入地址"
                    rules={{
                      required: '地址 為必填',
                    }}
                  ></Input>
                </li>
                <li>
                  <Textarea register={register} id="message" labelText="備註" />
                </li>
              </ul>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 mt-5 rounded-0"
              >
                送出訂單
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
