"use client";

import PropTypes from "prop-types";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { hasSession } from "@/lib/session";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { Spinner } from "@nextui-org/react";
import { loginSigapok } from "@/dummy/sigapok-login";
import { useMutation } from "@tanstack/react-query";

const BtnModule = ({ goTo, isDisabled }) => {
  const [stateLoading, setStateLoading] = useState(false);
  const router = useRouter();
  const session_has = hasSession("USER_GAPOK");

  const { mutate, isPending } = useMutation({
    mutationKey: ["sigapok"],
    mutationFn: async () => {
      const response = await loginSigapok();
      return response;
    },
  });

  useEffect(() => {
    if (isPending || stateLoading) {
      toast.loading("Connecting to inexis ...", {
        id: "Toaster",
      });
    }
  }, [goTo, isPending, router, stateLoading]);

  function hendleModule() {
    setStateLoading(true);
    if (session_has === true) {
      toast.remove();
      router.push(goTo);
      return;
    }
    mutate(null, {
      onSuccess: (data) => {
        if (data.success === false || !data.success) {
          setStateLoading(false);
          return toast.error(data.message, {
            id: "Toaster",
          });
        }

        if (data.success === true) {
          toast.success(`Loginded: ${data.datauser.last_login}`, {
            id: "Toaster",
          });
          setTimeout(() => {
            toast.remove();
            router.push(goTo);
          }, 1000);
        }
      },
      onError: (err) => {
        setStateLoading(false);
        return toast.error(err.message, {
          id: "Toaster",
        });
      },
    });
  }

  return (
    <button
      onClick={hendleModule}
      className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg shadow-lg disabled:opacity-30 disabled:cursor-not-allowed dark:shadow-sm shadow-blue-500 disabled:shadow-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 group"
      disabled={isPending || stateLoading || isDisabled}>
      {isPending || stateLoading ? (
        <Spinner size="sm" color="default" />
      ) : (
        <div className="flex items-center justify-center gap-x-4">
          Pilih
          <ArrowRightCircleFill className="duration-300 ease-in size-6 group-hover:text-white/30 group-hover:transition-all" />
        </div>
      )}
    </button>
  );
};
BtnModule.propTypes = {
  goTo: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

export { BtnModule };
