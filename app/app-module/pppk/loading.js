import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <div className="mx-auto w-full flex justify-center items-center min-h-screen">
        <Spinner color="primary" label="Mohon tunggu meload halaman..." />
      </div>
    </>
  );
}
