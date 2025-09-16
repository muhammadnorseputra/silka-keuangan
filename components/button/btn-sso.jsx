"use client";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";
import { state } from "@/app/auth/state";
export default function SSOButton({ query, uuid }) {
  const host = process.env.NEXT_PUBLIC_HOST_SSO || "http://localhost:3000";
  const router = useRouter();

  return (
    <Button
      onPress={() => {
        state({ uuid });
        router.push(`${host}/oauth/sso/authorize?${query}`);
      }}
      fullWidth
      color="primary"
      size="lg"
      radius="lg">
      Continue with SSO <FingerPrintIcon className="text-white size-6" />
    </Button>
  );
}
