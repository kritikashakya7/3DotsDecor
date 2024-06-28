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

function App() {
  const { user, isLoading } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="Customize" element={<Customize />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
