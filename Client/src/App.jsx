import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Payment from "./pages/payment/Payment";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import GenerateBarcode from "./components/generate-barcode/GenerateBarcode";
import ScanBarcode from "./components/scan-barcode/ScanBarcode";
// import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import PaymentSuccess from "./pages/payment/PaymentSucess";
import RegisterProduct from "./pages/register-product/RegisterProduct";
import SupplierRegistration from "./pages/supplier-registration/SupplierRegistration";
import RequestProducts from "./pages/request-product/RequestProduct";
import ProductInformation from "./pages/product-information/ProductInformation";
import Location from "./pages/location/Location";
// import MissingPeople from "./pages/missing-people/register-missing/MissingPeople";
import RegisterMissingPeople from "./pages/missing-people/register-missing/MissingPeople";
import DisplayMissingPeople from "./pages/missing-people/display-missing/DisplayMissing";
import { useAuthContext } from "./hooks/useAuthContext";
import Chatbot from "./pages/chatbot/ChatBot";
import UserOrders from "./pages/user-orders/UserOrders";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generate-barcode" element={<GenerateBarcode />} />
        <Route path="/scan-barcode" element={<ScanBarcode />} />
        <Route
          path="/supplier-registration"
          element={<SupplierRegistration />}
        />
        <Route path="/register-product" element={<RegisterProduct />} />
        <Route path="/location-product" element={<UserOrders /> } />
        <Route path="/product-information" element={<ProductInformation />} />
        <Route path="/request-product" element={<RequestProducts />} />
        <Route path="/relief-location" element={<Location />} />
        <Route
          path="/register-missing-people"
          element={<RegisterMissingPeople />}
        />
        <Route
          path="/display-missing-people"
          element={<DisplayMissingPeople />}
        />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
