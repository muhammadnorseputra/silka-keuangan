export const metadata = {
  title: "Login - SILKa Integrasi Badan Keuangan Daerah",
  description: "Login Aplikasi Layanan Integrasi SILKa - INexiS Kab. Balangan",
};

export default function Layout({ children }) {
  return (
    <section className="bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-cover lg:bg-center lg:bg-cover lg:bg-fixed">
      <div className="min-h-screen bg-white/10 dark:bg-black/30 mx-auto flex items-center flex-col md:flex-row justify-around py-4 md:py-0 px-4 md:px-8">
        {children}
      </div>
    </section>
  );
}
