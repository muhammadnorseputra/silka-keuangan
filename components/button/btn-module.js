"use client";

import { useRouter } from "next-nprogress-bar";
import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { hasSession } from "@/lib/session";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { Spinner } from "@nextui-org/react";
const BtnModule = ({ goTo, isDisabled, sigapok }) => {
  const [stateLoading, setStateLoading] = useState(false);
  const router = useRouter();
  const session_has = hasSession("USER_GAPOK");

  const hendleModule = () => {
    setStateLoading(true);

    if (session_has === true) {
      toast.remove();
      router.push(goTo);
      return;
    }

    toast.promise(sigapok, {
      loading: "Proccesing",
      success: (data) => {
        // if(data.status === false) {
        //   setStateLoading(false);
        //   return `Gagal menghubungi server ${process.env.NEXT_PUBLIC_GAPOK_BASE_URL} (${data.message})`;
        // }
        // setStateLoading(false); //agar loading terus sebelum halaman dialihkan
        setCookie("USER_GAPOK", data, { maxAge: 3600 });
        // return `Authorize succes (${data?.datauser[0]?.nama_user})`;
        setTimeout(() => router.push(goTo), 1000);
        return `Authorize succes`;
      },
      error: (err) => {
        setStateLoading(false);
        return `Gagal menghubungi server ${process.env.NEXT_PUBLIC_GAPOK_BASE_URL} (${err})`;
      },
    });
  };

  return (
    <>
      <button
        onClick={hendleModule}
        className="inline-flex w-full justify-center disabled:opacity-30 disabled:cursor-not-allowed items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg dark:shadow-sm shadow-lg shadow-blue-500 disabled:shadow-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 group"
        disabled={stateLoading || isDisabled}>
        {stateLoading ? (
          <Spinner size="sm" color="default" />
        ) : (
          <div className="flex justify-center items-center gap-x-4">
            Pilih
            <ArrowRightCircleFill className="size-6 group-hover:text-white/30 group-hover:translate-x-9 ease-in duration-300 group-hover:transition-all" />
          </div>
        )}
      </button>
    </>
  );
};

export { BtnModule };
