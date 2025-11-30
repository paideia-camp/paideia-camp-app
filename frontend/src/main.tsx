import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CampProvider } from "@campnetwork/origin/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "./config/wagmi.config";
import App from "./App.tsx";
import "./index.css";

const campClientId = import.meta.env.VITE_CAMP_CLIENT_ID || "";
const campEnvironment = import.meta.env.VITE_CAMP_ENVIRONMENT || "DEVELOPMENT";
const campRedirectUri =
  import.meta.env.VITE_CAMP_REDIRECT_URI || window.location.origin;

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <CampProvider
            clientId={campClientId}
            environment={campEnvironment as "DEVELOPMENT" | "PRODUCTION"}
            redirectUri={campRedirectUri}
          >
            <App />
          </CampProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </StrictMode>
);
