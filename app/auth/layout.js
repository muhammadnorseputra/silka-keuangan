import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Login - SILKa Integrasi Badan Keuangan Daerah",
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-blue-600 dark:bg-inherit mx-auto flex items-center flex-col md:flex-row justify-around py-6 md:py-0 px-6 md:px-8">
      {children}
    </div>
  );
}
