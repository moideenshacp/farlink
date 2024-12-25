import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { RegistrationProvider } from "./context/RegisterationContext.tsx";
import CompaniesProvider from "./context/CompaniesContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "210465206697-d5ujk8vsvn8o141dr9preq77kc16t2fk.apps.googleusercontent.com";


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RegistrationProvider>
        <CompaniesProvider>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
          </GoogleOAuthProvider>
        </CompaniesProvider>
      </RegistrationProvider>
    </PersistGate>
  </Provider>
);
