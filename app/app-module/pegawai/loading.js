import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <section className="w-full bg-blue-600 dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card shadow="lg" className="max-h-screen overflow-y-auto h-screen">
            <div className="flex gap-5 p-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-5 w-1/3 rounded-lg" />
                <Skeleton className="h-5 w-1/6 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-3">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-[600px] w-full rounded-lg" />
              <div className="w-full flex justify-between flex-row gap-2">
                <Skeleton className="h-8 w-1/3 rounded-lg" />
                <Skeleton className="h-8 w-1/6 rounded-lg" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
