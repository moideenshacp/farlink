import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { RegistrationProvider } from "./context/RegisterationContext.tsx";
import CompaniesProvider from "./context/CompaniesContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RegistrationProvider>
        <CompaniesProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <Elements stripe={stripePromise} >
            <App />
            </Elements>
          </GoogleOAuthProvider>
        </CompaniesProvider>
      </RegistrationProvider>
    </PersistGate>
  </Provider>
);
