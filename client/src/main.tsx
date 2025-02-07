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

const clientId =
  "210465206697-d5ujk8vsvn8o141dr9preq77kc16t2fk.apps.googleusercontent.com";

  const stripePromise = loadStripe("pk_test_51QZnKcCc8hYAsEPiCRSQFJwAovZehwu7fCIe8X8QTs4UmppI6dqPVhx9P87eWYIFe3agjNQPTGqBAWkVsbTVG1R3002bOWA4Rb");
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
