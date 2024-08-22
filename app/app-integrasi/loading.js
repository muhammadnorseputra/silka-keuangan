import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Spinner
        color="primary"
        label="Mohon tunggu meload halaman ..."
        labelColor="primary"
      />
    </div>
  );
}
