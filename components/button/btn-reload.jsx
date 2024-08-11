"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

export const Reload = () => {
  return (
    <Button color="danger" onClick={() => window.location.reload()}>
      <ArrowPathIcon className="size-5" /> Reconnected
    </Button>
  );
};
