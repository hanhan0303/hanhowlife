import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import successBanner from '../../assets/success-banner.png';

export default function Success() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});

  const getOrder = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`,
    );
    console.log('取得訂單成功', res);
    setOrderData(res.data.order);
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);
  return (
    <>
      <div className="container min-height">
        <div
          style={{
            minHeight: '400px',
            background: `url(${successBanner}) no-repeat center/cover`,
          }}
        ></div>
        <div className="mt-5 mb-7">
          <div className="row">
            <div className="col-md-6">
              <h2>訂單結帳成功</h2>
              <p className="text-muted">
                親愛的顧客，感謝您的訂購！我們已收到您的訂單，將盡快為您處理。
              </p>
              <p className="text-muted">
                感謝您的支持，期待為您送上最好的服務，生活愉快！
              </p>
              <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">
                回到首頁
              </Link>
            </div>
            <div className="col-md-6 ">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 px-4 py-0 bg-white">
                  <h2>訂單細節</h2>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {Object.values(orderData?.products || {}).map((item) => {
                      return (
                        <li className="list-group-item px-0" key={item.id}>
                          <div className="d-flex mt-2">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="me-2"
                              style={{ width: '60px', height: '60px' }}
                            />
                            <div className="w-100 d-flex flex-column">
                              <div className="d-flex justify-content-between fw-bold">
                                <h5>{item.product.title}</h5>
                                <p className="mb-0">x{item.qty}</p>
                              </div>
                              <div className="d-flex justify-content-between mt-auto">
                                <p className="text-muted mb-0">
                                  <small>NT${item.product.price}</small>
                                </p>
                                <p className="mb-0">NT${item.final_total}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    <li className="list-group-item px-0 pb-0">
                      <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">總金額</p>
                        <p className="mb-0 h4 fw-bold">NT${orderData.total}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
