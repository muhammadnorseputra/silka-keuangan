import "@/styles/globals.css";
import ModalProvider from "@/lib/context/modal-context";
import { Providers } from "@/lib/nextuiproviders";
import { Toaster } from "react-hot-toast";
import ProgressProviders from "@/lib/ProgressBarProvider";
import { FetchQueryProvider } from "@/lib/FetchQueryProvider";
import SpinnerProvider from "@/lib/context/spinner-context";
import ModalDaftarLayananProvider from "@/lib/context/modal-daftar-layanan-context";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "Welcome SILKa - INEXIS",
  description:
    "Layanan Integrasi KGB, KP dan TPP dengan Sistem INEXIS Badan Keuangan Daerah Kab. Balangan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <meta name="apple-mobile-web-app-title" content="Silka" />
      <GoogleTagManager gtmId="G-RPCQCQT1DE" />
      <body>
        <Providers>
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
      <GoogleAnalytics gaId="G-RPCQCQT1DE" />
    </html>
  );
}
