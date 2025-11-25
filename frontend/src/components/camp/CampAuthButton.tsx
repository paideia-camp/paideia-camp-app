import { useAuthState, useConnect, useModal } from "@campnetwork/origin/react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface CampAuthButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const CampAuthButton = ({
  variant = "default",
  size = "default",
  className = "",
}: CampAuthButtonProps) => {
  const { authenticated, loading } = useAuthState();
  const { connect, disconnect } = useConnect();
  const { openModal } = useModal();

  if (loading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Wallet className="mr-2 h-4 w-4 animate-pulse" />
        Connecting...
      </Button>
    );
  }

  if (authenticated) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={openModal}
      >
        <Wallet className="mr-2 h-4 w-4" />
        My Origin
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={connect}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
};
