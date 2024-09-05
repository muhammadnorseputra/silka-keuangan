"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Reload = () => {
  const router = useRouter();
  return (
    <Button color="danger" onClick={() => router.refresh()}>
      <ArrowPathIcon className="size-5" /> Reconnected
    </Button>
  );
};

export const BtnRefreshQuery = ({ queryKey, ...args }) => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  return (
    <Tooltip content="Refresh Data">
      <Button
        {...args}
        color="danger"
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey,
            refetchType: 'active',
          })
        }>
        <ArrowPathIcon className={`size-5 ${isFetching ? 'animate-spin' : ''}`} />
      </Button>
    </Tooltip>
  );
};
