"use client";

import { encrypt } from "@/helpers/encrypt";

import { Button } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";

const ButtonPeremajaan = ({ nip }) => {
  const router = useRouter();
  return (
    <Button
      color="warning"
      variant="bordered"
      onPress={() =>
        router.push(`/app-module/pegawai/peremajaan/${encrypt(nip, "bkpsdm")}`)
      }>
      Update Data
    </Button>
  );
};

const ButtonPeremajaanP3k = ({ nip }) => {
  const router = useRouter();
  return (
    <Button
      color="warning"
      variant="bordered"
      onPress={() =>
        router.push(`/app-module/pppk/peremajaan/${encrypt(nip, "bkpsdm")}`)
      }>
      Update Data
    </Button>
  );
};

export { ButtonPeremajaan, ButtonPeremajaanP3k };
