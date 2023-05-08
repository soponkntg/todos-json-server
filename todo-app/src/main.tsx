import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./GlobalStyle.tsx";
import { DataContextProvider } from "./context/DataContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
      <GlobalStyle />
    </DataContextProvider>
  </React.StrictMode>
);
