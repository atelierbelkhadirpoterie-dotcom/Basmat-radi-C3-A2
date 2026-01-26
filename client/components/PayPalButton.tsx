import { useEffect } from "react";

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (selector: string) => void;
      };
    };
  }
}

export default function PayPalButton() {
  const containerId = "paypal-container-SJXY25QW5YKA6";

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .HostedButtons({
          hostedButtonId: "SJXY25QW5YKA6",
        })
        .render(`#${containerId}`);
    }
  }, []);

  return <div id={containerId}></div>;
}
