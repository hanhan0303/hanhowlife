import { apiClient, apiLogin } from './libs/apiClient';

/**
 * 取得購物車內容
 */
export const fetchCart = async () => apiClient.get(`/cart`);

/**
 * 依據購物車ID刪除購物車品項
 * cartId 購物車ID
 */
export const deleteCartItem = async (cartId) =>
  apiClient.delete(`/cart/${cartId}`);

/**
 * 刪除購物車所有品項
 */
export const deleteCartAll = async () => apiClient.delete(`/carts`);

/**
 * 取得全部商品
 */
export const fetchAllProducts = async () => apiClient.get(`/products/all`);

/**
 * 根據分類取得商品
 * category 分類
 * page 頁數
 */
export const fetchProducts = async (category, page) =>
  apiClient.get(`/products`, {
    params: {
      category,
      page,
    },
  });

/**
 * 新增購物車項目
 * productId 商品ID
 * qty 數量
 */
export const addCartItem = async (productId, qty = 1) =>
  apiClient.post(`/cart`, {
    data: {
      product_id: productId,
      qty,
    },
  });

/**
 * 更新購物車項目
 * cartId 購物車項目 ID
 * productId 商品ID
 * qty 數量
 */
export const updateCartAPI = async (cartId, productId, qty) =>
  apiClient.put(`/cart/${cartId}`, {
    data: {
      product_id: productId,
      qty,
    },
  });

/**
 * 後台-訂單管理
 * 更新訂單資訊
 * orderId 訂單ID
 * orderCont 訂單內容
 */
export const updateOrder = async (orderId, orderCont) =>
  apiClient.put(`/admin/order/${orderId}`, { data: { ...orderCont } });

/**
 * 後台-訂單管理
 * 取得訂單
 * page 頁數
 */
export const fetchAdminOrders = async (page) =>
  apiClient.get(`/admin/orders`, {
    params: {
      page,
    },
  });

/**
 * 後台-訂單管理
 * 刪除訂單
 * orderId 訂單ID
 */
export const deleteAdminOrder = async (orderId) =>
  apiClient.delete(`/admin/order/${orderId}`);

/**
 * 後台登入
 * loginData 登入資料
 */
export const loginAdmin = async (loginData) =>
  apiLogin.post(`/admin/signin`, loginData);

/**
 * 驗證登入
 */
export const checkAdmin = async () => apiLogin.post(`/api/user/check`);

/**
 * 後台登出
 */
export const logoutAdmin = async () => apiLogin.post(`/logout`);

/**
 * 後台-商品管理
 * 新增商品資料
 * productData 商品資料
 */
export const addAdminProduct = async (productData) =>
  apiClient.post(`/admin/product`, { data: productData });

/**
 * 後台-商品管理
 * 更新商品資料
 * productId 商品資料ID
 * productData 商品資料
 */
export const updateAdminProduct = async (productId, productData) =>
  apiClient.put(`/admin/product/${productId}`, { data: productData });

/**
 * 後台-商品管理
 * 上傳圖片
 * imageData 圖片資料
 */
export const uploadImage = async (imageData) =>
  apiClient.post(`/admin/upload`, imageData);

/**
 * 後台-優惠卷管理
 * 根據頁數取得優惠劵
 * page 頁數
 */
export const fetchAdminCoupons = async (page) =>
  apiClient.get(`/admin/coupons`, {
    params: {
      page,
    },
  });

/**
 * 後台-優惠卷管理
 * 新增優惠劵
 * couponId 優惠劵ID
 * couponData 優惠卷資料
 * dueDate優惠卷到期日
 */
export const addAdminCoupon = async (couponData, dueDate) =>
  apiClient.post(`/admin/coupon`, {
    data: { ...couponData, due_date: dueDate.getTime() },
  });

/**
 * 後台-優惠卷管理
 * 根據ID更新優惠劵
 * couponId 優惠劵ID
 * couponData 優惠卷資料
 * dueDate優惠卷到期日
 */
export const updateAdminCoupon = async (couponId, couponData, dueDate) =>
  apiClient.put(`/admin/coupon/${couponId}`, {
    data: { ...couponData, due_date: dueDate.getTime() },
  });

/**
 * 後台-優惠卷管理
 * 根據ID刪除優惠劵
 * couponId 優惠劵ID
 */
export const deleteAdminCoupon = async (couponId) =>
  apiClient.delete(`/admin/coupon/${couponId}`);

/**
 * 後台-商品管理
 * 根據頁數取得商品
 * page 頁數
 */
export const fetchAdminProducts = async (page) =>
  apiClient.get(`/admin/products`, {
    params: {
      page,
    },
  });

/**
 * 後台-商品管理
 * 根據ID刪除商品
 * productId 商品ID
 */
export const deleteAdminProduct = async (productId) =>
  apiClient.delete(`/admin/product/${productId}`);

/**
 * 送出訂單/建立新訂單
 * userName 訂單姓名
 * userEmail 訂單Email
 * userTel 訂單電話
 * userAddress 訂單地址
 * message 備註
 */
export const submitOrder = async (
  userName,
  userEmail,
  userTel,
  userAddress,
  message,
) =>
  apiClient.post(`/order`, {
    data: {
      user: {
        name: userName,
        email: userEmail,
        tel: userTel,
        address: userAddress,
      },
      message: message.trim(),
    },
  });

/**
 * 套用優惠卷/驗證優惠卷
 * coupon優惠碼
 */
export const checkCoupon = async (coupon) =>
  apiClient.post(`/coupon`, {
    data: {
      code: coupon,
    },
  });

/**
 * 透過ID取得訂單資訊
 * orderId 訂單ID
 */
export const fetchOrder = async (orderId) => apiClient.get(`/order/${orderId}`);

/**
 * 透過ID付款該筆訂單
 * orderId 訂單ID
 * isPaid 是否已付款
 */
export const payOrder = async (orderId, isPaid) =>
  apiClient.post(`/pay/${orderId}`, {
    success: isPaid,
  });

/**
 * 依據ID取得商品資料
 * productId 商品資料ID
 */
export const fetchProduct = async (productId) =>
  apiClient.get(`/product/${productId}`);
