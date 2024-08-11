import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="mx-auto flex justify-center align-center w-full min-h-screen bg-gray-50 dark:bg-gray-800">
      {children}
    </div>
  );
}
