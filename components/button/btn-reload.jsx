"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const Reload = () => {
  const router = useRouter();
  return (
    <Button color="danger" onClick={() => router.refresh()}>
      <ArrowPathIcon className="size-5" /> Reconnected
    </Button>
  );
};
