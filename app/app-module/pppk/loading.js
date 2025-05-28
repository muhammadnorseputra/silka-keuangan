import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <section className="w-full bg-[url(/background-wa.jpg)] dark:bg-slate-800 h-screen">
        <div className="max-w-6xl mx-auto">
          <Card
            radius="none"
            shadow="lg"
            className="h-screen max-h-screen overflow-y-auto">
            <div className="flex gap-5 p-3">
              <div>
                <Skeleton className="flex w-12 h-12 rounded-full" />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="w-1/3 h-5 rounded-lg" />
                <Skeleton className="w-1/6 h-5 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-5 p-3">
              <Skeleton className="w-full h-10 rounded-lg" />
              <Skeleton className="h-[600px] w-full rounded-lg" />
              <div className="flex flex-row justify-between w-full gap-2">
                <Skeleton className="w-1/3 h-8 rounded-lg" />
                <Skeleton className="w-1/6 h-8 rounded-lg" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
