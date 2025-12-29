import { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import {
  handleErrorMessage,
  handleSuccessMessage,
  MessageContext,
} from '../../store/messageStore';
import { deleteAdminCoupon, fetchAdminCoupons } from '../../apis';
import LoadingAnimation from '../../components/LoadingAnimation';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);
  const couponModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    couponModalRef.current = new Modal('#couponModal', {
      backdrop: 'static',
    });
    deleteModalRef.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetchAdminCoupons(page);
      const couponsList = res.data.coupons;
      setCoupons(couponsList);
      setPagination(res.data.pagination);
      console.log('套用優惠卷成功', res);
    } catch (err) {
      console.error('套用優惠卷失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModalRef.current.show();
  };
  const closeModal = () => {
    couponModalRef.current.hide();
  };
  const openDeleteModal = (item) => {
    setTempCoupon(item);
    deleteModalRef.current.show();
  };
  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
  };

  const deleteCoupon = async (id) => {
    try {
      const res = await deleteAdminCoupon(id);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getCoupons();
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
        <CouponModal
          closeModal={closeModal}
          getCoupons={getCoupons}
          type={type}
          tempCoupon={tempCoupon}
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempCoupon.title}
          deleteProduct={deleteCoupon}
          id={tempCoupon.id}
        />
        <div className="table-header m-3">
          <h3>優惠券列表</h3>
          <hr />
          <div className="text-end table-addBtn">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                openCouponModal('create', {});
              }}
            >
              建立新優惠券
            </button>
          </div>
        </div>

        <div className="table-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">標題</th>
                <th scope="col" style={{ minWidth: '50px' }}>
                  折扣
                </th>
                <th scope="col">到期日</th>
                <th scope="col">優惠碼</th>
                <th scope="col" style={{ minWidth: '50px' }}>
                  <span className="mob-hide">啟用</span>狀態
                </th>
                <th scope="col">編輯</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <LoadingAnimation />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {coupons.map((coupon) => {
                  return (
                    <tr key={coupon.id}>
                      <td>{coupon.title}</td>
                      <td>{coupon.percent}</td>
                      <td>{`${new Date(coupon.due_date)
                        .getFullYear()
                        .toString()}-${(
                        new Date(coupon.due_date).getMonth() + 1
                      )
                        .toString()
                        .padStart(2, 0)}-${new Date(coupon.due_date)
                        .getDate()
                        .toString()
                        .padStart(2, 0)}`}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.is_enabled ? '啟用' : '未啟用'}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            openCouponModal('edit', coupon);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-md-2 mt-1"
                          onClick={() => {
                            openDeleteModal(coupon);
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

        <Pagination pagination={pagination} changePage={getCoupons} />
      </div>
    </>
  );
}
