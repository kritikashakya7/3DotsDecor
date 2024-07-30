import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { Aboutus } from "./pages/Aboutus";
import Customize from "./pages/Customize";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import useAuthContext from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import Category from "./pages/admin/Category";
import Customer from "./pages/admin/Customer";
import Order from "./pages/admin/Order";
import Products from "./pages/admin/Products";
import Dashboard from "./pages/admin/Dashboard";
import Modal from "react-modal";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";

Modal.setAppElement("#root");

function App() {
  const { user, isLoading } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user?.role !== "admin" ? <Layout /> : <Navigate to="/admin" />
            }
          >
            <Route index element={<Home />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="Customize" element={<Customize />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route
              path="checkout"
              element={user ? <Checkout /> : <Navigate to="/login" />}
            />
            <Route
              path="payment-success"
              element={user ? <PaymentSuccess /> : <Navigate to="/login" />}
            />
            <Route
              path="payment-fail"
              element={user ? <PaymentFail /> : <Navigate to="/login" />}
            />
            <Route
              path="cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="signup"
              element={!user && !isLoading ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="login"
              element={!user && !isLoading ? <Login /> : <Navigate to="/" />}
            />
          </Route>
          <Route
            path="/admin"
            element={
              !user && !isLoading ? (
                <Navigate to="/admin/login" />
              ) : user?.role !== "admin" ? (
                <Navigate to="/" />
              ) : (
                <AdminLayout />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="customer" element={<Customer />} />
            <Route path="order" element={<Order />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route
            path="/admin/login"
            element={
              !user && !isLoading ? <AdminLogin /> : <Navigate to="/admin" />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
