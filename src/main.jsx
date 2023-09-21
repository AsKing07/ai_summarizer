import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./services/store";

// Crée un point d'entrée pour l'application React dans la div avec l'ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  // Mode strict pour détecter les problèmes potentiels
  <React.StrictMode>
    {/* Le composant Provider permet de fournir le store Redux à l'application */}
    <Provider store={store}>
      {/* Le composant App est l'application principale */}
      <App />
    </Provider>
  </React.StrictMode>
);
