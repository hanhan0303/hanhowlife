import { useContext, useEffect, useState } from 'react';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../store/messageStore';
import { updateOrder } from '../apis';

export default function OrderModal({ closeOrderModal, getOrders, tempOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    is_paid: '',
    status: 0,
    ...tempOrder,
  });

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
    console.log(tempData);
  }, [tempOrder]);

  const handleChange = (e) => {
    const { value, name, checked } = e.target;
    if (['is_paid'].includes(name)) {
      setTempData((preState) => ({ ...preState, [name]: checked }));
    } else {
      setTempData((preState) => ({ ...preState, [name]: value }));
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await updateOrder(tempOrder.id, tempData);
      console.log(res);
      handleSuccessMessage(dispatch, res);
      closeOrderModal();
      getOrders();
    } catch (err) {
      console.log(err.response.data.message);
      handleErrorMessage(dispatch, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        id="orderModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {`編輯 ${tempData.id}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeOrderModal}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">Email</span>
                <div className="col-sm-10">
                  <input
                    type="email"
                    readOnly
                    className="form-control-plaintext"
                    id="staticEmail"
                    defaultValue={tempOrder?.user?.email}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">訂購者</span>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="staticEmail"
                    defaultValue={tempOrder?.user?.name}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">訂單地址</span>
                <div className="col-sm-10">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={tempOrder?.user?.address}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <span className="col-sm-2 col-form-label">留言</span>
                <div className="col-sm-10">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    readOnly
                    className="form-control-plaintext"
                    defaultValue={tempOrder.message}
                  />
                </div>
              </div>
              {tempOrder.products && (
                <table className="table">
                  <thead>
                    <tr>
                      <th>品項名稱</th>
                      <th>數量</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(tempOrder.products).map((cart) => (
                      <tr key={cart.id}>
                        <td>{cart.product.title}</td>
                        <td>{cart.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="border-0 text-end">總金額</td>
                      <td className="border-0">${tempOrder.total}</td>
                    </tr>
                  </tfoot>
                </table>
              )}

              <div>
                <h5 className="mt-4">修改付款狀態</h5>
                <div className="form-check mb-4">
                  <label className="form-check-label" htmlFor="is_paid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_paid"
                      id="is_paid"
                      checked={!!tempData.is_paid}
                      onChange={handleChange}
                    />
                    付款狀態 ({tempData.is_paid ? '已付款' : '未付款'})
                  </label>
                </div>
                <div className="mb-4">
                  <span className="col-sm-2 col-form-label d-block">
                    訂單進度
                  </span>
                  <select
                    className="form-select"
                    name="status"
                    value={tempData.status}
                    onChange={handleChange}
                  >
                    <option value={0}>未確認</option>
                    <option value={1}>已確認</option>
                    <option value={2}>出貨中</option>
                    <option value={3}>已送達</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeOrderModal}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
                disabled={isLoading}
              >
                {isLoading ? 'loading...' : '儲存'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
