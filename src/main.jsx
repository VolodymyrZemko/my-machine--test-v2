import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App.jsx";
import { MachinesCacheProvider } from "./modules/cache/MachinesCacheContext.jsx";

ReactDOM.createRoot(document.getElementById("machine-assistance-app")).render(
  <React.StrictMode>
    <MachinesCacheProvider>
      <App />
    </MachinesCacheProvider>
  </React.StrictMode>
);


