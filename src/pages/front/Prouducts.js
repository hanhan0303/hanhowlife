import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import FadeInBox from '../../components/FadeInBox';
import AddOneBtn from '../../components/AddOneBtn';
import LoadingAnimation from '../../components/LoadingAnimation';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('全部');
  const [categories, setCategories] = useState(['全部']);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all?page=1`,
      );
      const productList = res.data.products;
      const rawCategories = productList
        .map((item) => item.category?.trim())
        .filter((cat) => cat);

      setCategories(['全部', ...Array.from(new Set(rawCategories))]);
    } catch (err) {
      console.log('分類取得失敗', err);
    }
  };

  const getProducts = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const categoryQuery =
        currentCategory === '全部' ? `` : `&category=${currentCategory}`;

      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${currentPage}${categoryQuery}`,
      );

      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      console.log('取得產品失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 僅初始化分類時跑一次
    if (currentCategory === '全部') {
      fetchCategories();
    }
    getProducts(1);
  }, [currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  return (
    <>
      <div className="container px-3 pb-5 min-height">
        <h1 className="fs-4 text-center py-3">HanHowLife 能量商品</h1>

        <ul className="category list-unstyled d-flex justify-content-center mt-4">
          {categories.map((cat) => {
            return (
              <li
                className={`btn btn-outline-primary p-0 ms-1 ${
                  cat === currentCategory ? 'active' : ''
                }`}
                key={cat}
              >
                <a
                  className="router-link px-3 px-md-4 py-1"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </a>
              </li>
            );
          })}
        </ul>

        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <>
              <ul className="products row g-0 g-md-3 p-0 mt-5 list-unstyled">
                {products.map((item) => {
                  return (
                    <FadeInBox
                      as="li"
                      className="products-item col-10 col-md-4 mx-auto mx-md-0 mb-5 fade-out"
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
                        <AddOneBtn
                          btnClass="btn btn-sm btn-outline-primary mx-auto fs-6"
                          item={item}
                        />
                      </div>
                    </FadeInBox>
                  );
                })}
              </ul>
            </>

            {pagination.total_pages > 1 && (
              <Pagination pagination={pagination} changePage={getProducts} />
            )}
          </>
        )}
      </div>
    </>
  );
}
