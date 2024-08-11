"use client";

import { useRouter } from "next-nprogress-bar";
import { deleteCookie, hasCookie } from "cookies-next";
import { useState } from "react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { revalidatePath } from "next/cache";

export default function BtnLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    if (confirm("Apakah anda yakin akan keluar dari system ?")) {
      deleteCookie("USER_SILKA");
      let isCookie = hasCookie("USER_SILKA");
      if (isCookie == false) {
        window.location.replace("/auth");
        // router.replace("/auth");
        setIsLoading(false);
      }
    }
  };
  return (
    <Button
      color="warning"
      variant="shadow"
      startContent={<ArrowLeftEndOnRectangleIcon className="size-6" />}
      onClick={handleLogout}>
      Logout
    </Button>
  );
}
