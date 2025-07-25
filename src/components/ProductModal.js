import { useContext, useEffect, useState } from 'react';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from '../store/messageStore';
import { addAdminProduct, updateAdminProduct, uploadImage } from '../apis';

export default function ProductModal({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
}) {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    originPrice: 300,
    price: 100,
    unit: '',
    description: '',
    content: '',
    isEnabled: 1,
    imageUrl: '',
  });

  const [, dispatch] = useContext(MessageContext);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['originPrice', 'price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'isEnabled') {
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

  const toAPI = (formData) => {
    const {
      id,
      title,
      category,
      originPrice,
      price,
      unit,
      description,
      content,
      isEnabled,
      imageUrl,
    } = formData;

    return {
      id: id,
      title: title,
      category: category,
      origin_price: Number(originPrice),
      price: Number(price),
      unit: unit,
      description: description,
      content: content,
      is_enabled: isEnabled,
      imageUrl: imageUrl,
    };
  };

  useEffect(() => {
    if (type === 'edit') {
      setTempData(tempProduct);
    } else if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        originPrice: 300,
        price: 100,
        unit: '',
        description: '',
        content: '',
        isEnabled: 1,
        imageUrl: '',
      });
    }
  }, [type, tempProduct]);

  const submit = async () => {
    setIsLoading(true);
    try {
      if (type === 'edit') {
        const res = await updateAdminProduct(tempProduct.id, toAPI(tempData));
        console.log('資料更新成功', res);
        handleSuccessMessage(dispatch, res);
      } else {
        const res = await addAdminProduct(toAPI(tempData));
        console.log('資料新增成功', res);
        handleSuccessMessage(dispatch, res);
      }
      closeProductModal();
      getProducts();
    } catch (err) {
      console.log(err.response.data.message);
      handleErrorMessage(dispatch, err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      setUploadImageLoading(true);
      const res = await uploadImage(formData);
      setTempData({ ...tempData, imageUrl: res.data.imageUrl });
      console.log('上傳圖片成功', res);
    } catch (err) {
      console.error('上傳圖片失敗', err);
    } finally {
      setUploadImageLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        id="productModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeProductModal}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image">
                      輸入圖片網址
                      <input
                        type="text"
                        name="imageUrl"
                        id="image"
                        placeholder={
                          uploadImageLoading ? 'loading...' : '請輸入圖片連結'
                        }
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.imageUrl}
                        disabled={uploadImageLoading}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile">
                      或 上傳圖片
                      <input
                        type="file"
                        id="customFile"
                        className="form-control"
                        onChange={(e) => {
                          uploadFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                  <img
                    src={`${tempData.imageUrl || null}`}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="title">
                      標題<small style={{ color: 'red' }}>*</small>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="請輸入標題"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.title}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="category">
                        分類<small style={{ color: 'red' }}>*</small>
                        <input
                          type="text"
                          id="category"
                          name="category"
                          placeholder="請輸入分類"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.category}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="unit">
                        單位<small style={{ color: 'red' }}>*</small>
                        <input
                          type="unit"
                          id="unit"
                          name="unit"
                          placeholder="請輸入單位"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.unit}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="originPrice">
                        原價
                        <input
                          type="number"
                          id="originPrice"
                          name="originPrice"
                          placeholder="請輸入原價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.originPrice}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="price">
                        售價
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="請輸入售價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.price}
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="description">
                      產品描述
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="請輸入產品描述"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.description}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="content">
                      說明內容
                      <textarea
                        type="text"
                        id="content"
                        name="content"
                        placeholder="請輸入產品說明內容"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.content}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <div className="form-check">
                      <label
                        className="w-100 form-check-label"
                        htmlFor="isEnabled"
                      >
                        是否啟用
                        <input
                          type="checkbox"
                          id="isEnabled"
                          name="isEnabled"
                          placeholder="請輸入產品說明內容"
                          className="form-check-input"
                          onChange={handleChange}
                          checked={!!tempData.isEnabled}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeProductModal}
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
