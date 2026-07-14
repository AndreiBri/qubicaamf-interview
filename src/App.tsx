import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
