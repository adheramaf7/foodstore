import React from 'react';
import 'upkit/dist/style.min.css';
import { Routes, Route } from 'react-router-dom';

//state management
import { Provider } from 'react-redux';
import store from './app/store';
import { listen } from './app/listener';

//pages
import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { getCart } from './api/cart';
import UserAddressAdd from './pages/UserAddressAdd';
import UserAddress from './pages/UserAddress';
import Checkout from './pages/Checkout';
import Invoice from './pages/Invoice';
import UserAccount from './pages/UserAccount';
import UserOrders from './pages/UserOrders';
import Logout from './pages/Logout';
import GuardRoute from './components/GuardRoute';
import GuestRouteOnly from './components/GuestRouteOnly';

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRouteOnly>
              <Login />
            </GuestRouteOnly>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRouteOnly>
              <Register />
            </GuestRouteOnly>
          }
        />
        <Route
          path="/register/success"
          element={
            <GuestRouteOnly>
              <RegisterSuccess />
            </GuestRouteOnly>
          }
        />

        {/* Guarded Routes */}
        <Route
          path="/my-account"
          element={
            <GuardRoute>
              <UserAccount />
            </GuardRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <GuardRoute>
              <UserOrders />
            </GuardRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <GuardRoute>
              <Logout />
            </GuardRoute>
          }
        />
        <Route
          path="/delivery-address"
          element={
            <GuardRoute>
              <UserAddress />
            </GuardRoute>
          }
        />
        <Route
          path="/delivery-address/create"
          element={
            <GuardRoute>
              <UserAddressAdd />
            </GuardRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <GuardRoute>
              <Checkout />
            </GuardRoute>
          }
        />
        <Route
          path="/invoice/:order_id"
          element={
            <GuardRoute>
              <Invoice />
            </GuardRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
