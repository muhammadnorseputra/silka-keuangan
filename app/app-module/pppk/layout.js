export default function Layout({ children }) {
  return (
    <>
      <section>
        <div className="mx-auto w-full h-screen">{children}</div>
      </section>
    </>
  );
}
