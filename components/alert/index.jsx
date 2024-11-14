import { InformationCircleIcon } from "@heroicons/react/24/solid";

export const AlertDanger = ({ title, message = "", children = null }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4 w-full">
      <div className="flex items-center gap-2 text-red-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>

        <strong className="block font-medium"> {title} </strong>
      </div>

      <p className="mt-2 text-sm text-red-700">{message ?? children}</p>
    </div>
  );
};

export const AlertWarning = ({ title, message = null, children = null }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-amber-500 bg-amber-50 p-4 w-full">
      <div className="flex items-center gap-2 text-amber-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>

        <strong className="block font-medium"> {title} </strong>
      </div>

      <p className="mt-2 text-sm text-amber-700">{message ?? children}</p>
    </div>
  );
};

export const AlertInfo = ({ title, message = "", children }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-blue-500 bg-blue-100 p-4 w-full">
      <div className="flex items-center gap-2 text-blue-800">
        <InformationCircleIcon className="size-6" fill="currentColor" />
        <strong className="block font-medium"> {title} </strong>
      </div>
      <div className="mt-2 text-sm text-blue-700">{children ?? message}</div>
    </div>
  );
};

export const AlertSuccess = ({ title, message = "", children }) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-green-500 bg-green-100 p-4 w-full">
      <div className="flex items-center gap-2 text-green-800">
        <InformationCircleIcon className="size-6" fill="currentColor" />
        <strong className="block font-medium"> {title} </strong>
      </div>
      <div className="mt-2 text-sm text-green-700">{children ?? message}</div>
    </div>
  );
};
