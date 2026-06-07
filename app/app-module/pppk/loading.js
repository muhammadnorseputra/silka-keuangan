import NextImage from "next/image";
import { Image } from "@nextui-org/react";
export default function SplashScreen() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-blue-400 dark:bg-slate-900">
      <div className="text-center">
        <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
          <div className="absolute w-64 h-64 border rounded-full border-white/20 animate-pulse" />
          <div className="absolute border rounded-full h-52 w-52 border-white/15 animate-pulse" />

          {/* Floating Particles */}
          <span className="particle absolute left-[12%] top-[15%]" />
          <span
            className="particle absolute right-[18%] top-[20%]"
            style={{ animationDelay: "1s" }}
          />
          <span
            className="particle absolute left-[22%] top-[45%]"
            style={{ animationDelay: "2s" }}
          />
          <span
            className="particle absolute right-[10%] top-[52%]"
            style={{ animationDelay: "3s" }}
          />
          <span
            className="particle absolute bottom-[18%] left-[15%]"
            style={{ animationDelay: "1.5s" }}
          />
          <span
            className="particle absolute bottom-[8%] right-[32%]"
            style={{ animationDelay: "2.5s" }}
          />

          <div className="relative rounded-full shadow-2xl backdrop-blur-lg bg-white/20 h-44 w-44">
            <Image
              as={NextImage}
              src="/logo-balangan.svg"
              width={140}
              height={140}
              alt="Logo Balangan"
              className="absolute top-5 left-5"
            />
          </div>
        </div>

        <h1 className="mt-8 text-lg font-extrabold text-white">
          SILKA <span className="text-white/60">INEXIS</span>
        </h1>

        <p className="mt-4 text-lg text-white/60">BKPSDM KAB. BALANGAN</p>

        {/* Loading */}
        <div className="h-2 mx-auto mt-4 overflow-hidden rounded-full w-38 bg-white/20">
          <div className="w-24 h-full bg-white rounded-full loading-indeterminate" />
        </div>
      </div>
    </div>
  );
}
