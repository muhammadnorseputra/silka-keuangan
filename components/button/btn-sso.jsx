"use client";
import React from "react";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import { state } from "@/app/auth/state";
import toast from "react-hot-toast";
export default function SSOButton({ query, uuid }) {

  const host = process.env.NEXT_PUBLIC_HOST_SSO || "http://localhost:3000";
  const popupRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const loginSSO = () => {
    try {
      setLoading(true);
      
      const width = 500;
      const height = 700;

      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `${host}/oauth/sso/authorize?${query}`,
        "SSOLogin",
        `
          width=${width},
          height=${height},
          left=${left},
          top=${top},
          popup=yes,
          resizable=no,
          scrollbars=yes
        `
      );
    
      if (!popup) {
        toast.error("Popup blocked");
        setLoading(false);
        return;
      }

      popup.focus();

      // @ts-ignore
      popupRef.current = popup;
      // cek jika popup ditutup manual
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);

          // jika login belum sukses
          setLoading(false);
          console.error("Login dibatalkan atau browser diclose");
        }
      }, 500);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    
  };

  React.useEffect(() => {
    const handleMessage = (/** @type {{ data: { type: string; }; }} */ event) => {
      if (event.data.type === "SSO_SUCCESS") {
        // @ts-ignore
        popupRef.current?.close();
        router.refresh();
      }

      if (event.data.type === "SSO_FAILED") {
        toast.error("Login gagal!");

        // @ts-ignore
        popupRef.current?.close();
        setLoading(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return (
    <Button
      onPress={() => {
        state({ uuid });
        loginSSO();
      }}
      fullWidth
      color="primary"
      isDisabled={loading}
      isLoading={loading}
      size="lg"
      radius="lg">
      Continue with SSO <FingerPrintIcon className="text-white size-6" />
    </Button>
  );
}
