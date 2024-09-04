"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Reload = () => {
  const router = useRouter();
  return (
    <Button color="danger" onClick={() => router.refresh()}>
      <ArrowPathIcon className="size-5" /> Reconnected
    </Button>
  );
};

export const BtnRefreshQuery = ({ queryKey }) => {
  const queryClient = useQueryClient();
  return (
    <Tooltip content="Refresh Data">
      <Button
        color="danger"
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey,
          })
        }>
        <ArrowPathIcon className="size-5" />
      </Button>
    </Tooltip>
  );
};
