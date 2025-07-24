import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import { fetchOrder, payOrder } from '../../apis';

export default function Checkout() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const getOrder = async (orderId) => {
    const res = await fetchOrder(orderId);
    console.log('取得訂單成功', res);
    setOrderData(res.data.order);
  };

  const handlePaidSubmit = async (orderId) => {
    setIsLoading(true);
    try {
      const res = await payOrder(orderId, isPaid);
      console.log('付款完成', res);
      setIsPaid(true);
    } catch (err) {
      console.error('付款失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  if (!orderData) return <LoadingAnimation />;
  return (
    <>
      <div className="container min-height">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <div className="row g-0 p-md-3">
              <ul className="steps row g-0 list-unstyled mb-4">
                <li className="col-4">
                  <small className="ls-3">STEP1</small>
                  <span>確認訂單</span>
                </li>
                <li className={`col-4 ${isPaid ? '' : 'active'}`}>
                  <small className="ls-3">STEP2</small>
                  <span>建立訂單</span>
                </li>
                <li className={`col-4 ${isPaid ? 'active' : ''}`}>
                  <small className="ls-3">STEP3</small>
                  <span>完成訂單</span>
                </li>
              </ul>
            </div>
            <div className="row g-0 justify-content-between">
              <div className="col-md-6 col-lg-5 px-md-3">
                <h2 className="fs-4 d-flex mb-4">
                  訂單內容&nbsp;
                  {isPaid ? (
                    <span className="text-success">(已付款)</span>
                  ) : (
                    <span className="text-danger">(未付款)</span>
                  )}
                </h2>
                <ul className="list-unstyled">
                  {Object.values(orderData?.products || {}).map((item) => {
                    return (
                      <li
                        className="d-flex align-items-center mb-4"
                        key={item.id}
                      >
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
                <hr />

                <p className="text-primary  d-flex justify-content-end align-items-center">
                  總計金額：$
                  <span className="fs-4 me-1">{orderData.total}</span> NTD
                </p>
              </div>
              <div className="col-md-6 p-4 py-5 p-md-5 bg-white">
                <h2 className="fs-4 d-flex mb-4">訂購資訊</h2>
                <ul className="list-unstyled">
                  <li className="d-flex">
                    <p className="col-4">訂單金額：</p>
                    <p
                      className={`col ${
                        isPaid ? 'text-success' : 'text-danger'
                      }`}
                    >
                      $ <b className="fs-5">{orderData.total}</b> NTD
                    </p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4 text-nowrap">訂單編號：</p>
                    <p className="col">{orderData.id}</p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">訂購時間：</p>
                    <p className="col">
                      {new Date(orderData.create_at * 1000).toLocaleString()}
                    </p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">Email：</p>
                    <p className="col">{orderData.user.email}</p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">收件人姓名：</p>
                    <p className="col">{orderData.user.name}</p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">聯絡電話：</p>
                    <p className="col">{orderData.user.tel}</p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">收件地址：</p>
                    <p className="col">{orderData.user.address}</p>
                  </li>
                  <li className="d-flex">
                    <p className="col-4">備註：</p>
                    <p className="col">
                      {orderData.message ? orderData.message : '無'}
                    </p>
                  </li>
                </ul>
                {isPaid ? (
                  <></>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-100 py-3 mt-5 rounded-0"
                    onClick={() => handlePaidSubmit(orderId)}
                  >
                    信用卡付款
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
