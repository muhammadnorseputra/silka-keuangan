"use client";
import { Icon } from "../icons/bootstrap-icon";
import { BtnModule } from "../button/btn-module";
import { cx } from "@/helpers/cx";

export const CardModule = ({
  title = "Title Here",
  icon = "BoxArrowRight",
  iconColor = "text-gray-600",
  path,
  isDisabled = false,
}) => {
  return (
    <div
      className={cx(
        "w-full p-6 bg-white border-3 border-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  duration-300",
        isDisabled
          ? "border-gray-50 cursor-not-allowed"
          : "hover:border-blue-600 dark:hover:border-blue-500 hover:-translate-y-2 hover:shadow-lg group-hover:[&:not(:hover)]:opacity-20"
      )}>
      <h5 className="mb-4 text-lg flex flex-col items-center tracking-tight text-gray-600 dark:text-white">
        <Icon
          iconName={icon}
          size="50"
          className={cx("mb-8 group-hover:scale-110", iconColor)}
        />
        {title}
      </h5>
      <BtnModule goTo={path} isDisabled={isDisabled} />
      {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p> */}
    </div>
  );
};
