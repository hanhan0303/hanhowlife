import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { deleteCartAll, deleteCartItem, updateCartAPI } from '../../apis';

export default function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItems, setLoadingItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [removingItemAll, setRemovingItemAll] = useState(false);

  const removeCartItem = async (id) => {
    setRemovingItemId(id);
    try {
      await deleteCartItem(id);
      getCart();
    } catch (err) {
      console.error('刪除購物車品項失敗', err);
    } finally {
      setRemovingItemId(null);
    }
  };

  const removeAllItem = async () => {
    setRemovingItemAll(true);
    setIsLoading(true);
    try {
      await deleteCartAll();
      getCart();
    } catch (err) {
      console.error('移除購物車所有商品失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItem([...loadingItems, item.id]);
    try {
      const res = await updateCartAPI(item.id, item.product_id, quantity);
      console.log('更新購物車成功', res);
      setLoadingItem(
        loadingItems.filter((loadingObject) => loadingObject !== item.id),
      );
      getCart();
    } catch (err) {
      console.error('更新購物車失敗', err);
    }
  };

  return (
    <>
      <div className="container min-height">
        <div className="row justify-content-center">
          <div className="col-md-6 py-5">
            {cartData?.carts?.length === 0 ? (
              <>
                <div className="alert alert-secondary">還沒有選擇商品喔</div>
                <Link
                  to="/products"
                  className="btn btn-dark w-100 mt-4 rounded-0 py-3"
                >
                  選擇購買商品
                </Link>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <h2 className="mt-2">購物車</h2>
                </div>
                {cartData?.carts?.map((item) => {
                  return (
                    <div
                      className={`cart-item d-flex mt-4 bg-light ${
                        removingItemId === item.id || removingItemAll
                          ? 'remove-loading'
                          : ''
                      }`}
                      key={item.id}
                    >
                      <Link role="button" to={`/product/${item.product.id}`}>
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          className="object-cover"
                          style={{
                            width: '120px',
                            height: '120px',
                          }}
                        />
                      </Link>

                      <div className="item-cont w-100 p-3 position-relative">
                        <button
                          type="button"
                          className="position-absolute item-closeBtn"
                          style={{ top: '16px', right: '16px' }}
                          onClick={() => {
                            removeCartItem(item.id);
                          }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                        <Link
                          role="button"
                          to={`/product/${item.product.id}`}
                          className="cart-title"
                        >
                          <p className="mb-0 fw-bold">{item.product.title}</p>
                        </Link>

                        <p
                          className="mb-1 text-muted"
                          style={{ fontSize: '14px' }}
                        >
                          {item.product.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <div className="input-group w-50 align-items-center">
                            <select
                              name=""
                              className="form-select"
                              id=""
                              value={item.qty}
                              disabled={loadingItems.includes(item.id)}
                              onChange={(e) => {
                                updateCartItem(item, e.target.value * 1);
                              }}
                            >
                              {[
                                ...new Array(item.qty < 20 ? 20 : item.qty),
                              ].map((i, num) => {
                                return (
                                  <option value={num + 1} key={num}>
                                    {num + 1}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <p className="mb-0 ms-auto">NT${item.final_total}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總金額</p>
                  <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                </div>
                <Link
                  to="/checkorder"
                  className="btn btn-dark w-100 mt-4 rounded-0 py-3"
                >
                  訂單結帳
                </Link>
                <button
                  className="cart-delBtn btn btn-outline-secondary w-100 mx-auto mt-3 py-3"
                  type="button"
                  onClick={() => removeAllItem()}
                  disabled={isLoading}
                >
                  <span className={` ${isLoading ? 'd-none fade' : 'show'}`}>
                    清空購物車
                  </span>
                  <div
                    className={`dark-text bounceBall ${
                      isLoading ? 'show' : 'd-none fade'
                    }`}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
