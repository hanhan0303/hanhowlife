import { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import {
  handleErrorMessage,
  handleSuccessMessage,
  MessageContext,
} from '../../store/messageStore';
import { deleteAdminOrder, fetchAdminOrders } from '../../apis';
import LoadingAnimation from '../../components/LoadingAnimation';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);

  const orderModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    orderModalRef.current = new Modal('#orderModal', {
      backdrop: 'static',
    });
    deleteModalRef.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetchAdminOrders(page);
      const orderList = res.data.orders;
      console.log('抓訂單資料成功', orderList);
      setOrders(orderList);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error('抓訂單資料失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (order) => {
    setTempOrder(order);
    deleteModalRef.current.show();
  };
  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
  };

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModalRef.current.show();
  };
  const closeOrderModal = () => {
    setTempOrder({});
    orderModalRef.current.hide();
  };
  const deleteOrder = async (id) => {
    try {
      const res = await deleteAdminOrder(id);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getOrders();
        closeDeleteModal();
      }
    } catch (err) {
      console.log(err);
      handleErrorMessage(dispatch, err);
    }
  };
  return (
    <>
      <div className="admin-cont">
        <OrderModal
          closeOrderModal={closeOrderModal}
          getOrders={getOrders}
          tempOrder={tempOrder}
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempOrder.title}
          deleteProduct={deleteOrder}
          id={tempOrder.id}
        />
        <div className="table-header m-3">
          <h3>訂單列表</h3>
          <hr />
        </div>
        <div className="table-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">訂單 id</th>
                <th scope="col">購買用戶</th>
                <th scope="col">訂單金額</th>
                <th scope="col">付款狀態</th>
                <th scope="col">付款日期</th>
                <th scope="col">留言訊息</th>
                <th scope="col">編輯</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="7">
                    <LoadingAnimation />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.user?.name}
                        {order.user?.email}
                      </td>
                      <td>${order.total}</td>
                      <td>
                        {order.is_paid ? (
                          <span className="text-success fw-bold">付款完成</span>
                        ) : (
                          '未付款'
                        )}
                      </td>
                      <td>
                        {order.paid_date
                          ? new Date(order.paid_date * 1000).toLocaleString()
                          : '未付款'}
                      </td>
                      <td>{order.message}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            openOrderModal(order);
                          }}
                        >
                          查看
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-md-2 mt-1"
                          onClick={() => {
                            openDeleteModal(order);
                          }}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        <Pagination pagination={pagination} changePage={getOrders} />
      </div>
    </>
  );
}
