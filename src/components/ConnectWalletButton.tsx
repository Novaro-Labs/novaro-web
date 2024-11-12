import { cn } from "@/utils/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

export default function ConnectWalletButton({
  className = "",
}: {
  className?: string;
}) {
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate("/home");
      localStorage.setItem("x_auth_code", String(address));
      localStorage.setItem("x_auth_time", String(Date.now()));
    }
  }, [isConnected]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (() => {
          if (!connected) {
            return (
              <button
                onClick={() => {
                  openConnectModal();
                  // navigate to home
                }}
                className={cn(
                  "relative flex select-none items-center overflow-hidden whitespace-nowrap rounded-full group",
                  className
                )}
              >
                <div className="absolute inset-0 left-0 top-0 z-10 hidden rounded-lg bg-white/5 group-hover:block"></div>
                Connect Wallet
              </button>
            );
          }
          if (chain.unsupported) {
            return (
              <button onClick={openChainModal} type="button">
                Wrong network
              </button>
            );
          }

          return (
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={openChainModal}
                style={{ display: "flex", alignItems: "center" }}
                type="button"
              >
                {chain.hasIcon && (
                  <div
                    style={{
                      background: chain.iconBackground,
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      overflow: "hidden",
                      marginRight: 4,
                    }}
                  >
                    {chain.iconUrl && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        style={{ width: 12, height: 12 }}
                      />
                    )}
                  </div>
                )}
                {chain.name}
              </button>

              <button onClick={openAccountModal} type="button">
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ""}
              </button>
            </div>
          );
        })();
      }}
    </ConnectButton.Custom>
  );
}
