import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <CircularProgress
        color="primary"
        label="Loading..."
        className="text-white gap-3"
      />
    </>
  );
}
