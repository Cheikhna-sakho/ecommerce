import AuthProvider from "../src/contexts/AuthContext";
import "./App.css";
import Routes from "./router/Routes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Footer from "../src/components/Footer";

const App = () => {
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "EUR",
    intent: "capture",
  };

  return (
    <AuthProvider>
      <PayPalScriptProvider options={initialOptions}>
        <Routes />
      </PayPalScriptProvider>
      <Footer />
    </AuthProvider>
  );
};

export default App;
