"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@nextui-org/react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Reload = ({ title = "Reconnected" }) => {
  const router = useRouter();
  return (
    <Button color="secondary" onPress={() => router.refresh()}>
      <ArrowPathIcon className="size-5" /> {title}
    </Button>
  );
};

/**
 * @param {import("@tanstack/react-query").QueryClient} queryClient
 * @param {any} queryKey
 */
function refreshQuery(queryClient, queryKey) {
  return queryClient.invalidateQueries({
    queryKey,
    type: "active",
  });
}

// @ts-ignore
export const BtnRefreshQuery = ({ queryKey, ...args }) => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  const loading = isFetching ? true : false;
  return (
    <Tooltip content="Refresh Data">
      <Button
        {...args}
        color="secondary"
        isDisabled={loading}
        onPress={() => {
          toast.promise(refreshQuery(queryClient, queryKey), {
            loading: "Memuat Data",
            success: "Data Diperbaharui",
            error: "Gagal memmuat data",
          });
        }}
      >
        <ArrowPathIcon
          className={`size-5 ${isFetching ? "animate-spin" : ""}`}
        />
        Refresh Data
      </Button>
    </Tooltip>
  );
};
