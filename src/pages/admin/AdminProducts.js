import { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import {
  handleErrorMessage,
  handleSuccessMessage,
  MessageContext,
} from '../../store/messageStore';
import { deleteAdminProduct, fetchAdminProducts } from '../../apis';
import LoadingAnimation from '../../components/LoadingAnimation';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(MessageContext);
  const productModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  useEffect(() => {
    productModalRef.current = new Modal('#productModal', {
      backdrop: 'static',
    });
    deleteModalRef.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getProducts();
  }, []);

  //轉成前端資料命名
  const toFormData = (apiData) => {
    const {
      id,
      title,
      category,
      origin_price,
      price,
      unit,
      description,
      content,
      is_enabled,
      imageUrl,
    } = apiData;
    return {
      id: id,
      title: title,
      category: category,
      originPrice: Number(origin_price),
      price: Number(price),
      unit: unit,
      description: description,
      content: content,
      isEnabled: is_enabled,
      imageUrl: imageUrl,
    };
  };

  const getProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const productRes = await fetchAdminProducts(page);
      const productList = productRes.data.products.map(toFormData);
      setProducts(productList);
      setPagination(productRes.data.pagination);
      console.log('抓產品資料成功', productRes);
    } catch (err) {
      console.error('抓產品資料失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModalRef.current.show();
  };
  const closeProductModal = () => {
    productModalRef.current.hide();
  };
  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModalRef.current.show();
  };
  const closeDeleteModal = () => {
    deleteModalRef.current.hide();
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteAdminProduct(id);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
        getProducts();
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
        <ProductModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          type={type}
          tempProduct={tempProduct}
        />
        <DeleteModal
          close={closeDeleteModal}
          text={tempProduct.title}
          deleteProduct={deleteProduct}
          id={tempProduct.id}
        />
        <div className="table-header m-3">
          <h3>產品列表</h3>
          <hr />
          <div className="text-end table-addBtn">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                openProductModal('create', {});
              }}
            >
              建立新商品
            </button>
          </div>
        </div>
        <div className="table-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">分類</th>
                <th scope="col">名稱</th>
                <th scope="col">售價</th>
                <th scope="col">
                  <span className="mob-hide">啟用</span>
                  狀態
                </th>
                <th scope="col">編輯</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="5">
                    <LoadingAnimation />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.category}</td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.isEnabled ? '啟用' : '未啟用'}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            openProductModal('edit', product);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm ms-md-2 mt-1"
                          onClick={() => {
                            openDeleteModal(product);
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

        <Pagination pagination={pagination} changePage={getProducts} />
      </div>
    </>
  );
}
