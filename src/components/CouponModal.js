import { useContext, useEffect, useState } from 'react';
import {
  handleErrorMessage,
  handleSuccessMessage,
  MessageContext,
} from '../store/messageStore';
import { addAdminCoupon, updateAdminCoupon } from '../apis';

export default function CouponModal({
  closeModal,
  getCoupons,
  type,
  tempCoupon,
}) {
  const [tempData, setTempData] = useState({
    title: '',
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: 'testCode',
  });
  const [, dispatch] = useContext(MessageContext);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['percent'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked,
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (type === 'edit') {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date));
    } else if (type === 'create') {
      setTempData({
        title: '',
        is_enabled: 1,
        percent: 80,
        due_date: 123456789,
        code: 'testCode',
      });
      setDate(new Date());
    }
  }, [type, tempCoupon]);

  const submit = async () => {
    setIsLoading(true);
    try {
      if (type === 'edit') {
        const res = await updateAdminCoupon(tempCoupon.id, tempData, date);
        console.log('優惠卷更新成功', res);
        handleSuccessMessage(dispatch, res);
      } else {
        const res = await addAdminCoupon(tempData, date);
        console.log('優惠卷新增成功', res);
        handleSuccessMessage(dispatch, res);
      }
      closeModal();
      getCoupons();
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
        id="couponModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="w-100" htmlFor="title">
                  標題<small style={{ color: 'red' }}>*</small>
                  <input
                    type="text"
                    id="title"
                    placeholder="請輸入標題"
                    name="title"
                    className="form-control mt-1"
                    onChange={handleChange}
                    value={tempData.title}
                  />
                </label>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="percent">
                    折扣（%）
                    <input
                      type="text"
                      name="percent"
                      id="percent"
                      placeholder="請輸入折扣（%）"
                      className="form-control mt-1"
                      onChange={handleChange}
                      value={tempData.percent}
                    />
                  </label>
                </div>
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="due_date">
                    到期日
                    <input
                      type="date"
                      id="due_date"
                      name="due_date"
                      placeholder="請輸入到期日"
                      className="form-control mt-1"
                      onChange={(e) => {
                        setDate(new Date(e.target.value));
                      }}
                      value={`${date.getFullYear().toString()}-${(
                        date.getMonth() + 1
                      )
                        .toString()
                        .padStart(2, 0)}-${date
                        .getDate()
                        .toString()
                        .padStart(2, 0)}`}
                    />
                  </label>
                </div>
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="code">
                    優惠碼
                    <input
                      type="text"
                      id="code"
                      name="code"
                      placeholder="請輸入優惠碼"
                      className="form-control mt-1"
                      onChange={handleChange}
                      value={tempData.code}
                    />
                  </label>
                </div>
              </div>
              <label className="form-check-label" htmlFor="is_enabled">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="is_enabled"
                  name="is_enabled"
                  onChange={handleChange}
                  checked={!!tempData.is_enabled}
                />
                是否啟用
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
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
