import "@/styles/globals.css";
import ModalProvider from "@/lib/context/modal-context";
import { Providers } from "@/lib/nextuiproviders";
import { Toaster } from "react-hot-toast";
import ProgressProviders from "@/lib/ProgressBarProvider";
import { FetchQueryProvider } from "@/lib/FetchQueryProvider";
import SpinnerProvider from "@/lib/context/spinner-context";
import ModalDaftarLayananProvider from "@/lib/context/modal-daftar-layanan-context";

export const metadata = {
  title: "Welcome SILKa Keuangan Daerah",
  description:
    "Layanan Integrasi KGB dan TPP dengan Badan Keuangan Daerah Kab. Balangan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body>
        <Providers
          // disableAnimation
          // skipFramerMotionAnimations
          validationBehavior="native">
          <ProgressProviders>
            <SpinnerProvider>
              <ModalDaftarLayananProvider>
                <ModalProvider>
                  <FetchQueryProvider>{children}</FetchQueryProvider>
                </ModalProvider>
              </ModalDaftarLayananProvider>
            </SpinnerProvider>
          </ProgressProviders>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
