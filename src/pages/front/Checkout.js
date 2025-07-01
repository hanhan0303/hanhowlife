import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Input } from '../../components/FormElements';
import { useRef, useState } from 'react';

export default function Checkout() {
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
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form,
    );
    console.log('訂單送出成功', res);
    getCart();
    navigate(`/success/${res.data.orderId}`);
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
      console.log('套用優惠卷失敗', err); //err.response.data.message
      setCouponResult(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" pt-5 pb-7 min-height">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
              <div className=" p-4">
                <h4 className="fw-bold">訂單資料</h4>
                <div className="mb-2">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="test@gmail.com"
                    errors={errors}
                    register={register}
                    rules={{
                      required: 'Email為必填',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'email格式不正確',
                      },
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="name"
                    labelText="姓名"
                    type="text"
                    placeholder="請輸入姓名"
                    errors={errors}
                    register={register}
                    rules={{
                      required: '姓名為必填',
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="tel"
                    labelText="手機"
                    type="tel"
                    errors={errors}
                    register={register}
                    placeholder="0987654321"
                    rules={{
                      required: '手機為必填',
                      pattern: {
                        value: /^09\d{8}$/,
                        message: '手機號碼格式錯誤，需以09開頭且共10碼',
                      },
                    }}
                  ></Input>
                </div>
                <div className="mb-2">
                  <Input
                    id="address"
                    labelText="寄送地址"
                    type="address"
                    errors={errors}
                    register={register}
                    placeholder="請輸入寄送地址"
                    rules={{
                      required: '寄送地址為必填',
                    }}
                  ></Input>
                </div>
              </div>
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link className="text-dark mt-md-0 mt-3" to="/cart">
                  <i className="bi bi-chevron-left me-2"></i> 回到購物車
                </Link>
                <button
                  type="submit"
                  className="btn btn-dark py-3 px-7 rounded-0"
                >
                  送出訂單
                </button>
              </div>
            </form>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">選購商品</h4>
                {cartData?.carts?.map((item) => {
                  return (
                    <div className="d-flex my-2" key={item.id}>
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="me-2"
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                        }}
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between fw-bold">
                          <p className="mb-0">{item.product.title}</p>
                          <p className="mb-0">x{item.qty}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="text-muted mb-0">
                            <small>NT$ {item.product.price}</small>
                          </p>
                          <p className="mb-0">NT$ {item.final_total}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="input-group mt-4">
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
                      className={`bounceBall ${
                        isLoading ? 'show' : 'd-none fade'
                      }`}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                </div>

                <small style={{ color: '#e35d6a' }}>
                  {couponResult?.message}
                </small>

                {couponResult?.success ? (
                  <div className="mt-4 d-flex flex-column align-items-end">
                    <small className="fs-7 text-muted">
                      總計金額：NT$ {cartData.final_total}
                    </small>
                    <p className="text-primary">
                      折扣後金額：NT$
                      <span className="fs-4">
                        {Math.round(cartData.final_total * 0.8)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-primary mt-4  d-flex justify-content-end align-items-center">
                    總計金額：NT$
                    <span className="fs-4">{cartData.final_total}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
