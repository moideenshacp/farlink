import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { RegistrationProvider } from "./context/RegisterationContext.tsx";
import CompaniesProvider from "./context/CompaniesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RegistrationProvider>
        <CompaniesProvider>

      <App />
        </CompaniesProvider>
      </RegistrationProvider>
    </PersistGate>
  </Provider>
);
