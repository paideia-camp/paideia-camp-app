import { CampModal } from "@campnetwork/origin/react";

export const CampModalWrapper = () => {
  return (
    <CampModal
      injectButton={false}
      // Optional: Add WalletConnect support
      // wcProjectId={import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}
    />
  );
};
