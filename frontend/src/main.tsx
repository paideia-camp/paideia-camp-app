import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CampProvider } from "@campnetwork/origin/react";
import App from "./App.tsx";
import "./index.css";

const campClientId = import.meta.env.VITE_CAMP_CLIENT_ID || "";
const campEnvironment = import.meta.env.VITE_CAMP_ENVIRONMENT || "DEVELOPMENT";
const campRedirectUri =
  import.meta.env.VITE_CAMP_REDIRECT_URI || window.location.origin;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CampProvider
      clientId={campClientId}
      environment={campEnvironment as "DEVELOPMENT" | "PRODUCTION"}
      redirectUri={campRedirectUri}
    >
      <App />
    </CampProvider>
  </StrictMode>
);
