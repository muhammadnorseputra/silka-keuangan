import { Skeleton } from "@nextui-org/react";

const PlaceholderBar = () => {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-6 w-5/5 rounded-lg bg-default-500"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-6 w-5/5 rounded-lg bg-default-500"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-6 w-5/5 rounded-lg bg-default-500"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-8 w-5/5 rounded-lg bg-default-500"></div>
        </Skeleton>
      </div>
    </>
  );
};

export { PlaceholderBar };
