import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Prouducts';
import ProductDetail from './pages/front/ProuductDetail';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import Success from './pages/front/Success';
import About from './pages/front/About';
import Service from './pages/front/Service';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="service" element={<Service />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="success/:orderId" element={<Success />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
