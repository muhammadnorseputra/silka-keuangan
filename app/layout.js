import "@/styles/globals.css";
import ModalProvider from "@/lib/context/modal-context";
import { Providers } from "@/lib/nextuiproviders";
import { Toaster } from "react-hot-toast";
import ProgressProviders from "@/lib/ProgressBarProvider";
import { FetchQueryProvider } from "@/lib/FetchQueryProvider";

export const metadata = {
  title: "Welcome SILKa Keuangan Daerah",
  description:
    "Layanan Integrasi KGB dan TPP dengan Badan Keuangan Daerah Kab. Balangan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers
          disableAnimation
          skipFramerMotionAnimations
          validationBehavior="native">
          <ProgressProviders>
            <ModalProvider>
              <FetchQueryProvider>{children}</FetchQueryProvider>
            </ModalProvider>
          </ProgressProviders>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
