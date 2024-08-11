import Image from "next/image";
import { Reload } from "../button/btn-reload";

export const Error500 = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <Image
          src="/assets/gif/nointernet.gif"
          width={400}
          height={400}
          alt="No Internet"
        />
        <Reload />
      </div>
    </>
  );
};
