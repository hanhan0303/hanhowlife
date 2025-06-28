import axios from 'axios';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Pagination from './Pagination';
import Loading from './Loading';

export default function CategoryProductSection() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [categories, setCategories] = useState(['全部']);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { cartData, getCart } = useOutletContext();
  const [loadingItemId, setLoadingItemId] = useState(null);

  const handleAddToCart = async (item, cartData) => {
    setLoadingItemId(item.id);

    const existingItem = cartData.carts.find(
      (cart) => cart.product_id === item.id,
    );

    const apiPath = `/v2/api/${process.env.REACT_APP_API_PATH}/cart${
      existingItem ? `/${existingItem.id}` : ''
    }`;
    const method = existingItem ? axios.put : axios.post;
    const qty = existingItem ? existingItem.qty + 1 : 1;

    try {
      await method(apiPath, {
        data: {
          product_id: item.id,
          qty,
        },
      });

      console.log(existingItem ? '已更新商品數量+1' : '已加入新商品');
      getCart();
    } catch (err) {
      console.error(existingItem ? '更新+1失敗' : '新增失敗', err);
    } finally {
      setLoadingItemId(null);
    }
  };

  const getProducts = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      const categoryQuery =
        currentCategory === '全部' ? `` : `&category=${currentCategory}`;

      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${currentPage}${categoryQuery}`,
      );

      const productList = res.data.products;
      setProducts(productList);
      setPagination(res.data.pagination);

      if (currentCategory === '全部') {
        const categorySet = productList
          .map((item) => item.category?.trim()) //如果category存在就去除前後空白，不存在回傳undefined
          .filter((cat) => cat); //過濾掉falsy值
        setCategories(['全部', ...Array.from(new Set(categorySet))]);
      }
    } catch (err) {
      console.log('取得產品失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   getProducts(1);
  // }, []);

  useEffect(() => {
    getProducts();
  }, [currentCategory, currentPage]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentPage(1); //類別變換時重設為第一頁
  };

  return (
    <>
      <div className="container px-3 pb-5 min-height">
        <h1 className="fs-4 text-center py-3">PANYA 手感烘焙</h1>
        <ul className="category list-unstyled d-flex justify-content-center mt-4">
          {categories.map((cat) => {
            return (
              <li className="btn btn-outline-primary p-0 ms-1" key={cat}>
                <a
                  className={`router-link-active active px-3 px-md-4 py-1 ${
                    cat === currentCategory ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </a>
              </li>
            );
          })}
        </ul>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <ul className="products row g-0 g-md-3 p-0 mt-5 list-unstyled">
              {products.map((item) => {
                return (
                  <li
                    className="products-item col-10 col-md-4 mx-auto mx-md-0 mb-5 fade-out fade-in"
                    key={item.id}
                  >
                    <Link
                      className="product-img px-3"
                      role="button"
                      to={`/product/${item.id}`}
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    >
                      {item.price < item.origin_price ? (
                        <span className="sale">On Sale</span>
                      ) : (
                        ''
                      )}
                      <small className="link-btn">查看內容</small>
                    </Link>
                    <div className="product-body p-3">
                      <p className="product-title m-0">{item.title}</p>
                      <p className="product-price mt-1">
                        {item.price < item.origin_price ? (
                          <span>${item.price}</span>
                        ) : (
                          ''
                        )}
                        <small
                          className={
                            item.price < item.origin_price ? 'del' : ''
                          }
                        >
                          ${item.origin_price} NTD
                        </small>
                      </p>
                      <button
                        type="button"
                        className="product-addBtn btn btn-sm btn-outline-primary mx-auto fs-6"
                        onClick={(e) => {
                          handleAddToCart(item, cartData);
                        }}
                        disabled={loadingItemId === item.id}
                      >
                        {loadingItemId === item.id ? (
                          <ReactLoading
                            type="bubbles"
                            color="#414666"
                            width={55}
                            height={55}
                          />
                        ) : (
                          '加入購物車'
                        )}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {pagination.total_pages > 1 && (
          <Pagination pagination={pagination} changePage={getProducts} />
        )}
      </div>
    </>
  );
}
