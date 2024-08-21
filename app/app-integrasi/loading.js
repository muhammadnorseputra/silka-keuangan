import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <Spinner
        color="primary"
        label="Mohon tunggu meload halaman ..."
        labelColor="primary"
      />
    </>
  );
}
