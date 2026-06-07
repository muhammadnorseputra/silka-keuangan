export const metadata = {
  title: "Login - SILKa Integrasi Badan Keuangan Daerah",
  description: "Login Aplikasi Layanan Integrasi SILKa - INexiS Kab. Balangan",
};

export default function Layout({ children }) {
  return (
    <section className="bg-[url('/33960364-b6f6-4064-93ce-6817ee78806d.png')] bg-cover lg:bg-center lg:bg-cover lg:bg-fixed">
      <div className="flex flex-col items-center justify-around min-h-screen px-4 py-4 mx-auto 2xl:justify-center 2xl:gap-x-8 bg-white/10 dark:bg-black/30 md:flex-row md:py-0 md:px-8">
        {children}
      </div>
    </section>
  );
}
