import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home";
import { Aboutus } from "./pages/Aboutus";
import Customize from "./pages/Customize";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="aboutus" element={<Aboutus />} />
            <Route path="Customize" element={<Customize />} />
            <Route path="shop" element={<Shop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
