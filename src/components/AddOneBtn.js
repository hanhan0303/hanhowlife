import axios from 'axios';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AddOneBtn({ btnClass, item }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const { cartData, getCart } = useOutletContext();
  const handleAddToCart = async (item, cartData) => {
    setLoadingItemId(item?.id);
    setIsLoading(true);
    const existingItem = cartData.carts.find(
      (cart) => cart.product_id === item?.id,
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className={`product-addBtn ${btnClass}`}
        type="button"
        onClick={(e) => {
          handleAddToCart(item, cartData);
        }}
        disabled={loadingItemId === item?.id}
      >
        <span className={`dark-text ${isLoading ? 'd-none fade' : 'show'}`}>
          加入購物車
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
  );
}
