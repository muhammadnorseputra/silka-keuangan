"use client";

import { useRouter } from "next-nprogress-bar";
import { Icon } from "@/components/icons/bootstrap-icon";
import { useCallback } from "react";
import { Button, Tooltip } from "@nextui-org/react";

export const BtnBack = ({ path, ...args }) => {
  const router = useRouter();
  return (
    <Button {...args} onClick={() => router.push(path)}>
      Kembali Login <Icon iconName="LockFill" size={20} color="white" />
    </Button>
  );
};

export const BtnBackNextUi = ({
  goTo,
  title = "Kembali ke halaman module",
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    // window.location.replace(goTo);
    // router.replace(goTo);
    router.back();
  }, [goTo, router]);

  return (
    <Tooltip content={title} placement="bottom" color="foreground">
      <Button
        isIconOnly
        color="primary"
        aria-label="back"
        radius="full"
        onClick={handleBack}>
        <Icon iconName="ArrowLeftCircleFill" size="20" color="white" />
      </Button>
    </Tooltip>
  );
};
