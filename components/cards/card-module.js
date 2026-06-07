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
  color = 'bg-blue-700',
  bgIconColor,
  description = '',
}) => {
  return (
    <div
      className={cx(
        "w-full px-6 py-4 bg-white border-3 border-white rounded-lg shadow-lg dark:bg-gradient-to-b dark:from-slate-700 dark:to-slate-900 dark:border-slate-800  duration-300",
        isDisabled
          ? "border-gray-50 cursor-not-allowed"
          : "hover:-translate-y-2 hover:shadow-xl group-hover:[&:not(:hover)]:opacity-90 hover:scale-102 transition-all"
      )}>
      <h5 className="flex flex-col items-center mb-4 text-lg tracking-tight text-gray-600 dark:text-white">
        <div className={cx(
          'p-4 rounded-2xl',
          `${bgIconColor}`,
        )}>
        <Icon
          iconName={icon}
          size="40"
          className={cx(iconColor)}
        />
        </div>
        <span className="mt-6 font-bold">{title}</span>
        <span className="p-2 text-sm text-center text-gray-500 dark:text-gray-400 text-ellipsis">
          {description}
        </span>
      </h5>
      <BtnModule goTo={path} isDisabled={isDisabled} color={color} />
      {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p> */}
    </div>
  );
};
